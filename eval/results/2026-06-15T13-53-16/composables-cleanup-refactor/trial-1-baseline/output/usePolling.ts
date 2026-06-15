// usePolling.ts
import { ref, onScopeDispose, type Ref } from 'vue'

export interface UsePollingReturn<T> {
  data: Ref<T | null>
  error: Ref<unknown>
  isPolling: Ref<boolean>
  /** Fetch once, immediately, outside the interval schedule. */
  refresh: () => Promise<void>
  /** (Re)start the interval. Called automatically on creation. */
  start: () => void
  /** Stop the interval and abort any in-flight request. */
  stop: () => void
}

/**
 * Poll a URL on an interval, exposing reactive `data`/`error`.
 *
 * Improvements over a naive version:
 * - Clears the interval and aborts in-flight requests on scope dispose
 *   (no leaked timers/requests when the component unmounts).
 * - Checks `res.ok` so HTTP errors surface as errors, not parsed bodies.
 * - Skips overlapping requests if a poll is still in flight.
 * - Generic over the response type and returns manual start/stop/refresh.
 */
export function usePolling<T = unknown>(
  url: string,
  intervalMs = 5000,
): UsePollingReturn<T> {
  const data = ref<T | null>(null) as Ref<T | null>
  const error = ref<unknown>(null)
  const isPolling = ref(false)

  let timer: ReturnType<typeof setInterval> | null = null
  let controller: AbortController | null = null
  let inFlight = false

  const poll = async () => {
    // Avoid piling up requests if one is slower than the interval.
    if (inFlight) return
    inFlight = true
    controller = new AbortController()

    try {
      const res = await fetch(url, { signal: controller.signal })
      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`)
      }
      data.value = (await res.json()) as T
      error.value = null
    } catch (e) {
      // Ignore aborts triggered by stop()/dispose — they're not real errors.
      if (!(e instanceof DOMException && e.name === 'AbortError')) {
        error.value = e
      }
    } finally {
      inFlight = false
      controller = null
    }
  }

  const stop = () => {
    if (timer !== null) {
      clearInterval(timer)
      timer = null
    }
    controller?.abort()
    isPolling.value = false
  }

  const start = () => {
    if (timer !== null) return
    isPolling.value = true
    void poll()
    timer = setInterval(poll, intervalMs)
  }

  // Clean up when the surrounding component/effect scope is torn down.
  onScopeDispose(stop)

  start()

  return { data, error, isPolling, refresh: poll, start, stop }
}
