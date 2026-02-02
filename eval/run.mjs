#!/usr/bin/env node

import { parseArgs } from "node:util"
import { mkdir } from "node:fs/promises"
import { join } from "node:path"
import { loadEvals, runEval, saveResults } from "./lib/runner.mjs"
import { generateReport } from "./lib/reporter.mjs"

const { values: opts } = parseArgs({
  options: {
    eval: { type: "string" },
    category: { type: "string" },
    trials: { type: "string" },
    model: { type: "string" },
    "skip-generation": { type: "boolean", default: false },
    "results-dir": { type: "string" },
    "rule-mode": { type: "string" },
  },
})

const EVALS_DIR = join(import.meta.dirname, "evals")
const timestamp = new Date().toISOString().replace(/[:.]/g, "-").slice(0, 19)
const RESULTS_DIR =
  opts["results-dir"] || join(import.meta.dirname, "results", timestamp)

await mkdir(RESULTS_DIR, { recursive: true })

const filter = {
  eval: opts.eval,
  category: opts.category,
}

const evals = await loadEvals(EVALS_DIR, filter)

if (evals.length === 0) {
  console.error("No evals matched the filter.")
  process.exit(1)
}

console.log(`Running ${evals.length} eval(s), results → ${RESULTS_DIR}\n`)

const allResults = []

for (const evalDef of evals) {
  const slug = evalDef.rule.replace(".md", "")
  console.log(`▸ ${slug}`)

  const result = await runEval(evalDef, {
    trials: opts.trials ? parseInt(opts.trials) : undefined,
    model: opts.model,
    ruleMode: opts["rule-mode"] || "full",
    skipGeneration: opts["skip-generation"],
    resultsDir: RESULTS_DIR,
  })

  await saveResults(result, RESULTS_DIR)
  allResults.push(result)

  // Print quick summary
  const baseline = result.trials
    .flatMap((t) => t.baseline.checks)
    .filter((c) => c.passed).length
  const withRule = result.trials
    .flatMap((t) => t.withRule.checks)
    .filter((c) => c.passed).length
  const total = result.trials.flatMap((t) => t.baseline.checks).length
  console.log(
    `  baseline: ${baseline}/${total}  with-rule: ${withRule}/${total}\n`,
  )
}

const { summary } = await generateReport(allResults, RESULTS_DIR)

// Print summary table
console.log("\n=== Summary ===\n")
const pad = (s, n) => s.padEnd(n)
console.log(
  `${pad("Rule", 40)} ${pad("Classification", 18)} ${pad("Baseline", 10)} With Rule`,
)
console.log("-".repeat(85))
for (const s of summary) {
  console.log(
    `${pad(s.rule, 40)} ${pad(s.classification, 18)} ${pad(s.baseline, 10)} ${s.withRule}`,
  )
}

console.log(`\nReport: ${RESULTS_DIR}/report.md`)
