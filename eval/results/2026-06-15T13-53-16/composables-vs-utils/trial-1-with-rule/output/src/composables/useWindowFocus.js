import { ref, onMounted, onUnmounted } from 'vue'

/**
 * Track whether the browser window is currently focused.
 *
 * This is a composable rather than a plain util because it owns reactive state
 * and needs lifecycle hooks to attach/detach window event listeners.
 *
 * @returns {{ focused: import('vue').Ref<boolean> }} A reactive `focused` ref.
 */
export function useWindowFocus() {
  // Initialize from the current state where available (SSR-safe fallback).
  const initial = typeof document !== 'undefined' ? document.hasFocus() : true
  const focused = ref(initial)

  const onFocus = () => { focused.value = true }
  const onBlur = () => { focused.value = false }

  onMounted(() => {
    window.addEventListener('focus', onFocus)
    window.addEventListener('blur', onBlur)
  })

  onUnmounted(() => {
    window.removeEventListener('focus', onFocus)
    window.removeEventListener('blur', onBlur)
  })

  return { focused }
}
