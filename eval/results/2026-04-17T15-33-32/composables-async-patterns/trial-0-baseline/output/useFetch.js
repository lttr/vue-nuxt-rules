import { ref, shallowRef, watchEffect, toValue } from 'vue'

export function useFetch(url, options = {}) {
  const data = shallowRef(null)
  const error = shallowRef(null)
  const isLoading = ref(false)

  let controller = null

  const execute = async () => {
    const resolvedUrl = toValue(url)
    if (!resolvedUrl) return

    if (controller) controller.abort()
    controller = new AbortController()

    data.value = null
    error.value = null
    isLoading.value = true

    try {
      const response = await fetch(resolvedUrl, {
        ...options,
        signal: controller.signal,
      })
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`)
      }
      const contentType = response.headers.get('content-type') || ''
      data.value = contentType.includes('application/json')
        ? await response.json()
        : await response.text()
    } catch (err) {
      if (err.name === 'AbortError') return
      error.value = err
    } finally {
      isLoading.value = false
    }
  }

  watchEffect(execute)

  return { data, error, isLoading, refetch: execute }
}
