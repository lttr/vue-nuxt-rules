import { ref, watch, onUnmounted, type Ref } from 'vue'

export function useLocalStorage<T>(key: string, defaultValue: T): Ref<T> {
  const read = (): T => {
    if (typeof localStorage === 'undefined') return defaultValue
    try {
      const raw = localStorage.getItem(key)
      return raw === null ? defaultValue : (JSON.parse(raw) as T)
    } catch {
      return defaultValue
    }
  }

  const value = ref(read()) as Ref<T>

  watch(
    value,
    (v) => {
      if (typeof localStorage === 'undefined') return
      try {
        if (v === undefined) localStorage.removeItem(key)
        else localStorage.setItem(key, JSON.stringify(v))
      } catch {
        // quota exceeded or storage unavailable — ignore
      }
    },
    { deep: true },
  )

  if (typeof window !== 'undefined') {
    const onStorage = (e: StorageEvent) => {
      if (e.key !== key || e.storageArea !== localStorage) return
      try {
        value.value = e.newValue === null ? defaultValue : (JSON.parse(e.newValue) as T)
      } catch {
        value.value = defaultValue
      }
    }
    window.addEventListener('storage', onStorage)
    onUnmounted(() => window.removeEventListener('storage', onStorage))
  }

  return value
}
