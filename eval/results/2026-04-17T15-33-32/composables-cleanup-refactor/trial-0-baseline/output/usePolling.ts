import { ref, onScopeDispose, type Ref } from 'vue'

export interface UsePollingReturn<T> {
  data: Ref<T | null>
  error: Ref<unknown>
  isLoading: Ref<boolean>
  stop: () => void
  start: () => void
  refresh: () => Promise<void>
}

export function usePolling<T = unknown>(
  url: string,
  intervalMs = 5000,
): UsePollingReturn<T> {
  const data = ref<T | null>(null) as Ref<T | null>
  const error = ref<unknown>(null)
  const isLoading = ref(false)

  let timerId: ReturnType<typeof setTimeout> | null = null
  let controller: AbortController | null = null
  let active = false

  const poll = async () => {
    controller?.abort()
    controller = new AbortController()
    isLoading.value = true
    try {
      const res = await fetch(url, { signal: controller.signal })
      if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`)
      data.value = (await res.json()) as T
      error.value = null
    } catch (e) {
      if ((e as { name?: string }).name === 'AbortError') return
      error.value = e
    } finally {
      isLoading.value = false
    }
  }

  const schedule = () => {
    if (!active) return
    timerId = setTimeout(async () => {
      await poll()
      schedule()
    }, intervalMs)
  }

  const start = () => {
    if (active) return
    active = true
    void poll().then(schedule)
  }

  const stop = () => {
    active = false
    if (timerId !== null) {
      clearTimeout(timerId)
      timerId = null
    }
    controller?.abort()
    controller = null
  }

  start()
  onScopeDispose(stop)

  return { data, error, isLoading, stop, start, refresh: poll }
}
