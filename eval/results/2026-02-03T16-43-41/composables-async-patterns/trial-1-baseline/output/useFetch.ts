import { ref, shallowRef, type Ref, type ShallowRef } from 'vue'

interface UseFetchReturn<T> {
  data: ShallowRef<T | null>
  error: Ref<Error | null>
  isLoading: Ref<boolean>
  execute: () => Promise<void>
}

export function useFetch<T = unknown>(url: string | Ref<string>): UseFetchReturn<T> {
  const data = shallowRef<T | null>(null)
  const error = ref<Error | null>(null)
  const isLoading = ref(false)

  async function execute(): Promise<void> {
    const fetchUrl = typeof url === 'string' ? url : url.value

    isLoading.value = true
    error.value = null

    try {
      const response = await fetch(fetchUrl)

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status} ${response.statusText}`)
      }

      data.value = await response.json()
    } catch (err) {
      error.value = err instanceof Error ? err : new Error(String(err))
      data.value = null
    } finally {
      isLoading.value = false
    }
  }

  execute()

  return {
    data,
    error,
    isLoading,
    execute,
  }
}
