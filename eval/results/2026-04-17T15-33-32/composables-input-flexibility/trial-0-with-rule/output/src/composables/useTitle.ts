import { watchEffect, type MaybeRefOrGetter, toValue } from 'vue'

export function useTitle(title: MaybeRefOrGetter<string>) {
  watchEffect(() => {
    document.title = toValue(title)
  })
}
