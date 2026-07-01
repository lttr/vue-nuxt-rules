// usePolling.ts
import { ref, onMounted, onUnmounted } from 'vue'

export function usePolling(url: string, intervalMs = 5000) {
  const data = ref(null)
  const error = ref(null)

  let intervalId: ReturnType<typeof setInterval> | undefined
  let controller: AbortController | undefined

  const poll = async () => {
    controller = new AbortController()
    try {
      const res = await fetch(url, { signal: controller.signal })
      data.value = await res.json()
    } catch (e) {
      if ((e as { name?: string }).name !== 'AbortError') {
        error.value = e
      }
    }
  }

  onMounted(() => {
    poll()
    intervalId = setInterval(poll, intervalMs)
  })

  onUnmounted(() => {
    if (intervalId !== undefined) clearInterval(intervalId)
    controller?.abort()
  })

  return { data, error }
}
