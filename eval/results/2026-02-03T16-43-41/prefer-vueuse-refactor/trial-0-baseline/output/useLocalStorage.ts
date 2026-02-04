import { ref, watch } from 'vue'

export function useLocalStorage(key: string, defaultValue: string) {
  const storedValue = localStorage.getItem(key)
  const value = ref(storedValue ?? defaultValue)

  if (storedValue === null) {
    localStorage.setItem(key, defaultValue)
  }

  watch(value, (v) => localStorage.setItem(key, v))

  window.addEventListener('storage', (e) => {
    if (e.key === key && e.newValue !== null) {
      value.value = e.newValue
    }
  })

  return value
}
