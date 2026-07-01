import { ref, onMounted, onUnmounted, type Ref } from 'vue'

export function useScroll(): { x: Ref<number>; y: Ref<number> } {
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
