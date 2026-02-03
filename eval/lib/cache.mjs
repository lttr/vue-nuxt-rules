import { readFile, writeFile } from "node:fs/promises"
import { join, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const CACHE_PATH = join(__dirname, "..", "eval-cache.json")

/**
 * Load eval cache from disk.
 * @returns {Promise<Record<string, { classification: string, passHistory: number[] }>>}
 */
export async function loadCache() {
  try {
    const content = await readFile(CACHE_PATH, "utf-8")
    return JSON.parse(content)
  } catch {
    return {}
  }
}

/**
 * Save eval cache to disk.
 */
export async function saveCache(cache) {
  await writeFile(CACHE_PATH, JSON.stringify(cache, null, 2) + "\n")
}

/**
 * Determine optimal trial count based on cache history.
 * - 1 trial for already-known rules
 * - 1 trial for stable rules (>90% consistent results)
 * - 2 trials for flaky/new rules
 */
export function getTrialCount(evalName, cache, defaultTrials = 2) {
  const entry = cache[evalName]
  if (!entry) return defaultTrials

  if (entry.classification === "already-known") return 1

  const history = entry.passHistory || []
  if (history.length >= 3) {
    const variance = calcVariance(history)
    if (variance < 0.1) return 1 // stable
  }

  return defaultTrials
}

/**
 * Calculate variance of pass rates (0-1).
 */
function calcVariance(rates) {
  if (rates.length === 0) return 1
  const mean = rates.reduce((a, b) => a + b, 0) / rates.length
  const sqDiffs = rates.map((r) => (r - mean) ** 2)
  return sqDiffs.reduce((a, b) => a + b, 0) / rates.length
}

/**
 * Update cache entry with new eval result.
 */
export function updateCacheEntry(evalName, classification, passRate, cache) {
  const entry = cache[evalName] || { classification: null, passHistory: [] }
  entry.classification = classification
  entry.passHistory = [...(entry.passHistory || []), passRate].slice(-10)
  cache[evalName] = entry
}

/**
 * Check if rule should skip baseline generation.
 */
export function shouldSkipBaseline(evalName, cache) {
  const entry = cache[evalName]
  return entry?.classification === "already-known"
}
