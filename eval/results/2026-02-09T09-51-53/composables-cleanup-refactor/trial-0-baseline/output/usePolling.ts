import { ref, onUnmounted } from 'vue'

export function usePolling(url: string, intervalMs = 5000) {
  const data = ref(null)
  const error = ref(null)
  const isPolling = ref(false)

  let timer: ReturnType<typeof setInterval> | null = null
  let abortController: AbortController | null = null

  const poll = async () => {
    abortController?.abort()
    abortController = new AbortController()

    try {
      const res = await fetch(url, { signal: abortController.signal })
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`)
      }
      data.value = await res.json()
      error.value = null
    } catch (e) {
      if (e instanceof DOMException && e.name === 'AbortError') return
      error.value = e
    }
  }

  const start = () => {
    if (isPolling.value) return
    isPolling.value = true
    poll()
    timer = setInterval(poll, intervalMs)
  }

  const stop = () => {
    isPolling.value = false
    abortController?.abort()
    abortController = null
    if (timer !== null) {
      clearInterval(timer)
      timer = null
    }
  }

  start()
  onUnmounted(stop)

  return { data, error, isPolling, start, stop }
}
