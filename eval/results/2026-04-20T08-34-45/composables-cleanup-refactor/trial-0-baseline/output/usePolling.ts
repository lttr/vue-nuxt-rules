import { ref, onUnmounted } from 'vue'

export function usePolling(url: string, intervalMs = 5000) {
  const data = ref<unknown>(null)
  const error = ref<unknown>(null)
  const loading = ref(false)

  let timer: ReturnType<typeof setTimeout> | null = null
  let active = true

  const poll = async () => {
    if (!active) return
    loading.value = true
    try {
      const res = await fetch(url)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      data.value = await res.json()
      error.value = null
    } catch (e) {
      error.value = e
    } finally {
      loading.value = false
      if (active) timer = setTimeout(poll, intervalMs)
    }
  }

  const stop = () => {
    active = false
    if (timer !== null) clearTimeout(timer)
  }

  const refresh = () => {
    if (timer !== null) clearTimeout(timer)
    poll()
  }

  onUnmounted(stop)
  poll()

  return { data, error, loading, stop, refresh }
}
