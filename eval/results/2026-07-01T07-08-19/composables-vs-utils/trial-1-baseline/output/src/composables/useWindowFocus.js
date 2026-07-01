import { onBeforeUnmount, onMounted, ref } from 'vue'

export function useWindowFocus() {
  const isFocused = ref(typeof document === 'undefined' ? true : document.hasFocus())

  const handleFocus = () => { isFocused.value = true }
  const handleBlur = () => { isFocused.value = false }
  const handleVisibilityChange = () => {
    isFocused.value = document.visibilityState === 'visible' && document.hasFocus()
  }

  onMounted(() => {
    window.addEventListener('focus', handleFocus)
    window.addEventListener('blur', handleBlur)
    document.addEventListener('visibilitychange', handleVisibilityChange)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('focus', handleFocus)
    window.removeEventListener('blur', handleBlur)
    document.removeEventListener('visibilitychange', handleVisibilityChange)
  })

  return { isFocused }
}
