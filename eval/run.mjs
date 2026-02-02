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
    skipGeneration: opts["skip-generation"],
    resultsDir: RESULTS_DIR,
  })

  await saveResults(result, RESULTS_DIR)
  allResults.push(result)

  // Print quick summary
  const total = result.trials.flatMap((t) => t.baseline.checks).length
  const baselinePass = result.trials
    .flatMap((t) => t.baseline.checks)
    .filter((c) => c.passed).length
  const fullPass = result.trials
    .flatMap((t) => t.full.checks)
    .filter((c) => c.passed).length
  const extractedPass = result.trials
    .flatMap((t) => t.extracted.checks)
    .filter((c) => c.passed).length
  console.log(
    `  baseline: ${baselinePass}/${total}  full: ${fullPass}/${total}  extracted: ${extractedPass}/${total}\n`,
  )
}

const { summary } = await generateReport(allResults, RESULTS_DIR)

// Print summary table
console.log("\n=== Summary ===\n")
const pad = (s, n) => s.padEnd(n)
console.log(
  `${pad("Rule", 40)} ${pad("Classification", 20)} ${pad("Baseline", 10)} ${pad("Full", 10)} Extracted`,
)
console.log("-".repeat(95))
for (const s of summary) {
  console.log(
    `${pad(s.rule, 40)} ${pad(s.classification, 20)} ${pad(s.baseline, 10)} ${pad(s.full, 10)} ${s.extracted}`,
  )
}

console.log(`\nReport: ${RESULTS_DIR}/report.md`)
console.log(`Recommended rules: ${RESULTS_DIR}/recommended-rules.md`)
