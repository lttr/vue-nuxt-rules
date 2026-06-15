// useLocalStorage.ts
import { ref, watch, type Ref } from 'vue'

export interface UseLocalStorageOptions<T> {
  /** Custom serializer. Defaults to JSON.stringify. */
  serialize?: (value: T) => string
  /** Custom deserializer. Defaults to JSON.parse. */
  deserialize?: (raw: string) => T
  /** Sync the ref across browser tabs via the `storage` event. Default: true. */
  syncAcrossTabs?: boolean
}

/**
 * Reactive wrapper around `localStorage`.
 *
 * - Generic over the stored value (not just `string`); values are
 *   (de)serialized as JSON by default.
 * - Safe when `localStorage` is unavailable (SSR, privacy mode, quota errors):
 *   it degrades to an in-memory ref instead of throwing.
 * - Optionally keeps the ref in sync across tabs.
 */
export function useLocalStorage<T = string>(
  key: string,
  defaultValue: T,
  options: UseLocalStorageOptions<T> = {},
): Ref<T> {
  const {
    serialize = JSON.stringify as (value: T) => string,
    deserialize = JSON.parse as (raw: string) => T,
    syncAcrossTabs = true,
  } = options

  const storage = getStorage()

  const read = (): T => {
    if (!storage) return defaultValue
    const raw = storage.getItem(key)
    if (raw === null) return defaultValue
    try {
      return deserialize(raw)
    } catch {
      // Corrupt or non-deserializable value: fall back to the default.
      return defaultValue
    }
  }

  const value = ref(read()) as Ref<T>

  watch(
    value,
    (v) => {
      if (!storage) return
      try {
        storage.setItem(key, serialize(v))
      } catch {
        // Ignore write failures (e.g. quota exceeded, private mode).
      }
    },
    { deep: true },
  )

  if (syncAcrossTabs && typeof window !== 'undefined') {
    window.addEventListener('storage', (event: StorageEvent) => {
      if (event.key !== key || event.storageArea !== storage) return
      value.value = event.newValue === null ? defaultValue : safeDeserialize(event.newValue)
    })
  }

  function safeDeserialize(raw: string): T {
    try {
      return deserialize(raw)
    } catch {
      return defaultValue
    }
  }

  return value
}

function getStorage(): Storage | null {
  try {
    if (typeof localStorage === 'undefined') return null
    // Touch the API to surface SecurityError in restricted contexts.
    const probe = '__use_local_storage_probe__'
    localStorage.setItem(probe, probe)
    localStorage.removeItem(probe)
    return localStorage
  } catch {
    return null
  }
}
