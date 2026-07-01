import { ref, onMounted, onUnmounted } from 'vue'

export function useScroll() {
  const x = ref(window.scrollX)
  const y = ref(window.scrollY)

  function update() {
    x.value = window.scrollX
    y.value = window.scrollY
  }

  onMounted(() => {
    window.addEventListener('scroll', update, { passive: true })
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', update)
  })

  return { x, y }
}
