import { watch, toValue, type MaybeRefOrGetter } from 'vue'

export function useTitle(title: MaybeRefOrGetter<string>) {
  watch(
    () => toValue(title),
    (value) => {
      document.title = value
    },
    { immediate: true },
  )
}
