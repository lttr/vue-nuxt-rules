import { ref, shallowRef, toValue, watchEffect } from 'vue'

/**
 * Fetches data from an API URL and exposes reactive loading / error / data state.
 *
 * The `url` may be a plain string, a ref, or a getter. When it is reactive the
 * request is re-run automatically whenever the URL changes.
 *
 * @param {string | import('vue').Ref<string> | (() => string)} url
 * @param {RequestInit} [options] Optional `fetch` options (headers, method, ...).
 * @returns {{
 *   data: import('vue').ShallowRef<unknown>,
 *   error: import('vue').Ref<Error | null>,
 *   loading: import('vue').Ref<boolean>,
 *   refetch: () => void,
 * }}
 */
export function useFetch(url, options = {}) {
  const data = shallowRef(null)
  const error = ref(null)
  const loading = ref(false)

  let controller = null

  async function execute() {
    const resolvedUrl = toValue(url)
    if (!resolvedUrl) return

    // Cancel any in-flight request before starting a new one.
    controller?.abort()
    controller = new AbortController()

    loading.value = true
    error.value = null

    try {
      const response = await fetch(resolvedUrl, {
        ...options,
        signal: controller.signal,
      })

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status} (${response.statusText})`)
      }

      data.value = await response.json()
    } catch (err) {
      // An aborted request is intentional, not a real failure to surface.
      if (err.name === 'AbortError') return
      error.value = err instanceof Error ? err : new Error(String(err))
      data.value = null
    } finally {
      loading.value = false
    }
  }

  // Re-run automatically when a reactive `url` changes; runs once for a string.
  watchEffect(execute)

  return { data, error, loading, refetch: execute }
}
