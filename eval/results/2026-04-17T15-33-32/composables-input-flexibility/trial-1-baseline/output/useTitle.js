import { ref, isRef, watch } from 'vue'

export function useTitle(newTitle) {
  const title = isRef(newTitle) ? newTitle : ref(newTitle)

  watch(
    title,
    (value) => {
      if (typeof document !== 'undefined' && value != null) {
        document.title = value
      }
    },
    { immediate: true }
  )

  return title
}
