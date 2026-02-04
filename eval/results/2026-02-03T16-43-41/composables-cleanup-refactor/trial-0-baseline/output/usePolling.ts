import { ref, onUnmounted, type Ref } from 'vue'

export interface UsePollingOptions {
  intervalMs?: number
  immediate?: boolean
}

export interface UsePollingReturn<T> {
  data: Ref<T | null>
  error: Ref<Error | null>
  isLoading: Ref<boolean>
  isPolling: Ref<boolean>
  pause: () => void
  resume: () => void
  refresh: () => Promise<void>
}

export function usePolling<T = unknown>(
  url: string,
  options: UsePollingOptions = {}
): UsePollingReturn<T> {
  const { intervalMs = 5000, immediate = true } = options

  const data = ref<T | null>(null) as Ref<T | null>
  const error = ref<Error | null>(null)
  const isLoading = ref(false)
  const isPolling = ref(false)

  let intervalId: ReturnType<typeof setInterval> | null = null

  const poll = async () => {
    isLoading.value = true
    try {
      const res = await fetch(url)
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`)
      }
      data.value = await res.json()
      error.value = null
    } catch (e) {
      error.value = e instanceof Error ? e : new Error(String(e))
    } finally {
      isLoading.value = false
    }
  }

  const pause = () => {
    if (intervalId !== null) {
      clearInterval(intervalId)
      intervalId = null
      isPolling.value = false
    }
  }

  const resume = () => {
    if (intervalId === null) {
      poll()
      intervalId = setInterval(poll, intervalMs)
      isPolling.value = true
    }
  }

  const refresh = async () => {
    await poll()
  }

  if (immediate) {
    resume()
  }

  onUnmounted(() => {
    pause()
  })

  return { data, error, isLoading, isPolling, pause, resume, refresh }
}
