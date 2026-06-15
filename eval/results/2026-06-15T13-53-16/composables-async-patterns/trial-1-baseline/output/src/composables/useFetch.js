import { ref, shallowRef, watchEffect, toValue } from 'vue'

/**
 * Reactively fetch JSON from an API URL.
 *
 * @param {string | (() => string) | import('vue').Ref<string>} url
 *   The URL to fetch. May be a plain string, a ref, or a getter — when it is
 *   reactive the request re-runs automatically as the URL changes.
 * @param {RequestInit} [options] - Options forwarded to `fetch`.
 * @returns {{
 *   data: import('vue').Ref<any>,
 *   error: import('vue').Ref<Error | null>,
 *   loading: import('vue').Ref<boolean>,
 *   refetch: () => void
 * }}
 */
export function useFetch(url, options = {}) {
  const data = shallowRef(null)
  const error = ref(null)
  const loading = ref(false)

  let controller = null

  async function execute() {
    // Cancel any in-flight request before starting a new one.
    if (controller) controller.abort()
    controller = new AbortController()

    const target = toValue(url)
    if (!target) return

    loading.value = true
    error.value = null

    try {
      const response = await fetch(target, {
        ...options,
        signal: controller.signal,
      })

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status} (${response.statusText})`)
      }

      data.value = await response.json()
    } catch (err) {
      // An aborted request is intentional, not a real error to surface.
      if (err.name === 'AbortError') return
      error.value = err
      data.value = null
    } finally {
      loading.value = false
    }
  }

  // Re-run whenever a reactive `url` changes; runs once for static URLs.
  watchEffect(execute)

  return { data, error, loading, refetch: execute }
}
