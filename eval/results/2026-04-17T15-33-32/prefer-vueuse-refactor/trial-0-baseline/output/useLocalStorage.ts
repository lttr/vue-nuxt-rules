import { ref, watch, onScopeDispose, type Ref } from 'vue'

export function useLocalStorage<T>(key: string, defaultValue: T): Ref<T> {
  const read = (): T => {
    if (typeof localStorage === 'undefined') return defaultValue
    const raw = localStorage.getItem(key)
    if (raw === null) return defaultValue
    try {
      return JSON.parse(raw) as T
    } catch {
      return defaultValue
    }
  }

  const value = ref(read()) as Ref<T>

  const stop = watch(
    value,
    (v) => {
      if (typeof localStorage === 'undefined') return
      if (v === undefined) localStorage.removeItem(key)
      else localStorage.setItem(key, JSON.stringify(v))
    },
    { deep: true },
  )

  const onStorage = (e: StorageEvent) => {
    if (e.key !== key || e.storageArea !== localStorage) return
    value.value = read()
  }

  if (typeof window !== 'undefined') {
    window.addEventListener('storage', onStorage)
    onScopeDispose(() => {
      window.removeEventListener('storage', onStorage)
      stop()
    })
  }

  return value
}
