import { ref, watchEffect } from 'vue'

export function useFetch(url) {
  const data = ref(null)
  const loading = ref(false)
  const error = ref(null)

  watchEffect(async () => {
    const resolvedUrl = typeof url === 'function' ? url() : url.value ?? url
    if (!resolvedUrl) return

    loading.value = true
    error.value = null
    data.value = null

    try {
      const response = await fetch(resolvedUrl)
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`)
      }
      data.value = await response.json()
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  })

  return { data, loading, error }
}
