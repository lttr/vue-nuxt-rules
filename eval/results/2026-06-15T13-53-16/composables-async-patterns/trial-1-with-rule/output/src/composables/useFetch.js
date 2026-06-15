import { ref, toValue, watchEffect } from 'vue'

/**
 * Reactive data fetching composable.
 *
 * @param {string|import('vue').Ref<string>|(() => string)} url
 *   The API URL to fetch. May be a plain string, a ref, or a getter so the
 *   request re-runs whenever the URL changes.
 * @returns {{
 *   data: import('vue').Ref<unknown>,
 *   loading: import('vue').Ref<boolean>,
 *   error: import('vue').Ref<Error|null>,
 * }}
 */
export function useFetch(url) {
  const data = ref(null)
  const loading = ref(false)
  const error = ref(null)

  watchEffect((onCleanup) => {
    const target = toValue(url)
    if (!target) return

    // Abort an in-flight request if the URL changes or the component unmounts.
    const controller = new AbortController()
    onCleanup(() => controller.abort())

    loading.value = true
    error.value = null
    data.value = null

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
        // A fresh request (or unmount) aborted this one — not a real error.
        if (err.name === 'AbortError') return
        error.value = err
      })
      .finally(() => {
        loading.value = false
      })
  })

  return { data, loading, error }
}
