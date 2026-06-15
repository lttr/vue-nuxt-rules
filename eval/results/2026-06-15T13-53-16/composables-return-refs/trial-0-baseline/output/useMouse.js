import { ref, onMounted, onUnmounted } from 'vue'

/**
 * Tracks the mouse cursor position on the page.
 *
 * @returns {{ x: import('vue').Ref<number>, y: import('vue').Ref<number> }}
 *   Reactive cursor coordinates.
 */
export function useMouse() {
  const x = ref(0)
  const y = ref(0)

  function update(event) {
    x.value = event.pageX
    y.value = event.pageY
  }

  onMounted(() => window.addEventListener('mousemove', update))
  onUnmounted(() => window.removeEventListener('mousemove', update))

  return { x, y }
}
