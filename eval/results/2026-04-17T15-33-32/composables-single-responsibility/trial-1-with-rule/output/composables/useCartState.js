import { ref, readonly } from 'vue'

const items = ref([])

export function useCartState() {
  return {
    items: readonly(items),
    setItems: (next) => { items.value = next },
  }
}
