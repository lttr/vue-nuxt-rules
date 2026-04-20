import { ref, watch, onScopeDispose, type Ref } from 'vue'

const isClient = typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'

export function useLocalStorage<T>(key: string, defaultValue: T): Ref<T> {
  const read = (): T => {
    if (!isClient) return defaultValue
    const raw = window.localStorage.getItem(key)
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
      if (!isClient) return
      try {
        if (v === undefined || v === null) {
          window.localStorage.removeItem(key)
        } else {
          window.localStorage.setItem(key, JSON.stringify(v))
        }
      } catch {
        // Ignore quota or serialization errors.
      }
    },
    { deep: true },
  )

  const onStorage = (e: StorageEvent) => {
    if (e.key !== key || e.storageArea !== window.localStorage) return
    value.value = read()
  }

  if (isClient) {
    window.addEventListener('storage', onStorage)
  }

  onScopeDispose(() => {
    stop()
    if (isClient) window.removeEventListener('storage', onStorage)
  })

  return value
}
