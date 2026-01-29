import { spawn } from "node:child_process"

/**
 * Spawn claude -p in detached mode (works inside parent claude sessions).
 */
function spawnClaude(args, timeout = 90_000) {
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
 * Build a string representation of a code map for matching/display.
 * If `fileGlob` is provided, only include matching files.
 */
function concatFiles(codeMap, fileGlob) {
  let entries = Object.entries(codeMap)
  if (fileGlob) {
    const re = new RegExp(fileGlob.replace(/\*/g, ".*").replace(/\?/g, "."))
    entries = entries.filter(([name]) => re.test(name))
  }
  if (entries.length <= 1) return entries[0]?.[1] ?? ""
  return entries
    .map(([name, content]) => `// --- file: ${name} ---\n${content}`)
    .join("\n\n")
}

/**
 * Format code map for display in AI judge prompt.
 */
function formatForPrompt(codeMap) {
  const entries = Object.entries(codeMap)
  if (entries.length === 1) {
    const [name, content] = entries[0]
    const ext = name.endsWith(".vue") ? "vue" : "typescript"
    return `\`\`\`${ext}\n${content}\n\`\`\``
  }
  return entries
    .map(([name, content]) => {
      const ext = name.endsWith(".vue") ? "vue" : "typescript"
      return `**${name}**:\n\`\`\`${ext}\n${content}\n\`\`\``
    })
    .join("\n\n")
}

/**
 * Run all checks against generated code.
 * @param {Record<string, string>} codeMap - filename → content
 * Returns array of { id, type, passed, detail }
 */
export async function evaluate(codeMap, checks, opts = {}) {
  const results = []

  for (const check of checks) {
    if (check.type === "regex") {
      results.push(evalRegex(codeMap, check))
    } else if (check.type === "ai-judge") {
      results.push(await evalAiJudge(codeMap, check, opts))
    }
  }

  return results
}

function evalRegex(codeMap, check) {
  const text = concatFiles(codeMap, check.file)
  const re = new RegExp(check.pattern, check.flags || "")
  const found = re.test(text)
  const expect = check.expect ?? "present"
  const passed = expect === "present" ? found : !found

  return {
    id: check.id,
    type: "regex",
    passed,
    detail: `pattern ${found ? "found" : "not found"}, expected ${expect}`,
  }
}

async function evalAiJudge(codeMap, check, opts) {
  const model = opts.model || "claude-sonnet-4-20250514"
  const codeBlock = formatForPrompt(codeMap)

  const prompt = `You are evaluating Vue 3 / TypeScript code quality.

CODE:
${codeBlock}

CRITERIA:
${check.criteria}

Respond with exactly one line: PASS or FAIL followed by a brief reason.`

  try {
    const stdout = await spawnClaude([
      "-p",
      prompt,
      "--model",
      model,
      "--output-format",
      "text",
    ])

    const output = stdout.trim()
    const passed = output.toUpperCase().startsWith("PASS")
    return {
      id: check.id,
      type: "ai-judge",
      passed,
      detail: output,
    }
  } catch (err) {
    return {
      id: check.id,
      type: "ai-judge",
      passed: false,
      detail: `AI judge error: ${err.message}`,
    }
  }
}
