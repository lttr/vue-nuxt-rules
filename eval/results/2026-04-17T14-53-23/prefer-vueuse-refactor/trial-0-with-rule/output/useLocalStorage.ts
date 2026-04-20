import { useStorage } from '@vueuse/core'

export function useLocalStorage(key: string, defaultValue: string) {
  return useStorage(key, defaultValue)
}
