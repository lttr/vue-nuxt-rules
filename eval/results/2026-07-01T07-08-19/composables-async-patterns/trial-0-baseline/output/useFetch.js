import { ref, watchEffect, toValue } from 'vue'

export function useFetch(url) {
  const data = ref(null)
  const error = ref(null)
  const isLoading = ref(false)

  async function load() {
    data.value = null
    error.value = null
    isLoading.value = true

    try {
      const resolvedUrl = toValue(url)
      const response = await fetch(resolvedUrl)

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`)
      }

      data.value = await response.json()
    } catch (err) {
      error.value = err
    } finally {
      isLoading.value = false
    }
  }

  watchEffect(load)

  return { data, error, isLoading, refresh: load }
}
