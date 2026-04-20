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
        // storage quota exceeded or private browsing restriction
      }
    },
    { deep: true },
  )

  function onStorageEvent(e: StorageEvent) {
    if (e.key === key && e.storageArea === localStorage) {
      value.value = read()
    }
  }

  onMounted(() => window.addEventListener('storage', onStorageEvent))
  onUnmounted(() => window.removeEventListener('storage', onStorageEvent))

  return value
}
