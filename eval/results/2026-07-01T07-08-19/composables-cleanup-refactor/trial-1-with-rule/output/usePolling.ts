import { ref, onMounted, onUnmounted } from 'vue'

export function usePolling(url: string, intervalMs = 5000) {
  const data = ref(null)
  const error = ref(null)

  let timer: ReturnType<typeof setInterval> | null = null
  let controller: AbortController | null = null

  const poll = async () => {
    controller = new AbortController()
    try {
      const res = await fetch(url, { signal: controller.signal })
      data.value = await res.json()
    } catch (e) {
      if ((e as any)?.name !== 'AbortError') {
        error.value = e
      }
    }
  }

  onMounted(() => {
    poll()
    timer = setInterval(poll, intervalMs)
  })

  onUnmounted(() => {
    if (timer !== null) {
      clearInterval(timer)
      timer = null
    }
    controller?.abort()
  })

  return { data, error }
}
