import { ref, shallowRef, watchEffect, toValue } from 'vue'

export function useFetch(url) {
  const data = shallowRef(null)
  const error = ref(null)
  const isLoading = ref(false)

  async function fetchData() {
    const resolvedUrl = toValue(url)
    if (!resolvedUrl) return

    data.value = null
    error.value = null
    isLoading.value = true

    try {
      const response = await fetch(resolvedUrl)
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`)
      }
      data.value = await response.json()
    } catch (err) {
      error.value = err.message
    } finally {
      isLoading.value = false
    }
  }

  watchEffect(() => {
    fetchData()
  })

  return { data, error, isLoading, retry: fetchData }
}
