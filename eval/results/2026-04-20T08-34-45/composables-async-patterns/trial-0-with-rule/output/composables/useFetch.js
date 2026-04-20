import { ref, watchEffect, toValue } from 'vue'

export function useFetch(url) {
  const data = ref(null)
  const loading = ref(false)
  const error = ref(null)

  watchEffect(async () => {
    const resolvedUrl = toValue(url)
    if (!resolvedUrl) return

    data.value = null
    error.value = null
    loading.value = true

    const controller = new AbortController()

    try {
      const response = await fetch(resolvedUrl, { signal: controller.signal })
      if (!response.ok) {
        throw new Error(`Request failed: ${response.status} ${response.statusText}`)
      }
      data.value = await response.json()
    } catch (err) {
      if (err.name !== 'AbortError') {
        error.value = err.message
      }
    } finally {
      loading.value = false
    }

    return () => controller.abort()
  })

  return { data, loading, error }
}
