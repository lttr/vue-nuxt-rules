// useLocalStorage.ts
import { ref, watch } from 'vue'

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
      localStorage.setItem(key, v)
    } catch {
      // localStorage unavailable (e.g. private browsing quota exceeded) - ignore
    }
  })

  const onStorage = (e: StorageEvent) => {
    if (e.key === key) {
      value.value = e.newValue ?? defaultValue
    }
  }
  window.addEventListener('storage', onStorage)

  return value
}
