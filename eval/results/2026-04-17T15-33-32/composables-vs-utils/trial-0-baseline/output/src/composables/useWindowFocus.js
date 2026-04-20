import { ref, onMounted, onBeforeUnmount } from 'vue'

export function useWindowFocus() {
  const focused = ref(typeof document !== 'undefined' ? document.hasFocus() : true)

  const onFocus = () => { focused.value = true }
  const onBlur = () => { focused.value = false }

  onMounted(() => {
    window.addEventListener('focus', onFocus)
    window.addEventListener('blur', onBlur)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('focus', onFocus)
    window.removeEventListener('blur', onBlur)
  })

  return focused
}
