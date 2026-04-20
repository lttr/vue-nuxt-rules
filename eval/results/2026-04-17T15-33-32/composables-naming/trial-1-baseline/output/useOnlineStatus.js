import { ref, onMounted, onUnmounted } from 'vue'

export function useOnlineStatus() {
  const isOnline = ref(typeof navigator !== 'undefined' ? navigator.onLine : true)

  const updateOnline = () => {
    isOnline.value = true
  }

  const updateOffline = () => {
    isOnline.value = false
  }

  onMounted(() => {
    window.addEventListener('online', updateOnline)
    window.addEventListener('offline', updateOffline)
  })

  onUnmounted(() => {
    window.removeEventListener('online', updateOnline)
    window.removeEventListener('offline', updateOffline)
  })

  return { isOnline }
}
