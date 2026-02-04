import { ref, watchEffect, type Ref, shallowRef, toValue, type MaybeRefOrGetter } from 'vue'

export function useFetch<T = unknown>(url: MaybeRefOrGetter<string>) {
  const data: Ref<T | null> = shallowRef(null)
  const loading = ref(false)
  const error: Ref<Error | null> = ref(null)

  watchEffect(async () => {
    const urlValue = toValue(url)

    if (!urlValue) {
      return
    }

    data.value = null
    error.value = null
    loading.value = true

    try {
      const response = await fetch(urlValue)

      if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`)
      }

      data.value = await response.json()
    } catch (err) {
      error.value = err instanceof Error ? err : new Error(String(err))
    } finally {
      loading.value = false
    }
  })

  return {
    data,
    loading,
    error
  }
}
