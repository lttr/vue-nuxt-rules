import { readFile, mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { spawn } from "node:child_process";
import { parse as parseYaml } from "yaml";
import { extractRule } from "./extract-rule.mjs";
import { evaluate } from "./evaluator.mjs";

/**
 * Strip markdown fences from generated output if present.
 */
function stripFences(code) {
  return code.replace(/^```[^\n]*\n?/, "").replace(/\n?```\s*$/, "");
}

/**
 * Build system prompt for code generation.
 */
function buildSystemPrompt(ruleText) {
  const base =
    "You are a Vue 3 / Nuxt expert. Respond ONLY with the complete .vue SFC code (or .ts for composables). No explanations, no markdown fences.";
  if (!ruleText) return base;
  return `You are a Vue 3 / Nuxt expert. Follow these rules strictly:\n\n${ruleText}\n\nRespond ONLY with the complete .vue SFC code (or .ts for composables). No explanations, no markdown fences.`;
}

/**
 * Spawn claude -p and collect stdout. Uses detached mode to avoid
 * issues when running inside a parent claude session.
 */
function spawnClaude(args, timeout = 180_000) {
  return new Promise((resolve, reject) => {
    const child = spawn("claude", args, {
      detached: true,
      stdio: ["ignore", "pipe", "pipe"],
    });

    let stdout = "";
    let stderr = "";
    child.stdout.on("data", (d) => (stdout += d));
    child.stderr.on("data", (d) => (stderr += d));

    const timer = setTimeout(() => {
      child.kill();
      reject(new Error(`claude timed out after ${timeout}ms`));
    }, timeout);

    child.on("close", (code) => {
      clearTimeout(timer);
      if (code === 0) resolve(stdout);
      else reject(new Error(`claude exited ${code}: ${stderr}`));
    });
  });
}

/**
 * Run claude generation.
 */
async function generate(prompt, ruleText, opts) {
  const model = opts.model || "claude-opus-4-20250514";
  const systemPrompt = buildSystemPrompt(ruleText);

  const args = [
    "-p",
    prompt,
    "--system-prompt",
    systemPrompt,
    "--model",
    model,
    "--output-format",
    "text",
  ];

  const stdout = await spawnClaude(args);
  return stripFences(stdout.trim());
}

/**
 * Run a single eval definition (all trials).
 */
export async function runEval(evalDef, opts = {}) {
  const trials = opts.trials ?? evalDef.trials ?? 1;
  const ruleText = await extractRule(evalDef.rule);

  const results = {
    rule: evalDef.rule,
    category: evalDef.category,
    trials: [],
  };

  for (let t = 0; t < trials; t++) {
    const trial = { index: t, baseline: {}, withRule: {} };

    if (!opts.skipGeneration) {
      // Generate baseline (no rule)
      trial.baseline.code = await generate(evalDef.prompt, null, opts);

      // Generate with rule
      trial.withRule.code = await generate(evalDef.prompt, ruleText, opts);
    } else {
      // Load from results dir
      const dir = opts.resultsDir;
      const slug = evalDef.rule.replace(".md", "");
      trial.baseline.code = await readFile(
        join(dir, slug, `trial-${t}-baseline.vue`),
        "utf-8",
      ).catch(() => "");
      trial.withRule.code = await readFile(
        join(dir, slug, `trial-${t}-with-rule.vue`),
        "utf-8",
      ).catch(() => "");
    }

    // Evaluate both
    trial.baseline.checks = await evaluate(
      trial.baseline.code,
      evalDef.checks,
      opts,
    );
    trial.withRule.checks = await evaluate(
      trial.withRule.code,
      evalDef.checks,
      opts,
    );

    results.trials.push(trial);
  }

  return results;
}

/**
 * Save generated code to results directory.
 */
export async function saveResults(evalResult, resultsDir) {
  const slug = evalResult.rule.replace(".md", "");
  const dir = join(resultsDir, slug);
  await mkdir(dir, { recursive: true });

  for (const trial of evalResult.trials) {
    const i = trial.index;
    if (trial.baseline.code) {
      await writeFile(join(dir, `trial-${i}-baseline.vue`), trial.baseline.code);
    }
    if (trial.withRule.code) {
      await writeFile(
        join(dir, `trial-${i}-with-rule.vue`),
        trial.withRule.code,
      );
    }
  }
}

/**
 * Load all eval YAML files.
 */
export async function loadEvals(evalsDir, filter = {}) {
  const { readdir } = await import("node:fs/promises");
  const files = await readdir(evalsDir);
  const yamls = files.filter((f) => f.endsWith(".yaml"));

  const evals = [];
  for (const file of yamls) {
    const content = await readFile(join(evalsDir, file), "utf-8");
    const def = parseYaml(content);
    const name = file.replace(".yaml", "");

    if (filter.eval && name !== filter.eval) continue;
    if (filter.category && def.category !== filter.category) continue;

    evals.push(def);
  }

  return evals;
}
