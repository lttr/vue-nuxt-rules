import { ref, onMounted, onUnmounted } from 'vue'

export function useWindowScroll() {
  const x = ref(0)
  const y = ref(0)

  function updateScroll() {
    x.value = window.scrollX
    y.value = window.scrollY
  }

  onMounted(() => {
    updateScroll()
    window.addEventListener('scroll', updateScroll, { passive: true })
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', updateScroll)
  })

  return { x, y }
}
