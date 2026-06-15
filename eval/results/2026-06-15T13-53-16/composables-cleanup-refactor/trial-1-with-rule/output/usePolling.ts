// usePolling.ts
import { ref, onUnmounted, type Ref } from 'vue'

export interface UsePollingReturn<T> {
  data: Ref<T | null>
  error: Ref<unknown>
  isPolling: Ref<boolean>
  stop: () => void
}

export function usePolling<T = unknown>(
  url: string,
  intervalMs = 5000,
): UsePollingReturn<T> {
  const data = ref<T | null>(null) as Ref<T | null>
  const error = ref<unknown>(null)
  const isPolling = ref(false)

  let timer: ReturnType<typeof setInterval> | null = null
  // Guards against overlapping requests when a fetch outlasts intervalMs.
  let inFlight = false

  const poll = async () => {
    if (inFlight) return
    inFlight = true
    try {
      const res = await fetch(url)
      if (!res.ok) {
        throw new Error(`Request to ${url} failed with status ${res.status}`)
      }
      data.value = (await res.json()) as T
      error.value = null
    } catch (e) {
      error.value = e
    } finally {
      inFlight = false
    }
  }

  const stop = () => {
    if (timer !== null) {
      clearInterval(timer)
      timer = null
    }
    isPolling.value = false
  }

  // Kick off immediately, then on the interval.
  poll()
  timer = setInterval(poll, intervalMs)
  isPolling.value = true

  // Clean up the interval so polling stops when the component unmounts.
  onUnmounted(stop)

  return { data, error, isPolling, stop }
}
