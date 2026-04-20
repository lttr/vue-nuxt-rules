import { ref, watch, onMounted, onUnmounted } from 'vue'

export function useLocalStorage<T>(key: string, defaultValue: T) {
  function read(): T {
    try {
      const raw = localStorage.getItem(key)
      return raw !== null ? (JSON.parse(raw) as T) : defaultValue
    } catch {
      return defaultValue
    }
  }

  const value = ref<T>(read())

  watch(
    value,
    (v) => {
      try {
        localStorage.setItem(key, JSON.stringify(v))
      } catch {
        // storage quota exceeded or unavailable
      }
    },
    { deep: true }
  )

  function onStorage(event: StorageEvent) {
    if (event.key === key) {
      value.value = read() as typeof value.value
    }
  }

  onMounted(() => window.addEventListener('storage', onStorage))
  onUnmounted(() => window.removeEventListener('storage', onStorage))

  return value
}
