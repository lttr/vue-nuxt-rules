import { ref, onScopeDispose, type Ref } from 'vue'

export interface UsePollingReturn<T> {
  data: Ref<T | null>
  error: Ref<unknown>
  isPolling: Ref<boolean>
  stop: () => void
  start: () => void
}

export function usePolling<T = unknown>(
  url: string,
  intervalMs = 5000,
): UsePollingReturn<T> {
  const data = ref<T | null>(null) as Ref<T | null>
  const error = ref<unknown>(null)
  const isPolling = ref(false)

  let timer: ReturnType<typeof setTimeout> | null = null
  let controller: AbortController | null = null
  let stopped = true

  const poll = async () => {
    controller?.abort()
    controller = new AbortController()

    try {
      const res = await fetch(url, { signal: controller.signal })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      data.value = (await res.json()) as T
      error.value = null
    } catch (e) {
      if ((e as { name?: string })?.name === 'AbortError') return
      error.value = e
    } finally {
      if (!stopped) {
        timer = setTimeout(poll, intervalMs)
      }
    }
  }

  const start = () => {
    if (!stopped) return
    stopped = false
    isPolling.value = true
    poll()
  }

  const stop = () => {
    stopped = true
    isPolling.value = false
    if (timer !== null) {
      clearTimeout(timer)
      timer = null
    }
    controller?.abort()
    controller = null
  }

  start()
  onScopeDispose(stop)

  return { data, error, isPolling, stop, start }
}
