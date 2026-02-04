import {
  readFile,
  mkdir,
  mkdtemp,
  writeFile,
  readdir,
  cp,
  rm,
} from "node:fs/promises"
import { join, dirname } from "node:path"
import { spawn } from "node:child_process"
import { tmpdir, homedir } from "node:os"
import { parse as parseYaml } from "yaml"
import { extractRule, getRulePath } from "./extract-rule.mjs"
import { evaluate } from "./evaluator.mjs"
import { shouldSkipBaseline } from "./cache.mjs"

/**
 * Create an isolated temp environment for running claude.
 * Copies credentials so claude can authenticate, and optionally
 * places a rule file into .claude/rules/ in the workspace.
 *
 * @param {string} [ruleFile] - rule markdown filename (e.g. "prefer-definemodel.md")
 * @param {"full"|"with-rule"} [mode] - how to process the rule file
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

    if (mode === "with-rule") {
      const ruleContent = await extractRule(ruleFile)
      await writeFile(join(rulesDir, ruleFile), ruleContent)
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

/** Directories/files to skip when reading workspace output */
const SKIP_PATTERNS = new Set([
  "node_modules",
  ".git",
  "dist",
  ".nuxt",
  ".output",
  "package-lock.json",
  "pnpm-lock.yaml",
  "yarn.lock",
])

/**
 * Recursively read all files from a directory into a filename → content map.
 * Skips hidden directories (.claude, etc) and bloat (node_modules, etc).
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
    if (SKIP_PATTERNS.has(entry.name)) continue
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
 *
 * @param {string} prompt
 * @param {string|null} ruleFile - null for baseline
 * @param {"full"|"with-rule"|null} ruleMode - null for baseline
 * @param {object} opts
 */
async function generate(prompt, ruleFile, ruleMode, opts) {
  const model = opts.model || "claude-opus-4-5-20251101"

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

  const allowedTools = ["Read", "Write", "Edit"]

  const setup = {
    model,
    prompt,
    allowedTools,
    ruleFile: ruleFile || null,
    ruleMode: ruleMode || null,
    ruleContent,
  }

  try {
    const args = [
      "-p",
      prompt,
      "--model",
      model,
      "--output-format",
      "text",
      "--allowedTools",
      ...allowedTools,
    ]

    await spawnClaude(args, {
      env: { HOME: isolated.home },
      cwd: isolated.workspace,
    })

    // Read files Claude wrote to the workspace
    const wsFiles = await readWorkspaceFiles(isolated.workspace)
    if (Object.keys(wsFiles).length > 0) {
      return { code: wsFiles, setup }
    }

    // Nothing produced
    return { code: {}, setup }
  } finally {
    await isolated.cleanup()
  }
}

/**
 * Format setup context as markdown for a specific variant.
 */
function formatSetupMd(setup) {
  const lines = ["# Setup\n"]
  lines.push(`- **Model**: ${setup.model}`)
  lines.push(`- **Rule file**: ${setup.ruleFile || "none"}`)
  lines.push(`- **Rule mode**: ${setup.ruleMode || "n/a"}`)
  lines.push(`- **Allowed tools**: ${setup.allowedTools.join(", ")}`)
  lines.push("")
  lines.push("## Prompt\n")
  lines.push("```")
  lines.push(setup.prompt)
  lines.push("```\n")
  if (setup.ruleContent) {
    lines.push("## Rule content\n")
    lines.push("````markdown")
    lines.push(setup.ruleContent)
    lines.push("````\n")
  }
  return lines.join("\n")
}

/**
 * Format combined setup for both rule variants.
 */
function formatCombinedSetupMd(fullSetup, withRuleSetup) {
  const lines = ["# Setup\n"]
  lines.push(`- **Model**: ${fullSetup.model}`)
  lines.push(`- **Rule file**: ${fullSetup.ruleFile}`)
  lines.push(`- **Allowed tools**: ${fullSetup.allowedTools.join(", ")}`)
  lines.push("")
  lines.push("## Prompt\n")
  lines.push("```")
  lines.push(fullSetup.prompt)
  lines.push("```\n")
  lines.push("## Full rule content\n")
  lines.push("````markdown")
  lines.push(fullSetup.ruleContent || "")
  lines.push("````\n")
  lines.push("## With-rule content\n")
  lines.push("````markdown")
  lines.push(withRuleSetup.ruleContent || "")
  lines.push("````\n")
  return lines.join("\n")
}

