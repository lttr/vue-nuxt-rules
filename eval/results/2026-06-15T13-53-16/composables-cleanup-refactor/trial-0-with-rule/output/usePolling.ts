// usePolling.ts
import { ref, onUnmounted } from 'vue'

export function usePolling<T = unknown>(url: string, intervalMs = 5000) {
  const data = ref<T | null>(null)
  const error = ref<unknown>(null)

  let timer: ReturnType<typeof setInterval> | null = null
  let controller: AbortController | null = null

  const poll = async () => {
    // Cancel any in-flight request before starting a new one.
    controller?.abort()
    controller = new AbortController()

    try {
      const res = await fetch(url, { signal: controller.signal })
      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`)
      }
      data.value = await res.json()
      error.value = null
    } catch (e) {
      // Ignore aborts triggered by cleanup or a superseding poll.
      if (e instanceof DOMException && e.name === 'AbortError') return
      error.value = e
    }
  }

  const stop = () => {
    if (timer !== null) {
      clearInterval(timer)
      timer = null
    }
    controller?.abort()
    controller = null
  }

  poll()
  timer = setInterval(poll, intervalMs)

  // Clean up the interval and any pending request when the component unmounts.
  onUnmounted(stop)

  return { data, error, stop }
}
