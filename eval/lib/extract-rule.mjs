import { readFile } from "node:fs/promises";
import { join } from "node:path";

const RULES_DIR = join(import.meta.dirname, "../../content/rules");

/**
 * Extract the "Rule for AI agents" code block from a rule markdown file.
 * Returns the raw text inside the fenced code block.
 */
export async function extractRule(ruleFilename) {
  const filepath = join(RULES_DIR, ruleFilename);
  const content = await readFile(filepath, "utf-8");

  const match = content.match(
    /## Rule for AI agents\s+```[^\n]*\n([\s\S]*?)```/,
  );
  if (!match) {
    throw new Error(`No "Rule for AI agents" block found in ${ruleFilename}`);
  }
  return match[1].trim();
}
