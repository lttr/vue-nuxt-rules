import { ref, onMounted, onUnmounted } from 'vue'

export function usePolling<T = unknown>(url: string, intervalMs = 5000) {
  const data = ref<T | null>(null)
  const error = ref<unknown>(null)

  let timer: ReturnType<typeof setInterval> | null = null
  let controller: AbortController | null = null

  const poll = async () => {
    controller?.abort()
    controller = new AbortController()
    try {
      const res = await fetch(url, { signal: controller.signal })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      data.value = await res.json()
      error.value = null
    } catch (e) {
      if ((e as { name?: string })?.name === 'AbortError') return
      error.value = e
    }
  }

  onMounted(() => {
    poll()
    timer = setInterval(poll, intervalMs)
  })

  onUnmounted(() => {
    if (timer !== null) clearInterval(timer)
    controller?.abort()
  })

  return { data, error }
}
