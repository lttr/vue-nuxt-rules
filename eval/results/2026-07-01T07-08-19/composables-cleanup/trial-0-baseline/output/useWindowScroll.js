import { ref, onMounted, onUnmounted } from 'vue'

export function useWindowScroll() {
  const x = ref(typeof window !== 'undefined' ? window.scrollX : 0)
  const y = ref(typeof window !== 'undefined' ? window.scrollY : 0)

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
