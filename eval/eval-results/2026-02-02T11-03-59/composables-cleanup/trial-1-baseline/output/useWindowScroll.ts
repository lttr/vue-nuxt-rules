import { ref, onMounted, onUnmounted } from 'vue'

export function useWindowScroll() {
  const x = ref(0)
  const y = ref(0)

  function update() {
    x.value = window.scrollX
    y.value = window.scrollY
  }

  onMounted(() => {
    update()
    window.addEventListener('scroll', update, { passive: true })
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', update)
  })

  return { x, y }
}
