// useLocalStorage.ts
import { ref, watch, type Ref } from 'vue'

export interface UseLocalStorageOptions<T> {
  /** Serialize a value to a string for storage. Defaults to JSON.stringify. */
  serialize?: (value: T) => string
  /** Deserialize a stored string back into a value. Defaults to JSON.parse. */
  deserialize?: (raw: string) => T
  /** Keep the ref in sync with changes from other tabs/windows. Default: true. */
  syncTabs?: boolean
  /** Called when reading/writing storage fails (e.g. quota exceeded, disabled). */
  onError?: (error: unknown) => void
}

const isBrowser = typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'

/**
 * A reactive ref backed by localStorage.
 *
 * - Generic over the stored type, with pluggable (de)serialization so you can
 *   store objects, numbers, booleans, etc. — not just strings.
 * - SSR-safe: falls back to the default value when `window` is unavailable.
 * - Persists deep changes (objects/arrays are watched deeply).
 * - Optionally syncs across tabs via the `storage` event.
 */
export function useLocalStorage<T = string>(
  key: string,
  defaultValue: T,
  options: UseLocalStorageOptions<T> = {},
): Ref<T> {
  const {
    serialize = JSON.stringify as (value: T) => string,
    deserialize = JSON.parse as (raw: string) => T,
    syncTabs = true,
    onError = (error: unknown) => console.warn(`[useLocalStorage] "${key}":`, error),
  } = options

  const read = (): T => {
    if (!isBrowser) return defaultValue
    try {
      const raw = window.localStorage.getItem(key)
      return raw === null ? defaultValue : deserialize(raw)
    } catch (error) {
      onError(error)
      return defaultValue
    }
  }

  const value = ref(read()) as Ref<T>

  watch(
    value,
    (v) => {
      if (!isBrowser) return
      try {
        if (v === undefined || v === null) {
          window.localStorage.removeItem(key)
        } else {
          window.localStorage.setItem(key, serialize(v))
        }
      } catch (error) {
        onError(error)
      }
    },
    { deep: true },
  )

  if (isBrowser && syncTabs) {
    window.addEventListener('storage', (event) => {
      if (event.key !== key || event.storageArea !== window.localStorage) return
      try {
        value.value = event.newValue === null ? defaultValue : deserialize(event.newValue)
      } catch (error) {
        onError(error)
      }
    })
  }

  return value
}
