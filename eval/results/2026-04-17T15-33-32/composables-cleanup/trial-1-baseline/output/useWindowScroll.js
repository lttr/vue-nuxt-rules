import { ref, onMounted, onBeforeUnmount } from 'vue'

export function useWindowScroll() {
  const x = ref(0)
  const y = ref(0)

  const update = () => {
    x.value = window.scrollX
    y.value = window.scrollY
  }

  onMounted(() => {
    update()
    window.addEventListener('scroll', update, { passive: true })
  })

  onBeforeUnmount(() => {
    window.removeEventListener('scroll', update)
  })

  return { x, y }
}
