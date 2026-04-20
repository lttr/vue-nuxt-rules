import { ref, onUnmounted } from 'vue'

export function usePolling<T>(url: string, intervalMs = 5000) {
  const data = ref<T | null>(null)
  const error = ref<unknown>(null)
  const isLoading = ref(false)

  let timerId: ReturnType<typeof setInterval> | null = null

  const poll = async () => {
    isLoading.value = true
    try {
      const res = await fetch(url)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      data.value = await res.json()
      error.value = null
    } catch (e) {
      error.value = e
    } finally {
      isLoading.value = false
    }
  }

  const start = () => {
    if (timerId !== null) return
    poll()
    timerId = setInterval(poll, intervalMs)
  }

  const stop = () => {
    if (timerId !== null) {
      clearInterval(timerId)
      timerId = null
    }
  }

  start()
  onUnmounted(stop)

  return { data, error, isLoading, start, stop, refresh: poll }
}
