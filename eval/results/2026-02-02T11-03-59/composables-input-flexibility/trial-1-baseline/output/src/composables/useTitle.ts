import { watch, ref, type Ref, type MaybeRefOrGetter, toValue } from 'vue'

export function useTitle(title: MaybeRefOrGetter<string>): Ref<string> {
  const currentTitle = ref(toValue(title))

  watch(
    () => toValue(title),
    (newTitle) => {
      currentTitle.value = newTitle
      document.title = newTitle
    },
    { immediate: true }
  )

  watch(currentTitle, (newTitle) => {
    document.title = newTitle
  })

  return currentTitle
}
