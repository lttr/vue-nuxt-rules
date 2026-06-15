import { ref, onMounted, onUnmounted } from 'vue'

/**
 * Track whether the browser window/tab is currently focused.
 *
 * Needs reactive state plus listener setup and teardown, so it's a
 * composable rather than a plain utility.
 *
 * @example
 * const focused = useWindowFocus()
 * // focused.value is true when the window has focus
 *
 * @returns {import('vue').Ref<boolean>} Reactive focus state.
 */
export function useWindowFocus() {
  // Initialize from the document's current visibility/focus where available.
  const focused = ref(
    typeof document !== 'undefined' ? document.hasFocus() : true
  )

  const onFocus = () => {
    focused.value = true
  }

  const onBlur = () => {
    focused.value = false
  }

  const onVisibilityChange = () => {
    focused.value = !document.hidden && document.hasFocus()
  }

  onMounted(() => {
    window.addEventListener('focus', onFocus)
    window.addEventListener('blur', onBlur)
    document.addEventListener('visibilitychange', onVisibilityChange)
  })

  onUnmounted(() => {
    window.removeEventListener('focus', onFocus)
    window.removeEventListener('blur', onBlur)
    document.removeEventListener('visibilitychange', onVisibilityChange)
  })

  return focused
}
