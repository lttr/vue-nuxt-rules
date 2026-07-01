import { ref, unref, watchEffect } from 'vue'

export function useFetch(url) {
  const data = ref(null)
  const error = ref(null)
  const isLoading = ref(false)

  const execute = async () => {
    data.value = null
    error.value = null
    isLoading.value = true

    try {
      const response = await fetch(unref(url))
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

  watchEffect(() => {
    execute()
  })

  return { data, error, isLoading, refetch: execute }
}
