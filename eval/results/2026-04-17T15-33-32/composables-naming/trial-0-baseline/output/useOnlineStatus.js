import { ref, onMounted, onUnmounted } from 'vue'

export function useOnlineStatus() {
  const isOnline = ref(typeof navigator !== 'undefined' ? navigator.onLine : true)

  const setOnline = () => { isOnline.value = true }
  const setOffline = () => { isOnline.value = false }

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
