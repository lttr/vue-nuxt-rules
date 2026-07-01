import { ref, onMounted, onUnmounted } from 'vue'

/**
 * Tracks whether the browser window/tab currently has focus.
 * Combines window focus/blur events with the Page Visibility API
 * so it also reflects tab switches, not just OS-level window focus.
 * @returns {{ isFocused: import('vue').Ref<boolean> }}
 */
export function useWindowFocus() {
  const isFocused = ref(typeof document === 'undefined' || document.visibilityState !== 'hidden')

  function handleFocus() {
    isFocused.value = true
  }

  function handleBlur() {
    isFocused.value = false
  }

  function handleVisibilityChange() {
    isFocused.value = document.visibilityState === 'visible'
  }

  onMounted(() => {
    window.addEventListener('focus', handleFocus)
    window.addEventListener('blur', handleBlur)
    document.addEventListener('visibilitychange', handleVisibilityChange)
  })

  onUnmounted(() => {
    window.removeEventListener('focus', handleFocus)
    window.removeEventListener('blur', handleBlur)
    document.removeEventListener('visibilitychange', handleVisibilityChange)
  })

  return { isFocused }
}
