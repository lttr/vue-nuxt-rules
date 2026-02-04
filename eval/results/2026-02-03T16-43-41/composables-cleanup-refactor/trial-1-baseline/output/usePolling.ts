import { ref, onUnmounted } from 'vue'

export function usePolling<T>(url: string, intervalMs = 5000) {
  const data = ref<T | null>(null)
  const error = ref<Error | null>(null)
  const isLoading = ref(false)

  let intervalId: ReturnType<typeof setInterval> | null = null
  let isActive = true

  const poll = async () => {
    if (!isActive) return

    isLoading.value = true
    try {
      const res = await fetch(url)
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`)
      }
      if (isActive) {
        data.value = await res.json()
        error.value = null
      }
    } catch (e) {
      if (isActive) {
        error.value = e instanceof Error ? e : new Error(String(e))
      }
    } finally {
      if (isActive) {
        isLoading.value = false
      }
    }
  }

  const start = () => {
    if (intervalId) return
    isActive = true
    poll()
    intervalId = setInterval(poll, intervalMs)
  }

  const stop = () => {
    isActive = false
    if (intervalId) {
      clearInterval(intervalId)
      intervalId = null
    }
  }

  start()

  onUnmounted(() => {
    stop()
  })

  return { data, error, isLoading, start, stop }
}
