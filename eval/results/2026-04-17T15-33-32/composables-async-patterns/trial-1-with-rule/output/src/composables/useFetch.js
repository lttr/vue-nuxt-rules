import { ref, watchEffect, toValue } from 'vue'

export function useFetch(url) {
  const data = ref(null)
  const error = ref(null)
  const loading = ref(false)

  watchEffect(async (onCleanup) => {
    const resolvedUrl = toValue(url)
    data.value = null
    error.value = null

    if (!resolvedUrl) return

    loading.value = true
    const controller = new AbortController()
    onCleanup(() => controller.abort())

    try {
      const response = await fetch(resolvedUrl, { signal: controller.signal })
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`)
      }
      data.value = await response.json()
    } catch (err) {
      if (err.name !== 'AbortError') {
        error.value = err
      }
    } finally {
      loading.value = false
    }
  })

  return { data, error, loading }
}
