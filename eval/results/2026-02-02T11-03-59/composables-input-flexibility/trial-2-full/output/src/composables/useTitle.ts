import { watchEffect, toValue, type MaybeRefOrGetter } from "vue"

export function useTitle(title: MaybeRefOrGetter<string>) {
  watchEffect(() => {
    document.title = toValue(title)
  })
}
