import { ref, onMounted, onUnmounted } from 'vue'

export function usePolling(url: string, intervalMs = 5000) {
  const data = ref(null)
  const error = ref(null)
  let intervalId: ReturnType<typeof setInterval> | null = null

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
    intervalId = setInterval(poll, intervalMs)
  })

  onUnmounted(() => {
    if (intervalId !== null) {
      clearInterval(intervalId)
    }
  })

  return { data, error }
}
