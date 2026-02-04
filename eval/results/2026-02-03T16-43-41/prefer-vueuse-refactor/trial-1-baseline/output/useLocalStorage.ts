import { ref, watch, type Ref } from 'vue'

export function useLocalStorage<T>(key: string, defaultValue: T): Ref<T> {
  const read = (): T => {
    if (typeof window === 'undefined') {
      return defaultValue
    }
    try {
      const item = localStorage.getItem(key)
      return item !== null ? JSON.parse(item) : defaultValue
    } catch {
      return defaultValue
    }
  }

  const value = ref(read()) as Ref<T>

  watch(
    value,
    (newValue) => {
      try {
        localStorage.setItem(key, JSON.stringify(newValue))
      } catch {
        // Handle quota exceeded or other storage errors
      }
    },
    { deep: true }
  )

  return value
}
