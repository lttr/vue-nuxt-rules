#!/usr/bin/env node

import { parseArgs } from "node:util"
import { mkdir } from "node:fs/promises"
import { join } from "node:path"
import pLimit from "p-limit"
import { loadEvals, runEval, saveResults } from "./lib/runner.mjs"
import { generateReport } from "./lib/reporter.mjs"
import {
  loadCache,
  saveCache,
  getTrialCount,
  updateCacheEntry,
} from "./lib/cache.mjs"

const { values: opts } = parseArgs({
  options: {
    eval: { type: "string" },
    trials: { type: "string" },
    model: { type: "string" },
    full: { type: "boolean", default: false },
    "skip-generation": { type: "boolean", default: false },
    "results-dir": { type: "string" },
    concurrency: { type: "string", default: "3" },
  },
})

const EVALS_DIR = join(import.meta.dirname, "evals")
const timestamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19)
const RESULTS_DIR =
  opts["results-dir"] || join(import.meta.dirname, "results", timestamp)

await mkdir(RESULTS_DIR, { recursive: true })

const filter = {
  eval: opts.eval,
}

const evals = await loadEvals(EVALS_DIR, filter)

if (evals.length === 0) {
  console.error("No evals matched the filter.")
  process.exit(1)
}

console.log(`Running ${evals.length} eval(s), results → ${RESULTS_DIR}\n`)

const cache = await loadCache()
const allResults = []

const concurrency = parseInt(opts.concurrency) || 3
const limit = pLimit(concurrency)

console.log(`Concurrency: ${concurrency}\n`)

const runOne = async (evalDef) => {
  const slug = evalDef.rule.replace(".md", "")
  const trialCount = opts.trials
    ? parseInt(opts.trials)
    : getTrialCount(evalDef.name, cache)
  console.log(`▸ ${slug} (${trialCount} trial${trialCount > 1 ? "s" : ""})`)

  const result = await runEval(evalDef, {
    trials: trialCount,
    model: opts.model,
    includeFull: opts.full,
    skipGeneration: opts["skip-generation"],
    resultsDir: RESULTS_DIR,
    cache,
  })

  await saveResults(result, RESULTS_DIR)

  // Print quick summary
  const total = result.trials.flatMap((t) => t.baseline.checks).length
  const baselinePass = result.trials
    .flatMap((t) => t.baseline.checks)
    .filter((c) => c.passed).length
  const withRulePass = result.trials
    .flatMap((t) => t.withRule.checks)
    .filter((c) => c.passed).length
  let summaryLine = `  baseline: ${baselinePass}/${total}  with-rule: ${withRulePass}/${total}`
  if (opts.full) {
    const fullPass = result.trials
      .flatMap((t) => t.full.checks)
      .filter((c) => c.passed).length
    summaryLine += `  full: ${fullPass}/${total}`
  }
  if (result.skippedBaseline) summaryLine += " (baseline skipped)"
  console.log(summaryLine + "\n")

  return result
}

const results = await Promise.all(evals.map((e) => limit(() => runOne(e))))
allResults.push(...results)

const { summary } = await generateReport(allResults, RESULTS_DIR)

// Update cache with new results
for (const s of summary) {
  const passRate =
    parseFloat(s.withRule.split("/")[0]) /
    parseFloat(s.withRule.split("/")[1])
  updateCacheEntry(s.name, s.classification, passRate, cache)
}
await saveCache(cache)

// Print summary table
console.log("\n=== Summary ===\n")
const pad = (s, n) => s.padEnd(n)
if (opts.full) {
  console.log(
    `${pad("Name", 40)} ${pad("Classification", 20)} ${pad("Baseline", 10)} ${pad("Full", 10)} With Rule`,
  )
  console.log("-".repeat(95))
  for (const s of summary) {
    console.log(
      `${pad(s.name, 40)} ${pad(s.classification, 20)} ${pad(s.baseline, 10)} ${pad(s.full || "-", 10)} ${s.withRule}`,
    )
  }
} else {
  console.log(
    `${pad("Name", 40)} ${pad("Classification", 20)} ${pad("Baseline", 10)} With Rule`,
  )
  console.log("-".repeat(75))
  for (const s of summary) {
    console.log(
      `${pad(s.name, 40)} ${pad(s.classification, 20)} ${pad(s.baseline, 10)} ${s.withRule}`,
    )
  }
}

console.log(`\nReport: ${RESULTS_DIR}/report.md`)
console.log(`Recommended rules: ${RESULTS_DIR}/recommended-rules.md`)
