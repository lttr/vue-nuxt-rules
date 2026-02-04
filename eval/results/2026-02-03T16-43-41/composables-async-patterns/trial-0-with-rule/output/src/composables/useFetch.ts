import { ref, watchEffect, type Ref, isRef } from 'vue'

export function useFetch<T = unknown>(url: string | Ref<string>) {
  const data = ref<T | null>(null) as Ref<T | null>
  const loading = ref(false)
  const error = ref<Error | null>(null)

  async function fetchData(fetchUrl: string) {
    loading.value = true
    error.value = null

    try {
      const response = await fetch(fetchUrl)
      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`)
      }
      data.value = await response.json()
    } catch (err) {
      error.value = err instanceof Error ? err : new Error(String(err))
    } finally {
      loading.value = false
    }
  }

  watchEffect(() => {
    const fetchUrl = isRef(url) ? url.value : url
    if (fetchUrl) {
      fetchData(fetchUrl)
    }
  })

  return {
    data,
    loading,
    error
  }
}
