import { ref, isRef, watch, unref } from 'vue'

export function useTitle(newTitle) {
  const title = isRef(newTitle) ? newTitle : ref(newTitle)

  watch(
    title,
    (value) => {
      if (typeof document !== 'undefined' && value != null) {
        document.title = String(value)
      }
    },
    { immediate: true, flush: 'post' }
  )

  return title
}
