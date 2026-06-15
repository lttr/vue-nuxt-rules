import { ref, onMounted, onUnmounted } from 'vue'

/**
 * Reactive window scroll position.
 *
 * Returns `x` and `y` refs that stay in sync with `window.scrollX` /
 * `window.scrollY`. The scroll listener is attached on mount and removed
 * when the owning component is unmounted, so it never fires (or leaks)
 * after the component is destroyed.
 *
 * @param {Object} [options]
 * @param {Window | HTMLElement} [options.target=window] - Scroll target.
 * @param {boolean} [options.passive=true] - Use a passive listener.
 * @returns {{ x: import('vue').Ref<number>, y: import('vue').Ref<number> }}
 */
export function useWindowScroll(options = {}) {
  const { target = typeof window !== 'undefined' ? window : null, passive = true } = options

  const x = ref(0)
  const y = ref(0)

  function update() {
    if (!target) return
    // `window` exposes scrollX/scrollY; elements expose scrollLeft/scrollTop.
    x.value = target === window ? window.scrollX : target.scrollLeft
    y.value = target === window ? window.scrollY : target.scrollTop
  }

  onMounted(() => {
    if (!target) return
    update() // capture the initial position
    target.addEventListener('scroll', update, { passive })
  })

  onUnmounted(() => {
    if (!target) return
    target.removeEventListener('scroll', update)
  })

  return { x, y }
}
