import { ref, onMounted, onUnmounted } from 'vue'

export function useWindowFocus() {
  const isFocused = ref(document.hasFocus())

  function onFocus() { isFocused.value = true }
  function onBlur() { isFocused.value = false }

  onMounted(() => {
    window.addEventListener('focus', onFocus)
    window.addEventListener('blur', onBlur)
  })

  onUnmounted(() => {
    window.removeEventListener('focus', onFocus)
    window.removeEventListener('blur', onBlur)
  })

  return { isFocused }
}
