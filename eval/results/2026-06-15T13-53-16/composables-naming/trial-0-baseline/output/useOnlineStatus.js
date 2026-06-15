import { ref, onMounted, onUnmounted } from 'vue'

/**
 * Tracks whether the user is currently online or offline.
 *
 * @returns {{ isOnline: import('vue').Ref<boolean> }}
 */
export function useOnlineStatus() {
  // Initialize from the current navigator state when available.
  const isOnline = ref(
    typeof navigator !== 'undefined' && typeof navigator.onLine === 'boolean'
      ? navigator.onLine
      : true
  )

  const setOnline = () => {
    isOnline.value = true
  }
  const setOffline = () => {
    isOnline.value = false
  }

  onMounted(() => {
    window.addEventListener('online', setOnline)
    window.addEventListener('offline', setOffline)
  })

  onUnmounted(() => {
    window.removeEventListener('online', setOnline)
    window.removeEventListener('offline', setOffline)
  })

  return { isOnline }
}
