import { spawn } from "node:child_process";

/**
 * Spawn claude -p in detached mode (works inside parent claude sessions).
 */
function spawnClaude(args, timeout = 90_000) {
  return new Promise((resolve, reject) => {
    const child = spawn("claude", args, {
      detached: true,
      stdio: ["ignore", "pipe", "pipe"],
    });

    let stdout = "";
    let stderr = "";
    child.stdout.on("data", (d) => (stdout += d));
    child.stderr.on("data", (d) => (stderr += d));

    const timer = setTimeout(() => {
      child.kill();
      reject(new Error(`claude timed out after ${timeout}ms`));
    }, timeout);

    child.on("close", (code) => {
      clearTimeout(timer);
      if (code === 0) resolve(stdout);
      else reject(new Error(`claude exited ${code}: ${stderr}`));
    });
  });
}

/**
 * Run all checks against generated code.
 * Returns array of { id, type, passed, detail }
 */
export async function evaluate(code, checks, opts = {}) {
  const results = [];

  for (const check of checks) {
    if (check.type === "regex") {
      results.push(evalRegex(code, check));
    } else if (check.type === "ai-judge") {
      results.push(await evalAiJudge(code, check, opts));
    }
  }

  return results;
}

function evalRegex(code, check) {
  const re = new RegExp(check.pattern, check.flags || "");
  const found = re.test(code);
  const expect = check.expect ?? "present";
  const passed = expect === "present" ? found : !found;

  return {
    id: check.id,
    type: "regex",
    passed,
    detail: `pattern ${found ? "found" : "not found"}, expected ${expect}`,
  };
}

async function evalAiJudge(code, check, opts) {
  const model = opts.model || "claude-sonnet-4-20250514";

  const prompt = `You are evaluating Vue 3 SFC code quality.

CODE:
\`\`\`vue
${code}
\`\`\`

CRITERIA:
${check.criteria}

Respond with exactly one line: PASS or FAIL followed by a brief reason.`;

  try {
    const stdout = await spawnClaude([
      "-p",
      prompt,
      "--model",
      model,
      "--output-format",
      "text",
    ]);

    const output = stdout.trim();
    const passed = output.toUpperCase().startsWith("PASS");
    return {
      id: check.id,
      type: "ai-judge",
      passed,
      detail: output,
    };
  } catch (err) {
    return {
      id: check.id,
      type: "ai-judge",
      passed: false,
      detail: `AI judge error: ${err.message}`,
    };
  }
}
