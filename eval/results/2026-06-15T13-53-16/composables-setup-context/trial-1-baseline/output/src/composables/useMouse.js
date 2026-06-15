import { ref, onMounted, onUnmounted } from 'vue'

/**
 * Tracks the current mouse position within the viewport.
 * @returns {{ x: import('vue').Ref<number>, y: import('vue').Ref<number> }}
 */
export function useMouse() {
  const x = ref(0)
  const y = ref(0)

  function update(event) {
    x.value = event.clientX
    y.value = event.clientY
  }

  onMounted(() => window.addEventListener('mousemove', update))
  onUnmounted(() => window.removeEventListener('mousemove', update))

  return { x, y }
}
