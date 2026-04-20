import { useLocalStorage as useVueUseLocalStorage } from '@vueuse/core'

export function useLocalStorage(key: string, defaultValue: string) {
  return useVueUseLocalStorage(key, defaultValue)
}
