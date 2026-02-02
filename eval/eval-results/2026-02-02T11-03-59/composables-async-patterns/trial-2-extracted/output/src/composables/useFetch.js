import { ref, watchEffect, toValue, isRef } from 'vue'

export function useFetch(url) {
  const data = ref(null)
  const error = ref(null)
  const loading = ref(false)

  async function fetchData(targetUrl) {
    data.value = null
    error.value = null
    loading.value = true

    try {
      const response = await fetch(targetUrl)
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
    watchEffect(() => {
      fetchData(toValue(url))
    })
  } else {
    fetchData(url)
  }

  return { data, error, loading }
}
