import { readFile, mkdir, mkdtemp, writeFile, readdir, cp, rm } from "node:fs/promises"
import { join, dirname } from "node:path"
import { spawn } from "node:child_process"
import { tmpdir, homedir } from "node:os"
import { parse as parseYaml } from "yaml"
import { extractRule, getRulePath } from "./extract-rule.mjs"
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
 * Build system prompt for code generation (format-only, no rule text).
 */
function buildSystemPrompt() {
  return `You are a Vue 3 / Nuxt expert.
If your response contains multiple files, separate them with a delimiter line:
// --- file: <relative-path> ---
Respond ONLY with code. No explanations, no markdown fences.`
}

/**
 * Create an isolated temp environment for running claude.
 * Copies credentials so claude can authenticate, and optionally
 * places a rule file into .claude/rules/ in the workspace.
 *
 * @param {string} [ruleFile] - rule markdown filename (e.g. "prefer-definemodel.md")
 * @param {"full"|"extracted"} [mode] - how to process the rule file
 * @returns {{ home: string, workspace: string, cleanup: () => Promise<void> }}
 */
async function createIsolatedEnv(ruleFile, mode) {
  const tempHome = await mkdtemp(join(tmpdir(), "eval-home-"))
  const workspace = await mkdtemp(join(tmpdir(), "eval-ws-"))

  // Copy credentials so claude can authenticate
  const srcCreds = join(homedir(), ".claude", ".credentials.json")
  const destClaudeDir = join(tempHome, ".claude")
  await mkdir(destClaudeDir, { recursive: true })
  await cp(srcCreds, join(destClaudeDir, ".credentials.json"))

  // Place rule file if requested
  if (ruleFile) {
    const rulesDir = join(workspace, ".claude", "rules")
    await mkdir(rulesDir, { recursive: true })

    if (mode === "extracted") {
      const extracted = await extractRule(ruleFile)
      await writeFile(join(rulesDir, ruleFile), extracted)
    } else {
      // "full" mode — copy the entire markdown file
      const srcPath = getRulePath(ruleFile)
      await cp(srcPath, join(rulesDir, ruleFile))
    }
  }

  return {
    home: tempHome,
    workspace,
    async cleanup() {
      await rm(tempHome, { recursive: true, force: true })
      await rm(workspace, { recursive: true, force: true })
    },
  }
}

/**
 * Spawn claude -p and collect stdout.
 * Accepts optional env and cwd overrides for isolated environments.
 */
