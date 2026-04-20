import { ref } from 'vue'

export function useFetch(url) {
  const data = ref(null)
  const error = ref(null)
  const loading = ref(false)

  async function execute(overrideUrl) {
    const target = overrideUrl ?? url
    loading.value = true
    error.value = null
    data.value = null

    try {
      const response = await fetch(target)
      if (!response.ok) {
        throw new Error(`Request failed: ${response.status} ${response.statusText}`)
      }
      data.value = await response.json()
    } catch (err) {
      error.value = err.message
    } finally {
      loading.value = false
    }
  }

  if (url) execute()

  return { data, error, loading, execute }
}
