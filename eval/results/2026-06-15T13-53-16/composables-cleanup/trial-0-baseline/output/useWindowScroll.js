import { ref, onMounted, onUnmounted } from 'vue'

/**
 * Tracks the current window scroll position (x and y).
 *
 * Listeners are registered on mount and removed on unmount, so the
 * composable stops updating and leaks nothing once the component that
 * uses it is destroyed.
 *
 * @param {Object} [options]
 * @param {boolean} [options.passive=true] Use a passive scroll listener.
 * @returns {{ x: import('vue').Ref<number>, y: import('vue').Ref<number> }}
 */
export function useWindowScroll({ passive = true } = {}) {
  const x = ref(0)
  const y = ref(0)

  const update = () => {
    // Guard for SSR / non-browser environments.
    if (typeof window === 'undefined') return
    x.value = window.scrollX ?? window.pageXOffset ?? 0
    y.value = window.scrollY ?? window.pageYOffset ?? 0
  }

  onMounted(() => {
    update()
    window.addEventListener('scroll', update, { passive })
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', update)
  })

  return { x, y }
}
