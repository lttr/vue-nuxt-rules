import { watch, isRef, toRef } from 'vue'

export function useTitle(title) {
  const titleRef = isRef(title) ? title : toRef(() => title)

  watch(titleRef, (value) => {
    document.title = value ?? ''
  }, { immediate: true })
}
