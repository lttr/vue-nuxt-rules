import { ref, onMounted, onUnmounted } from 'vue'

export function usePolling<T = unknown>(url: string, intervalMs = 5000) {
  const data = ref<T | null>(null)
  const error = ref<unknown>(null)

  let timer: ReturnType<typeof setInterval> | null = null

  const poll = async () => {
    try {
      const res = await fetch(url)
      if (!res.ok) throw new Error(`Request failed: ${res.status}`)
      data.value = (await res.json()) as T
      error.value = null
    } catch (e) {
      error.value = e
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
  })

  return { data, error }
}
