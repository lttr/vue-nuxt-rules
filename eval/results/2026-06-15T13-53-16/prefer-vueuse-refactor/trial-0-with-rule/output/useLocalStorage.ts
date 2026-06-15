// useLocalStorage.ts
import { useStorage } from '@vueuse/core'
import type { RemovableRef } from '@vueuse/core'

export function useLocalStorage(key: string, defaultValue: string): RemovableRef<string> {
  return useStorage(key, defaultValue, localStorage)
}
