import { ref, onMounted, onUnmounted } from 'vue'

/**
 * Track whether the browser window/tab is currently focused.
 *
 * Listens to `focus`/`blur` and the Page Visibility API so that switching
 * tabs, minimizing the window, or clicking away all update the state.
 *
 * @returns {{ focused: import('vue').Ref<boolean> }}
 *
 * @example
 * const { focused } = useWindowFocus()
 * // focused.value === true while the tab is active
 */
export function useWindowFocus() {
  // Initialize from the current document state when available (SSR-safe guard).
  const initial =
    typeof document !== 'undefined' ? document.visibilityState === 'visible' : true

  const focused = ref(initial)

  const onFocus = () => {
    focused.value = true
  }
  const onBlur = () => {
    focused.value = false
  }
  const onVisibilityChange = () => {
    focused.value = document.visibilityState === 'visible'
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

  return { focused }
}
