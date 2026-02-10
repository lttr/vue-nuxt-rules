import { useLocalStorage as useLocalStorageVueUse } from '@vueuse/core'

export function useLocalStorage(key: string, defaultValue: string) {
  return useLocalStorageVueUse(key, defaultValue)
}