function spawnClaude(args, { timeout = 180_000, env, cwd } = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn("claude", args, {
      detached: true,
      stdio: ["ignore", "pipe", "pipe"],
      ...(cwd && { cwd }),
      ...(env && { env: { ...process.env, ...env } }),
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
 * Recursively read all files from a directory into a filename → content map.
 * Skips hidden directories (.claude, etc).
 */
async function readWorkspaceFiles(dir) {
  const files = {}
  let entries
  try {
    entries = await readdir(dir, { withFileTypes: true })
  } catch {
    return files
  }
  for (const entry of entries) {
    if (entry.name.startsWith(".")) continue
    const fullPath = join(dir, entry.name)
    if (entry.isDirectory()) {
      const nested = await readWorkspaceFiles(fullPath)
      for (const [name, content] of Object.entries(nested)) {
        files[join(entry.name, name)] = content
      }
    } else {
      files[entry.name] = await readFile(fullPath, "utf-8")
    }
  }
  return files
}

/**
 * Run claude generation in an isolated environment.
 * Returns { code, setup } where setup captures the Claude Code config used.
 */
async function generate(prompt, ruleFile, opts) {
  const model = opts.model || "claude-opus-4-5-20251101"
  const ruleMode = opts.ruleMode || "full"
  const systemPrompt = buildSystemPrompt()

  const isolated = await createIsolatedEnv(
    ruleFile || undefined,
    ruleFile ? ruleMode : undefined,
  )

  // Capture the rule content that was placed in workspace
  let ruleContent = null
  if (ruleFile) {
    const rulesDir = join(isolated.workspace, ".claude", "rules")
    try {
      ruleContent = await readFile(join(rulesDir, ruleFile), "utf-8")
    } catch {}
  }

  const allowedTools = ["Bash(*)", "Read", "Write", "Edit"]

  const setup = {
    model,
    systemPrompt,
    prompt,
    allowedTools,
    ruleFile: ruleFile || null,
    ruleMode: ruleFile ? ruleMode : null,
    ruleContent,
  }

  try {
    const args = [
      "-p",
      prompt,
      "--system-prompt",
      systemPrompt,
      "--model",
      model,
      "--output-format",
      "text",
      "--allowedTools",
      ...allowedTools,
    ]

    const stdout = await spawnClaude(args, {
      env: { HOME: isolated.home },
      cwd: isolated.workspace,
    })

    // Prefer workspace files (from Write tool) over stdout
    const wsFiles = await readWorkspaceFiles(isolated.workspace)
    if (Object.keys(wsFiles).length > 0) {
      return { code: wsFiles, setup }
    }

    // Fall back to stdout parsing
    const trimmed = stdout.trim()
    if (trimmed) {
      return { code: parseMultiFile(stripFences(trimmed)), setup }
    }

    // Nothing produced
    return { code: { "output.ts": "" }, setup }
  } finally {
    await isolated.cleanup()
  }
}

/**
 * Format check results as markdown.
 */
function formatChecksMd(checks) {
  const lines = ["# Checks\n"]
  lines.push("| Check | Result | Detail |")
  lines.push("|-------|--------|--------|")
  for (const c of checks) {
    lines.push(`| ${c.id} | ${c.passed ? "✅ pass" : "❌ fail"} | ${c.detail} |`)
  }
  lines.push("")
  return lines.join("\n")
}

/**
 * Format setup context as markdown.
 */
function formatSetupMd(setup) {
  const lines = ["# Setup\n"]
  lines.push(`- **Model**: ${setup.model}`)
  lines.push(`- **Rule file**: ${setup.ruleFile || "none"}`)
  lines.push(`- **Rule mode**: ${setup.ruleMode || "n/a"}`)
  lines.push(`- **Allowed tools**: ${setup.allowedTools.join(", ")}`)
  lines.push("")
  lines.push("## System prompt\n")
  lines.push("```")
  lines.push(setup.systemPrompt)
  lines.push("```\n")
  lines.push("## Prompt\n")
  lines.push("```")
  lines.push(setup.prompt)
  lines.push("```\n")
  if (setup.ruleContent) {
    lines.push("## Rule content\n")
    lines.push("```")
    lines.push(setup.ruleContent)
    lines.push("```\n")
  }
  return lines.join("\n")
}

/**
 * Run a single eval definition (all trials).
 */
export async function runEval(evalDef, opts = {}) {
  const trials = opts.trials ?? evalDef.trials ?? 1

  const results = {
    rule: evalDef.rule,
    category: evalDef.category,
    trials: [],
  }

  for (let t = 0; t < trials; t++) {
    const trial = { index: t, baseline: {}, withRule: {} }

    if (!opts.skipGeneration) {
      // Generate baseline (no rule)
      const baselineResult = await generate(evalDef.prompt, null, opts)
      trial.baseline.code = baselineResult.code
      trial.baseline.setup = baselineResult.setup

      // Generate with rule
      const withRuleResult = await generate(evalDef.prompt, evalDef.rule, opts)
      trial.withRule.code = withRuleResult.code
      trial.withRule.setup = withRuleResult.setup
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

  // Try output/ subfolder first (current format)
  const outputDir = join(variantDir, "output")
  try {
    const files = {}
    const entries = await readdir(outputDir, { recursive: true })
    for (const entry of entries) {
      const fullPath = join(outputDir, entry)
      try {
        files[entry] = await readFile(fullPath, "utf-8")
      } catch {
        // directory entry, skip
      }
    }
    if (Object.keys(files).length > 0) return files
  } catch {
    // output/ doesn't exist, try legacy formats
  }

  // Legacy: files directly in variant dir (skip metadata files)
  const metaFiles = new Set(["checks.json", "setup.json", "checks.md", "setup.md"])
  try {
    const files = {}
    const entries = await readdir(variantDir, { recursive: true })
    for (const entry of entries) {
      if (metaFiles.has(entry)) continue
      const fullPath = join(variantDir, entry)
      try {
        files[entry] = await readFile(fullPath, "utf-8")
      } catch {
        // directory entry, skip
      }
    }
    if (Object.keys(files).length > 0) return files
  } catch {
    // directory doesn't exist
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
      const variantDir = join(dir, variantName)
      await mkdir(variantDir, { recursive: true })

      // Save generated code files into output/ subfolder
      const codeMap = trial[variant].code
      if (codeMap && Object.keys(codeMap).length > 0) {
        const outputDir = join(variantDir, "output")
        await mkdir(outputDir, { recursive: true })
        for (const [filename, content] of Object.entries(codeMap)) {
          const filePath = join(outputDir, filename)
          await mkdir(dirname(filePath), { recursive: true })
          await writeFile(filePath, content)
        }
      }

      // Save evaluation check results as markdown
      const checks = trial[variant].checks
      if (checks) {
        await writeFile(
          join(variantDir, "checks.md"),
          formatChecksMd(checks),
        )
      }

      // Save Claude Code setup context as markdown
      const setup = trial[variant].setup
      if (setup) {
        await writeFile(
          join(variantDir, "setup.md"),
          formatSetupMd(setup),
        )
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
