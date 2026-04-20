import { ref, onMounted, onUnmounted } from 'vue'

export function usePolling(url: string, intervalMs = 5000) {
  const data = ref(null)
  const error = ref(null)
  let timer: ReturnType<typeof setInterval> | null = null

  const poll = async () => {
    try {
      const res = await fetch(url)
      data.value = await res.json()
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
