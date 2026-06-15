import { ref, onMounted, onUnmounted, type Ref } from 'vue'

export interface UseWindowScrollReturn {
  /** Horizontal scroll position in pixels (window.scrollX). */
  x: Ref<number>
  /** Vertical scroll position in pixels (window.scrollY). */
  y: Ref<number>
}

/**
 * Reactively track the current window scroll position.
 *
 * The scroll listener is attached on mount (DOM access) and removed on
 * unmount, so it keeps working correctly and leaves no dangling listener
 * when the component using it is destroyed.
 */
export function useWindowScroll(): UseWindowScrollReturn {
  const x = ref(0)
  const y = ref(0)

  const update = () => {
    x.value = window.scrollX
    y.value = window.scrollY
  }

  onMounted(() => {
    // Initialize with the position at mount time, then keep in sync.
    update()
    window.addEventListener('scroll', update, { passive: true })
  })

  onUnmounted(() => {
    window.removeEventListener('scroll', update)
  })

  return { x, y }
}
