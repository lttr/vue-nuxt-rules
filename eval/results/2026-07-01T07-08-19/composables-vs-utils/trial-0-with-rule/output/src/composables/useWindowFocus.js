import { ref, onMounted, onUnmounted } from 'vue'

export function useWindowFocus() {
  const isFocused = ref(document.hasFocus())

  const handleFocus = () => { isFocused.value = true }
  const handleBlur = () => { isFocused.value = false }

  onMounted(() => {
    window.addEventListener('focus', handleFocus)
    window.addEventListener('blur', handleBlur)
  })

  onUnmounted(() => {
    window.removeEventListener('focus', handleFocus)
    window.removeEventListener('blur', handleBlur)
  })

  return { isFocused }
}
