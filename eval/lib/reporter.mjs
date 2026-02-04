import { readFile, writeFile } from "node:fs/promises"
import { join } from "node:path"
import { extractRule, getRulePath } from "./extract-rule.mjs"

/**
 * Classify a rule based on eval results.
 * Handles both 2-variant (baseline, withRule) and 3-variant (+ full) modes.
 */
function classify(evalResult) {
  const trials = evalResult.trials
  const hasFull = trials[0]?.full != null

  const baselineRate = passRate(trials, "baseline")
  const withRuleRate = passRate(trials, "withRule")
  const fullRate = hasFull ? passRate(trials, "full") : null

  if (baselineRate === 1) return "already-known"

  if (hasFull) {
    if (fullRate <= baselineRate && withRuleRate <= baselineRate)
      return "no-improvement"
    if (fullRate > withRuleRate) return "full-better"
    if (withRuleRate > fullRate) return "with-rule-better"
    return "both-help"
  } else {
    if (withRuleRate <= baselineRate) return "no-improvement"
    return "with-rule-better"
  }
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
 * Calculate flakiness: variance in per-trial pass rates.
 * Returns value 0-1 where 0 = consistent, >0.2 = flaky.
 */
function calcFlakiness(trials, variant) {
  if (trials.length < 2) return 0

  const rates = trials.map((t) => {
    const checks = t[variant].checks
    const passed = checks.filter((c) => c.passed).length
    return checks.length ? passed / checks.length : 0
  })

  const mean = rates.reduce((a, b) => a + b, 0) / rates.length
  const variance =
    rates.reduce((sum, r) => sum + (r - mean) ** 2, 0) / rates.length
  return variance
}

/**
 * Derive eval type from name suffix.
 */
function evalType(name) {
  return name.endsWith("-refactor") ? "refactor" : "generation"
}

/**
 * Generate markdown report.
 */
export async function generateReport(allResults, resultsDir) {
  const hasFull = allResults[0]?.trials[0]?.full != null
  const summary = allResults.map((r) => {
    const withRuleFlakiness = calcFlakiness(r.trials, "withRule")
    return {
      name: r.name,
      rule: r.rule,
      type: evalType(r.name),
      category: r.category || "misc",
      classification: classify(r),
      baseline: fractionStr(r.trials, "baseline"),
      full: hasFull ? fractionStr(r.trials, "full") : null,
      withRule: fractionStr(r.trials, "withRule"),
      flaky: withRuleFlakiness > 0.2,
      flakiness: withRuleFlakiness,
    }
  })

  // Sort by classification priority
  const order = {
    "full-better": 0,
    "with-rule-better": 1,
    "both-help": 2,
    "no-improvement": 3,
    "already-known": 4,
  }
  summary.sort((a, b) => order[a.classification] - order[b.classification])

  // Markdown report
  const md = buildMarkdown(summary, allResults)
  await writeFile(join(resultsDir, "report.md"), md)

  // Recommended rules document
  const recommended = summary.filter(
    (s) =>
      s.classification !== "already-known" &&
      s.classification !== "no-improvement",
  )
  if (recommended.length > 0) {
    const rulesDoc = await buildRecommendedRules(recommended)
    await writeFile(join(resultsDir, "recommended-rules.md"), rulesDoc)
  }

  return { summary, markdown: md }
}

function buildMarkdown(summary, allResults) {
  const lines = ["# Eval Report\n"]
  const hasFull = summary[0]?.full != null

  // Summary counts
  const counts = {
    "already-known": 0,
    "full-better": 0,
    "with-rule-better": 0,
    "both-help": 0,
    "no-improvement": 0,
  }
  for (const s of summary) counts[s.classification]++

  lines.push(`## Summary\n`)
  lines.push(`- **Already Known**: ${counts["already-known"]}`)
  if (hasFull) {
    lines.push(`- **Full Better**: ${counts["full-better"]}`)
  }
  lines.push(`- **With Rule Better**: ${counts["with-rule-better"]}`)
  if (hasFull) {
    lines.push(`- **Both Help**: ${counts["both-help"]}`)
  }
  lines.push(`- **No Improvement**: ${counts["no-improvement"]}`)
  lines.push("")

  // Table
  lines.push("## Results\n")
  if (hasFull) {
    lines.push(
      "| Name | Type | Category | Classification | Baseline | Full | With Rule |",
    )
    lines.push(
      "|------|------|----------|---------------|----------|------|-----------|",
    )
  } else {
    lines.push(
      "| Name | Type | Category | Classification | Baseline | With Rule |",
    )
    lines.push(
      "|------|------|----------|---------------|----------|-----------|",
    )
  }

  for (const s of summary) {
    const icon = {
      "full-better": "🟢",
      "with-rule-better": "🔵",
      "both-help": "🟡",
      "already-known": "⚪",
      "no-improvement": "🔴",
    }[s.classification]
    const flakyIcon = s.flaky ? " ⚠️" : ""
    if (hasFull) {
      lines.push(
        `| ${s.name}${flakyIcon} | ${s.type} | ${s.category} | ${icon} ${s.classification} | ${s.baseline} | ${s.full} | ${s.withRule} |`,
      )
    } else {
      lines.push(
        `| ${s.name}${flakyIcon} | ${s.type} | ${s.category} | ${icon} ${s.classification} | ${s.baseline} | ${s.withRule} |`,
      )
    }
  }

  lines.push("")

  // Recommendations
  const recommended = summary.filter(
    (s) =>
      s.classification !== "already-known" &&
      s.classification !== "no-improvement",
  )
  if (recommended.length > 0) {
    lines.push("## Recommendations\n")
    for (const s of recommended) {
      if (hasFull) {
        const variant =
          s.classification === "full-better" ? "full" : "withRule"
        lines.push(`- **${s.name}** → use **${variant}**`)
      } else {
        lines.push(`- **${s.name}** → use rule`)
      }
    }
    lines.push("")
  }

  // Detailed breakdown
  lines.push("## Details\n")
  for (const result of allResults) {
    lines.push(`### ${result.name}\n`)
    for (const trial of result.trials) {
      lines.push(`**Trial ${trial.index}**\n`)
      if (hasFull) {
        lines.push("| Check | Baseline | Full | With Rule |")
        lines.push("|-------|----------|------|-----------|")
      } else {
        lines.push("| Check | Baseline | With Rule |")
        lines.push("|-------|----------|-----------|")
      }

      const baseChecks = trial.baseline.checks
      const fullChecks = trial.full?.checks
      const withRuleChecks = trial.withRule.checks

      for (let i = 0; i < baseChecks.length; i++) {
        const b = baseChecks[i]
        const e = withRuleChecks[i]
        if (hasFull) {
          const f = fullChecks[i]
          lines.push(
            `| ${b.id} | ${b.passed ? "✅" : "❌"} ${b.detail} | ${f.passed ? "✅" : "❌"} ${f.detail} | ${e.passed ? "✅" : "❌"} ${e.detail} |`,
          )
        } else {
          lines.push(
            `| ${b.id} | ${b.passed ? "✅" : "❌"} ${b.detail} | ${e.passed ? "✅" : "❌"} ${e.detail} |`,
          )
        }
      }

      // Summarize differences vs baseline
      const fullImproved = []
      const fullRegressed = []
      const withRuleImproved = []
      const withRuleRegressed = []
      for (let i = 0; i < baseChecks.length; i++) {
        const b = baseChecks[i]
        const e = withRuleChecks[i]
        if (!b.passed && e.passed) withRuleImproved.push(b.id)
        if (b.passed && !e.passed) withRuleRegressed.push(b.id)
        if (hasFull) {
          const f = fullChecks[i]
          if (!b.passed && f.passed) fullImproved.push(b.id)
          if (b.passed && !f.passed) fullRegressed.push(b.id)
        }
      }
      lines.push("")
      const hasChanges =
        fullImproved.length > 0 ||
        fullRegressed.length > 0 ||
        withRuleImproved.length > 0 ||
        withRuleRegressed.length > 0

      if (hasChanges) {
        if (fullImproved.length > 0)
          lines.push(`🟢 **Full improved**: ${fullImproved.join(", ")}`)
        if (fullRegressed.length > 0)
          lines.push(`🔴 **Full regressed**: ${fullRegressed.join(", ")}`)
        if (withRuleImproved.length > 0)
          lines.push(
            `🔵 **With-rule improved**: ${withRuleImproved.join(", ")}`,
          )
        if (withRuleRegressed.length > 0)
          lines.push(
            `🔴 **With-rule regressed**: ${withRuleRegressed.join(", ")}`,
          )
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

async function buildRecommendedRules(recommended) {
  const lines = ["# Recommended Rules\n"]

  // Group by category
  const byCategory = new Map()
  for (const s of recommended) {
    if (!byCategory.has(s.category)) byCategory.set(s.category, [])
    byCategory.get(s.category).push(s)
  }

  for (const [category, rules] of byCategory) {
    lines.push(`## ${category}\n`)
    for (const s of rules) {
      lines.push(`### ${s.name}\n`)
      const useWithRule = s.classification !== "full-better"
      if (useWithRule) {
        const text = await extractRule(s.rule)
        lines.push(text)
      } else {
        const fullPath = getRulePath(s.rule)
        const content = await readFile(fullPath, "utf-8")
        lines.push(content)
      }
      lines.push("")
    }
  }

  return lines.join("\n")
}
