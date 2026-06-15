import { ref, onMounted, onUnmounted } from 'vue'

/**
 * Tracks whether the browser is currently online or offline.
 *
 * @returns {{ isOnline: import('vue').Ref<boolean> }} reactive online status
 */
export function useOnlineStatus() {
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
