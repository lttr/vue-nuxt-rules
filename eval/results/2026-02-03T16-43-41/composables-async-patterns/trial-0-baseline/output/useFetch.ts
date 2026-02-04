import { ref, shallowRef, readonly } from 'vue'

export function useFetch<T = unknown>(url: string) {
  const data = shallowRef<T | null>(null)
  const error = ref<Error | null>(null)
  const isLoading = ref(false)

  async function fetchData() {
    isLoading.value = true
    error.value = null

    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`)
      }
      data.value = await response.json()
    } catch (e) {
      error.value = e instanceof Error ? e : new Error(String(e))
    } finally {
      isLoading.value = false
    }
  }

  // Fetch immediately
  fetchData()

  return {
    data: readonly(data),
    error: readonly(error),
    isLoading: readonly(isLoading),
    refetch: fetchData,
  }
}
