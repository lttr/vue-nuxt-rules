import { ref, onMounted, onUnmounted } from 'vue'

/**
 * Tracks the current window scroll position.
 *
 * @returns {{ x: import('vue').Ref<number>, y: import('vue').Ref<number> }}
 *   Reactive refs for the horizontal (x) and vertical (y) scroll offsets.
 */
export function useWindowScroll() {
  const x = ref(0)
  const y = ref(0)

  const update = () => {
    x.value = window.scrollX
    y.value = window.scrollY
  }

  // DOM access happens after mount, so this is SSR-safe and the initial
  // position is read once the window is available.
  onMounted(() => {
    update()
    window.addEventListener('scroll', update, { passive: true })
  })

  // Clean up the listener when the component is destroyed to avoid leaks
  // and callbacks firing against a torn-down component.
  onUnmounted(() => {
    window.removeEventListener('scroll', update)
  })

  return { x, y }
}
