import { ref, watch, onUnmounted } from 'vue'

export function useLocalStorage(key: string, defaultValue: string) {
  const read = () => {
    try {
      return localStorage.getItem(key) ?? defaultValue
    } catch {
      return defaultValue
    }
  }

  const value = ref(read())

  watch(value, (v) => {
    try {
      if (v === null || v === undefined) {
        localStorage.removeItem(key)
      } else {
        localStorage.setItem(key, v)
      }
    } catch {
      // storage unavailable (e.g. private browsing quota exceeded) - ignore
    }
  })

  const onStorage = (e: StorageEvent) => {
    if (e.key === key && e.newValue !== value.value) {
      value.value = e.newValue ?? defaultValue
    }
  }
  window.addEventListener('storage', onStorage)
  onUnmounted(() => window.removeEventListener('storage', onStorage))

  return value
}
