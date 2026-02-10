import { ref, watch } from 'vue'
import type { Ref } from 'vue'

export function useLocalStorage(key: string, defaultValue: string): Ref<string> {
  let stored: string | null = null
  try {
    stored = localStorage.getItem(key)
  } catch {
    // localStorage may be unavailable (e.g. SSR, sandboxed iframe, storage disabled)
  }

  const value = ref(stored ?? defaultValue)

  watch(value, (v) => {
    try {
      localStorage.setItem(key, v)
    } catch {
      // quota exceeded or storage unavailable
    }
  })

  function onStorage(e: StorageEvent) {
    if (e.key === key) {
      value.value = e.newValue ?? defaultValue
    }
  }

  if (typeof window !== 'undefined') {
    window.addEventListener('storage', onStorage)
  }

  return value
}
