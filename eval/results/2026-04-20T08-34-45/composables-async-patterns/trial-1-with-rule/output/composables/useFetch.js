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

    try {
      const response = await fetch(resolvedUrl)
      if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      data.value = await response.json()
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  })

  return { data, loading, error }
}
