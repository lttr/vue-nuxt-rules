// usePolling.ts
import { ref, onUnmounted } from 'vue'

export function usePolling(url: string, intervalMs = 5000) {
  const data = ref(null)
  const error = ref<unknown>(null)
  const isLoading = ref(false)

  let timer: ReturnType<typeof setTimeout> | null = null
  let controller: AbortController | null = null
  let stopped = false

  const poll = async () => {
    controller?.abort()
    controller = new AbortController()
    isLoading.value = true

    try {
      const res = await fetch(url, { signal: controller.signal })
      if (!res.ok) throw new Error(`Request failed with status ${res.status}`)
      const json = await res.json()
      if (!stopped) {
        data.value = json
        error.value = null
      }
    } catch (e) {
      if (!stopped && (e as Error)?.name !== 'AbortError') {
        error.value = e
      }
    } finally {
      if (!stopped) {
        isLoading.value = false
        timer = setTimeout(poll, intervalMs)
      }
    }
  }

  const stop = () => {
    stopped = true
    controller?.abort()
    if (timer) clearTimeout(timer)
    timer = null
  }

  const start = () => {
    if (stopped === false && timer === null) {
      stopped = false
      poll()
    }
  }

  poll()
  onUnmounted(stop)

  return { data, error, isLoading, stop, start }
}
