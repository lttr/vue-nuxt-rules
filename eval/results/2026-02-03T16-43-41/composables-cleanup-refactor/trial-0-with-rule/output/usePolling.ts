import { ref, onUnmounted } from 'vue'

export function usePolling(url: string, intervalMs = 5000) {
  const data = ref(null)
  const error = ref(null)

  const poll = async () => {
    try {
      const res = await fetch(url)
      data.value = await res.json()
    } catch (e) {
      error.value = e
    }
  }

  poll()
  const intervalId = setInterval(poll, intervalMs)

  onUnmounted(() => {
    clearInterval(intervalId)
  })

  return { data, error }
}
