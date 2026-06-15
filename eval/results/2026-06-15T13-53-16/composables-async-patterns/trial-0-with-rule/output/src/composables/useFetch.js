import { ref, toValue, watchEffect } from 'vue'

/**
 * Reactively fetch JSON from an API URL.
 *
 * @param {string | import('vue').Ref<string> | (() => string)} url
 *   The URL to fetch. May be a plain string, a ref, or a getter so the
 *   request re-runs whenever the source changes.
 * @returns {{
 *   data: import('vue').Ref<any>,
 *   loading: import('vue').Ref<boolean>,
 *   error: import('vue').Ref<Error | null>,
 * }}
 */
export function useFetch(url) {
  const data = ref(null)
  const loading = ref(false)
  const error = ref(null)

  watchEffect((onCleanup) => {
    const target = toValue(url)
    if (!target) return

    // Abort an in-flight request if the URL changes or the effect re-runs.
    const controller = new AbortController()
    onCleanup(() => controller.abort())

    data.value = null
    error.value = null
    loading.value = true

    fetch(target, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`)
        }
        return response.json()
      })
      .then((json) => {
        data.value = json
      })
      .catch((err) => {
        // Ignore the abort triggered by our own cleanup.
        if (err.name === 'AbortError') return
        error.value = err
      })
      .finally(() => {
        // Only the latest request should flip loading off.
        if (!controller.signal.aborted) {
          loading.value = false
        }
      })
  })

  return { data, loading, error }
}
