import { ref, onMounted, onUnmounted } from 'vue'

/**
 * Track whether the browser window/tab is currently focused.
 *
 * Combines focus/blur events with the Page Visibility API so that
 * switching tabs (not just losing focus to another app) is reflected.
 *
 * @returns {{ focused: import('vue').Ref<boolean> }}
 */
export function useWindowFocus() {
  // Initialize from the document's current state when available (SSR-safe).
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
