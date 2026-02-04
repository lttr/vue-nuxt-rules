import { watch, toValue, type MaybeRefOrGetter } from 'vue'

export function useTitle(title: MaybeRefOrGetter<string>) {
  watch(
    () => toValue(title),
    (newTitle) => {
      document.title = newTitle
    },
    { immediate: true }
  )
}