/**
 * Run a single eval definition (all trials).
 * By default runs 2 variants: baseline, with-rule.
 * Pass includeFull: true to also run with full rule text.
 * Pass cache: object to enable adaptive trial counts and baseline skipping.
 */
export async function runEval(evalDef, opts = {}) {
  const trials = opts.trials ?? evalDef.trials ?? 2
  const includeFull = opts.includeFull ?? false
  const cache = opts.cache || {}
  const skipBaseline = shouldSkipBaseline(evalDef.name, cache)

  const results = {
    name: evalDef.name,
    rule: evalDef.rule,
    category: evalDef.category,
    trials: [],
    skippedBaseline: skipBaseline,
  }

  for (let t = 0; t < trials; t++) {
    const trial = { index: t, baseline: {}, withRule: {} }
    if (includeFull) trial.full = {}

    if (!opts.skipGeneration) {
      // Generate baseline (no rule) - skip if already-known
      if (skipBaseline) {
        trial.baseline.code = {}
        trial.baseline.setup = {
          model: opts.model,
          prompt: evalDef.prompt,
          skipped: true,
        }
      } else {
        const baselineResult = await generate(evalDef.prompt, null, null, opts)
        trial.baseline.code = baselineResult.code
        trial.baseline.setup = baselineResult.setup
      }

      // Generate with full rule (entire markdown) - optional
      if (includeFull) {
        const fullResult = await generate(
          evalDef.prompt,
          evalDef.rule,
          "full",
          opts,
        )
        trial.full.code = fullResult.code
        trial.full.setup = fullResult.setup
      }

      // Generate with rule (AI agent block only)
      const withRuleResult = await generate(
        evalDef.prompt,
        evalDef.rule,
        "with-rule",
        opts,
      )
      trial.withRule.code = withRuleResult.code
      trial.withRule.setup = withRuleResult.setup
    } else {
      // Load from results dir
      const dir = opts.resultsDir
      const slug = evalDef.name
      trial.baseline.code = await loadVariant(dir, slug, `trial-${t}-baseline`)
      if (includeFull) {
        trial.full.code = await loadVariant(dir, slug, `trial-${t}-full`)
      }
      trial.withRule.code = await loadVariant(
        dir,
        slug,
        `trial-${t}-with-rule`,
      )
    }

    // Evaluate
    trial.baseline.checks = await evaluate(
      trial.baseline.code,
      evalDef.checks,
      opts,
    )
    if (includeFull) {
      trial.full.checks = await evaluate(trial.full.code, evalDef.checks, opts)
    }
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
  const metaFiles = new Set([
    "checks.json",
    "setup.json",
    "checks.md",
    "setup.md",
  ])
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
  const slug = evalResult.name
  const dir = join(resultsDir, slug)
  await mkdir(dir, { recursive: true })

  // Save combined setup at rule level (from first trial, has both rule contents)
  const firstTrial = evalResult.trials[0]
  const fullSetup = firstTrial?.full?.setup
  const withRuleSetup = firstTrial?.withRule?.setup
  if (fullSetup && withRuleSetup) {
    await writeFile(
      join(dir, "setup.md"),
      formatCombinedSetupMd(fullSetup, withRuleSetup),
    )
  } else if (fullSetup) {
    await writeFile(join(dir, "setup.md"), formatSetupMd(fullSetup))
  } else if (withRuleSetup) {
    await writeFile(join(dir, "setup.md"), formatSetupMd(withRuleSetup))
  }

  for (const trial of evalResult.trials) {
    const i = trial.index
    const variants = [
      ["baseline", `trial-${i}-baseline`],
      ["withRule", `trial-${i}-with-rule`],
    ]
    if (trial.full) {
      variants.splice(1, 0, ["full", `trial-${i}-full`])
    }

    for (const [variant, variantName] of variants) {
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

    def.name = name
    evals.push(def)
  }

  return evals
}
