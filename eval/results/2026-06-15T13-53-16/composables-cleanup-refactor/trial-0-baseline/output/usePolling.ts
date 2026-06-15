// usePolling.ts
import { ref, shallowRef, onScopeDispose, type Ref } from 'vue'

export interface UsePollingOptions {
  /** Polling interval in milliseconds. Defaults to 5000. */
  intervalMs?: number
  /** Start polling immediately. Defaults to true. */
  immediate?: boolean
}

export interface UsePolling<T> {
  data: Ref<T | null>
  error: Ref<unknown>
  isPolling: Ref<boolean>
  /** Run a single poll immediately. */
  refresh: () => Promise<void>
  /** Start the interval (no-op if already running). */
  start: () => void
  /** Stop the interval and abort any in-flight request. */
  stop: () => void
}

export function usePolling<T = unknown>(
  url: string,
  options: UsePollingOptions = {},
): UsePolling<T> {
  const { intervalMs = 5000, immediate = true } = options

  const data = shallowRef<T | null>(null)
  const error = ref<unknown>(null)
  const isPolling = ref(false)

  let timer: ReturnType<typeof setTimeout> | null = null
  let controller: AbortController | null = null

  const poll = async () => {
    // Abort any request still in flight so slow responses can't overlap.
    controller?.abort()
    controller = new AbortController()

    try {
      const res = await fetch(url, { signal: controller.signal })
      if (!res.ok) {
        throw new Error(`Request failed: ${res.status} ${res.statusText}`)
      }
      data.value = (await res.json()) as T
      error.value = null
    } catch (e) {
      // Ignore aborts triggered by stop()/overlap handling.
      if (e instanceof DOMException && e.name === 'AbortError') return
      error.value = e
    }
  }

  // Chain timeouts instead of setInterval so a slow poll never stacks requests.
  const scheduleNext = () => {
    timer = setTimeout(run, intervalMs)
  }

  const run = async () => {
    await poll()
    if (isPolling.value) scheduleNext()
  }

  const refresh = () => poll()

  const start = () => {
    if (isPolling.value) return
    isPolling.value = true
    run()
  }

  const stop = () => {
    isPolling.value = false
    if (timer !== null) {
      clearTimeout(timer)
      timer = null
    }
    controller?.abort()
    controller = null
  }

  if (immediate) start()

  // Clean up when the owning component/scope is torn down.
  onScopeDispose(stop)

  return { data, error, isPolling, refresh, start, stop }
}
