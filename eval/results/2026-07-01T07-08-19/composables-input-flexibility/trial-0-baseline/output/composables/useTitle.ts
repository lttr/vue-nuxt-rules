import { watch, isRef, type Ref } from 'vue'

export function useTitle(title: string | Ref<string>) {
  watch(
    isRef(title) ? title : () => title,
    (newTitle) => {
      document.title = newTitle
    },
    { immediate: true }
  )
}
