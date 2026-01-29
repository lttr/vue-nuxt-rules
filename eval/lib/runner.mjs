import { readFile, mkdir, writeFile, readdir } from "node:fs/promises"
import { join, dirname } from "node:path"
import { spawn } from "node:child_process"
import { parse as parseYaml } from "yaml"
import { extractRule } from "./extract-rule.mjs"
import { evaluate } from "./evaluator.mjs"

/**
 * Strip markdown fences from generated output if present.
 */
function stripFences(code) {
  return code.replace(/^```[^\n]*\n?/, "").replace(/\n?```\s*$/, "")
}

/**
 * Parse raw LLM output into a map of filename → content.
 * Supports multi-file output delimited by: // --- file: <path> ---
 */
function parseMultiFile(rawOutput) {
  const delimiter = /^\/\/ --- file: (.+) ---$/gm
  const files = {}
  let match
  const splits = []

  while ((match = delimiter.exec(rawOutput)) !== null) {
    splits.push({
      name: match[1].trim(),
      index: match.index,
      end: delimiter.lastIndex,
    })
  }

  if (splits.length === 0) {
    // Single file — infer extension
    const ext = /<template>|<script/.test(rawOutput) ? ".vue" : ".ts"
    return { [`output${ext}`]: rawOutput }
  }

  for (let i = 0; i < splits.length; i++) {
    const contentStart = splits[i].end + 1 // skip newline after delimiter
    const contentEnd =
      i + 1 < splits.length ? splits[i + 1].index : rawOutput.length
    files[splits[i].name] = rawOutput.slice(contentStart, contentEnd).trim()
  }

  return files
}

/**
 * Build system prompt for code generation.
 */
function buildSystemPrompt(ruleText) {
  const base = `You are a Vue 3 / Nuxt expert.
If your response contains multiple files, separate them with a delimiter line:
// --- file: <relative-path> ---
Respond ONLY with code. No explanations, no markdown fences.`
  if (!ruleText) return base
  return `You are a Vue 3 / Nuxt expert. Follow these rules strictly:\n\n${ruleText}\n\nIf your response contains multiple files, separate them with a delimiter line:\n// --- file: <relative-path> ---\nRespond ONLY with code. No explanations, no markdown fences.`
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
    })

    let stdout = ""
    let stderr = ""
    child.stdout.on("data", (d) => (stdout += d))
    child.stderr.on("data", (d) => (stderr += d))

    const timer = setTimeout(() => {
      child.kill()
      reject(new Error(`claude timed out after ${timeout}ms`))
    }, timeout)

    child.on("close", (code) => {
      clearTimeout(timer)
      if (code === 0) resolve(stdout)
      else reject(new Error(`claude exited ${code}: ${stderr}`))
    })
  })
}

/**
 * Run claude generation.
 */
async function generate(prompt, ruleText, opts) {
  const model = opts.model || "claude-opus-4-20250514"
  const systemPrompt = buildSystemPrompt(ruleText)

  const args = [
    "-p",
    prompt,
    "--system-prompt",
    systemPrompt,
    "--model",
    model,
    "--output-format",
    "text",
  ]

  const stdout = await spawnClaude(args)
  return parseMultiFile(stripFences(stdout.trim()))
}

/**
 * Run a single eval definition (all trials).
 */
export async function runEval(evalDef, opts = {}) {
  const trials = opts.trials ?? evalDef.trials ?? 1
  const ruleText = await extractRule(evalDef.rule)

  const results = {
    rule: evalDef.rule,
    category: evalDef.category,
    trials: [],
  }

  for (let t = 0; t < trials; t++) {
    const trial = { index: t, baseline: {}, withRule: {} }

    if (!opts.skipGeneration) {
      // Generate baseline (no rule)
      trial.baseline.code = await generate(evalDef.prompt, null, opts)

      // Generate with rule
      trial.withRule.code = await generate(evalDef.prompt, ruleText, opts)
    } else {
      // Load from results dir (supports both old single-file and new directory format)
      const dir = opts.resultsDir
      const slug = evalDef.rule.replace(".md", "")
      trial.baseline.code = await loadVariant(dir, slug, `trial-${t}-baseline`)
      trial.withRule.code = await loadVariant(dir, slug, `trial-${t}-with-rule`)
    }

    // Evaluate both
    trial.baseline.checks = await evaluate(
      trial.baseline.code,
      evalDef.checks,
      opts,
    )
    trial.withRule.checks = await evaluate(
      trial.withRule.code,
      evalDef.checks,
      opts,
    )

    results.trials.push(trial)
  }

  return results
}

/**
 * Load a variant's files from results directory.
 * Supports new directory format and legacy single .vue file.
 */
async function loadVariant(resultsDir, slug, variantName) {
  const variantDir = join(resultsDir, slug, variantName)

  // Try new directory format first
  try {
    const files = {}
    const entries = await readdir(variantDir, { recursive: true })
    for (const entry of entries) {
      const fullPath = join(variantDir, entry)
      // readdir with recursive returns strings; skip directories by trying to read
      try {
        files[entry] = await readFile(fullPath, "utf-8")
      } catch {
        // directory entry, skip
      }
    }
    if (Object.keys(files).length > 0) return files
  } catch {
    // directory doesn't exist, try legacy format
  }

  // Legacy single-file format
  const legacy = await readFile(
    join(resultsDir, slug, `${variantName}.vue`),
    "utf-8",
  ).catch(() => "")
  return legacy ? { "output.vue": legacy } : {}
}

/**
 * Save generated code to results directory.
 * Writes each file into a variant subdirectory.
 */
export async function saveResults(evalResult, resultsDir) {
  const slug = evalResult.rule.replace(".md", "")
  const dir = join(resultsDir, slug)
  await mkdir(dir, { recursive: true })

  for (const trial of evalResult.trials) {
    const i = trial.index
    for (const [variant, variantName] of [
      ["baseline", `trial-${i}-baseline`],
      ["withRule", `trial-${i}-with-rule`],
    ]) {
      const codeMap = trial[variant].code
      if (!codeMap || Object.keys(codeMap).length === 0) continue

      const variantDir = join(dir, variantName)
      for (const [filename, content] of Object.entries(codeMap)) {
        const filePath = join(variantDir, filename)
        await mkdir(dirname(filePath), { recursive: true })
        await writeFile(filePath, content)
      }
    }
  }
}

/**
 * Load all eval YAML files.
 */
export async function loadEvals(evalsDir, filter = {}) {
  const files = await readdir(evalsDir)
  const yamls = files.filter((f) => f.endsWith(".yaml"))

  const evals = []
  for (const file of yamls) {
    const content = await readFile(join(evalsDir, file), "utf-8")
    const def = parseYaml(content)
    const name = file.replace(".yaml", "")

    if (filter.eval && name !== filter.eval) continue
    if (filter.category && def.category !== filter.category) continue

    evals.push(def)
  }

  return evals
}
