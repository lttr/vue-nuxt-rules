import { watch, isRef, ref } from 'vue'

export function useTitle(title) {
  const titleRef = isRef(title) ? title : ref(title)

  watch(
    titleRef,
    (newTitle) => {
      document.title = newTitle ?? ''
    },
    { immediate: true }
  )

  return titleRef
}
