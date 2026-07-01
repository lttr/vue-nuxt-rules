// usePolling.ts
import { onScopeDispose, ref } from 'vue'

export function usePolling(url: string, intervalMs = 5000) {
  const data = ref(null)
  const error = ref(null)
  const loading = ref(false)

  let timer: ReturnType<typeof setTimeout> | null = null
  let stopped = false
  let inFlight: AbortController | null = null

  const poll = async () => {
    inFlight?.abort()
    const controller = new AbortController()
    inFlight = controller

    loading.value = true
    try {
      const res = await fetch(url, { signal: controller.signal })
      if (!res.ok) throw new Error(`Request failed: ${res.status} ${res.statusText}`)
      const json = await res.json()
      if (stopped || controller.signal.aborted) return
      data.value = json
      error.value = null
    } catch (e) {
      if (stopped || controller.signal.aborted) return
      error.value = e
    } finally {
      if (!controller.signal.aborted) loading.value = false
      if (!stopped) timer = setTimeout(poll, intervalMs)
    }
  }

  const stop = () => {
    stopped = true
    inFlight?.abort()
    if (timer) clearTimeout(timer)
    timer = null
  }

  const start = () => {
    if (stopped === false && timer) return
    stopped = false
    poll()
  }

  start()
  onScopeDispose(stop)

  return { data, error, loading, start, stop }
}
