import { ref, watchEffect, toValue } from 'vue'

export function useFetch(url) {
  const data = ref(null)
  const error = ref(null)
  const loading = ref(false)

  watchEffect(async (onCleanup) => {
    const resolvedUrl = toValue(url)
    if (!resolvedUrl) return

    const controller = new AbortController()
    onCleanup(() => controller.abort())

    data.value = null
    error.value = null
    loading.value = true

    try {
      const response = await fetch(resolvedUrl, { signal: controller.signal })
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`)
      }
      data.value = await response.json()
    } catch (err) {
      if (err.name !== 'AbortError') {
        error.value = err.message
      }
    } finally {
      loading.value = false
    }
  })

  return { data, error, loading }
}
