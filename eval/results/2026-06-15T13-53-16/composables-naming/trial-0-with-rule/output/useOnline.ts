import { ref, onMounted, onUnmounted } from 'vue'

/**
 * Tracks whether the user is currently online or offline.
 * Returns a reactive boolean that updates on the browser's
 * `online` / `offline` events.
 */
export function useOnline() {
  const isOnline = ref(typeof navigator !== 'undefined' ? navigator.onLine : true)

  const updateStatus = () => {
    isOnline.value = navigator.onLine
  }

  onMounted(() => {
    window.addEventListener('online', updateStatus)
    window.addEventListener('offline', updateStatus)
  })

  onUnmounted(() => {
    window.removeEventListener('online', updateStatus)
    window.removeEventListener('offline', updateStatus)
  })

  return { isOnline }
}
