import { watch, toValue, type MaybeRefOrGetter } from 'vue'

export function useTitle(title: MaybeRefOrGetter<string>) {
  // Set initial title
  document.title = toValue(title)

  // Watch for changes and update document title
  watch(
    () => toValue(title),
    (newTitle) => {
      document.title = newTitle
    }
  )
}
