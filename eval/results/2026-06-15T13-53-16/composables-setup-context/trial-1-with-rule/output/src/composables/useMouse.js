import { ref, onMounted, onUnmounted } from 'vue'

// Tracks the current mouse position within the window.
// Must be called from <script setup> or setup() so the
// lifecycle hooks register against the active component instance.
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
