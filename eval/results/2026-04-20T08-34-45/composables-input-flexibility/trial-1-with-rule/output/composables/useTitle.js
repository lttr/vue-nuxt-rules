import { watchEffect, toValue } from 'vue'

export function useTitle(title) {
  watchEffect(() => {
    document.title = toValue(title)
  })
}
