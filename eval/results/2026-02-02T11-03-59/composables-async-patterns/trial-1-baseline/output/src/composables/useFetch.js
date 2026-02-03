import { ref, shallowRef, watchEffect, isRef, toValue } from 'vue'

export function useFetch(url) {
  const data = shallowRef(null)
  const error = ref(null)
  const loading = ref(false)

  async function fetchData() {
    const resolvedUrl = toValue(url)
    if (!resolvedUrl) return

    data.value = null
    error.value = null
    loading.value = true

    try {
      const response = await fetch(resolvedUrl)
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`)
      }
      data.value = await response.json()
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  if (isRef(url)) {
    watchEffect(fetchData)
  } else {
    fetchData()
  }

  return { data, error, loading, retry: fetchData }
}
