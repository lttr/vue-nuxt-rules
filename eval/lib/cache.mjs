import { readFile, writeFile } from "node:fs/promises"
import { join, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const CACHE_PATH = join(__dirname, "..", "eval-cache.json")

/**
 * Load eval cache from disk.
 * @returns {Promise<Record<string, { classification: string, passHistory: number[], model?: string, lastRunAt?: string }>>}
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
 * A cache entry is only reusable when running against the same model
 * or on the same UTC day. Upgrading models or crossing a day boundary
 * forces fresh baselines and default trial counts.
 */
function isEntryApplicable(entry, model, effort = null) {
  if (!entry) return false
  // Effort is part of the run identity: a mismatch always forces fresh runs,
  // even on the same day and model.
  if ((entry.effort || null) !== (effort || null)) return false
  const today = new Date().toISOString().slice(0, 10)
  const entryDay = entry.lastRunAt ? entry.lastRunAt.slice(0, 10) : null
  if (entry.model && model && entry.model === model) return true
  if (entryDay && entryDay === today) return true
  return false
}

/**
 * Determine optimal trial count based on cache history.
 * - 1 trial for already-known rules
 * - 1 trial for stable rules (>90% consistent results)
 * - defaultTrials for flaky/new rules or when cache entry doesn't apply
 *   (different model, different day).
 */
export function getTrialCount(
  evalName,
  cache,
  defaultTrials = 2,
  model,
  effort = null,
) {
  const entry = cache[evalName]
  if (!isEntryApplicable(entry, model, effort)) return defaultTrials

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
export function updateCacheEntry(
  evalName,
  classification,
  passRate,
  cache,
  model,
  effort = null,
) {
  const entry = cache[evalName] || { classification: null, passHistory: [] }
  entry.classification = classification
  entry.passHistory = [...(entry.passHistory || []), passRate].slice(-10)
  if (model) entry.model = model
  entry.effort = effort || null
  entry.lastRunAt = new Date().toISOString()
  cache[evalName] = entry
}

/**
 * Check if rule should skip baseline generation. Only skip when the cache
 * entry applies (same model or same day) and the rule is already-known.
 */
export function shouldSkipBaseline(evalName, cache, model, effort = null) {
  const entry = cache[evalName]
  if (!isEntryApplicable(entry, model, effort)) return false
  return entry.classification === "already-known"
}
