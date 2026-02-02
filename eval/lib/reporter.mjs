import { writeFile } from "node:fs/promises"
import { join } from "node:path"

/**
 * Classify a rule based on 3-variant eval results.
 */
function classify(evalResult) {
  const trials = evalResult.trials

  const baselineRate = passRate(trials, "baseline")
  const fullRate = passRate(trials, "full")
  const extractedRate = passRate(trials, "extracted")

  if (baselineRate === 1) return "already-known"
  if (fullRate <= baselineRate && extractedRate <= baselineRate) return "no-improvement"
  if (fullRate > extractedRate) return "full-better"
  if (extractedRate > fullRate) return "extracted-better"
  return "both-help"
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
 * Generate markdown report.
 */
export async function generateReport(allResults, resultsDir) {
  const summary = allResults.map((r) => ({
    rule: r.rule,
    category: r.category,
    classification: classify(r),
    baseline: fractionStr(r.trials, "baseline"),
    full: fractionStr(r.trials, "full"),
    extracted: fractionStr(r.trials, "extracted"),
  }))

  // Sort by classification priority
  const order = {
    "full-better": 0,
    "extracted-better": 1,
    "both-help": 2,
    "no-improvement": 3,
    "already-known": 4,
  }
  summary.sort((a, b) => order[a.classification] - order[b.classification])

  // Markdown report
  const md = buildMarkdown(summary, allResults)
  await writeFile(join(resultsDir, "report.md"), md)

  return { summary, markdown: md }
}

function buildMarkdown(summary, allResults) {
  const lines = ["# Eval Report\n"]

  // Summary counts
  const counts = {
    "already-known": 0,
    "full-better": 0,
    "extracted-better": 0,
    "both-help": 0,
    "no-improvement": 0,
  }
  for (const s of summary) counts[s.classification]++

  lines.push(`## Summary\n`)
  lines.push(`- **Already Known**: ${counts["already-known"]}`)
  lines.push(`- **Full Better**: ${counts["full-better"]}`)
  lines.push(`- **Extracted Better**: ${counts["extracted-better"]}`)
  lines.push(`- **Both Help**: ${counts["both-help"]}`)
  lines.push(`- **No Improvement**: ${counts["no-improvement"]}`)
  lines.push("")

  // Table
  lines.push("## Results\n")
  lines.push("| Rule | Category | Classification | Baseline | Full | Extracted |")
  lines.push("|------|----------|---------------|----------|------|-----------|")

  for (const s of summary) {
    const icon = {
      "full-better": "🟢",
      "extracted-better": "🔵",
      "both-help": "🟡",
      "already-known": "⚪",
      "no-improvement": "🔴",
    }[s.classification]
    lines.push(
      `| ${s.rule} | ${s.category} | ${icon} ${s.classification} | ${s.baseline} | ${s.full} | ${s.extracted} |`,
    )
  }

  lines.push("")

  // Detailed breakdown
  lines.push("## Details\n")
  for (const result of allResults) {
    lines.push(`### ${result.rule}\n`)
    for (const trial of result.trials) {
      lines.push(`**Trial ${trial.index}**\n`)
      lines.push("| Check | Baseline | Full | Extracted |")
      lines.push("|-------|----------|------|-----------|")

      const baseChecks = trial.baseline.checks
      const fullChecks = trial.full.checks
      const extractedChecks = trial.extracted.checks

      for (let i = 0; i < baseChecks.length; i++) {
        const b = baseChecks[i]
        const f = fullChecks[i]
        const e = extractedChecks[i]
        lines.push(
          `| ${b.id} | ${b.passed ? "✅" : "❌"} ${b.detail} | ${f.passed ? "✅" : "❌"} ${f.detail} | ${e.passed ? "✅" : "❌"} ${e.detail} |`,
        )
      }

      // Summarize differences vs baseline
      const fullImproved = []
      const fullRegressed = []
      const extractedImproved = []
      const extractedRegressed = []
      for (let i = 0; i < baseChecks.length; i++) {
        const b = baseChecks[i]
        const f = fullChecks[i]
        const e = extractedChecks[i]
        if (!b.passed && f.passed) fullImproved.push(b.id)
        if (b.passed && !f.passed) fullRegressed.push(b.id)
        if (!b.passed && e.passed) extractedImproved.push(b.id)
        if (b.passed && !e.passed) extractedRegressed.push(b.id)
      }
      lines.push("")
      const hasChanges =
        fullImproved.length > 0 ||
        fullRegressed.length > 0 ||
        extractedImproved.length > 0 ||
        extractedRegressed.length > 0

      if (hasChanges) {
        if (fullImproved.length > 0)
          lines.push(`🟢 **Full improved**: ${fullImproved.join(", ")}`)
        if (fullRegressed.length > 0)
          lines.push(`🔴 **Full regressed**: ${fullRegressed.join(", ")}`)
        if (extractedImproved.length > 0)
          lines.push(`🔵 **Extracted improved**: ${extractedImproved.join(", ")}`)
        if (extractedRegressed.length > 0)
          lines.push(`🔴 **Extracted regressed**: ${extractedRegressed.join(", ")}`)
      } else if (baseChecks.every((c) => c.passed)) {
        lines.push(`⚪ **No difference** — all passed`)
      } else {
        lines.push(`⚪ **No difference** — all failed the same checks`)
      }
      lines.push("")
    }
  }

  return lines.join("\n")
}
