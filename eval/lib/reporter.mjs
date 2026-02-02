import { writeFile } from "node:fs/promises"
import { join } from "node:path"

/**
 * Classify a rule based on eval results.
 */
function classify(evalResult) {
  const trials = evalResult.trials

  const baselinePassRate = passRate(trials, "baseline")
  const withRulePassRate = passRate(trials, "withRule")

  if (baselinePassRate === 1) return "already-known"
  if (withRulePassRate > baselinePassRate) return "high-value"
  return "no-improvement"
}

function passRate(trials, variant) {
  let totalChecks = 0
  let passedChecks = 0

  for (const trial of trials) {
    for (const check of trial[variant].checks) {
      totalChecks++
      if (check.passed) passedChecks++
    }
  }

  return totalChecks === 0 ? 0 : passedChecks / totalChecks
}

function fractionStr(trials, variant) {
  let total = 0
  let passed = 0
  for (const trial of trials) {
    for (const check of trial[variant].checks) {
      total++
      if (check.passed) passed++
    }
  }
  return `${passed}/${total}`
}

/**
 * Generate markdown + JSON reports.
 */
export async function generateReport(allResults, resultsDir) {
  const summary = allResults.map((r) => ({
    rule: r.rule,
    category: r.category,
    classification: classify(r),
    baseline: fractionStr(r.trials, "baseline"),
    withRule: fractionStr(r.trials, "withRule"),
  }))

  // Sort: high-value first, then no-improvement, then already-known
  const order = { "high-value": 0, "no-improvement": 1, "already-known": 2 }
  summary.sort((a, b) => order[a.classification] - order[b.classification])

  // Markdown report
  const md = buildMarkdown(summary, allResults)
  await writeFile(join(resultsDir, "report.md"), md)

  return { summary, markdown: md }
}

function buildMarkdown(summary, allResults) {
  const lines = ["# Eval Report\n"]

  // Summary counts
  const counts = { "already-known": 0, "high-value": 0, "no-improvement": 0 }
  for (const s of summary) counts[s.classification]++

  lines.push(`## Summary\n`)
  lines.push(`- **Already Known**: ${counts["already-known"]}`)
  lines.push(`- **High Value**: ${counts["high-value"]}`)
  lines.push(`- **No Improvement**: ${counts["no-improvement"]}`)
  lines.push("")

  // Table
  lines.push("## Results\n")
  lines.push("| Rule | Category | Classification | Baseline | With Rule |")
  lines.push("|------|----------|---------------|----------|-----------|")

  for (const s of summary) {
    const icon =
      s.classification === "high-value"
        ? "🟢"
        : s.classification === "already-known"
          ? "⚪"
          : "🔴"
    lines.push(
      `| ${s.rule} | ${s.category} | ${icon} ${s.classification} | ${s.baseline} | ${s.withRule} |`,
    )
  }

  lines.push("")

  // Detailed breakdown
  lines.push("## Details\n")
  for (const result of allResults) {
    lines.push(`### ${result.rule}\n`)
    for (const trial of result.trials) {
      lines.push(`**Trial ${trial.index}**\n`)
      lines.push("| Check | Baseline | With Rule |")
      lines.push("|-------|----------|-----------|")

      const baseChecks = trial.baseline.checks
      const ruleChecks = trial.withRule.checks

      for (let i = 0; i < baseChecks.length; i++) {
        const b = baseChecks[i]
        const r = ruleChecks[i]
        lines.push(
          `| ${b.id} | ${b.passed ? "✅" : "❌"} ${b.detail} | ${r.passed ? "✅" : "❌"} ${r.detail} |`,
        )
      }
      lines.push("")
    }
  }

  return lines.join("\n")
}
