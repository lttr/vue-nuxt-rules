import { ref, onUnmounted } from 'vue'

export function usePolling<T = unknown>(url: string, intervalMs = 5000) {
  const data = ref<T | null>(null)
  const error = ref<Error | null>(null)
  let timer: ReturnType<typeof setInterval> | null = null

  const poll = async () => {
    try {
      const res = await fetch(url)
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`)
      }
      data.value = await res.json()
      error.value = null
    } catch (e) {
      error.value = e instanceof Error ? e : new Error(String(e))
    }
  }

  const start = () => {
    if (timer) return
    poll()
    timer = setInterval(poll, intervalMs)
  }

  const stop = () => {
    if (timer) {
      clearInterval(timer)
      timer = null
    }
  }

  start()
  onUnmounted(stop)

  return { data, error, start, stop }
}
