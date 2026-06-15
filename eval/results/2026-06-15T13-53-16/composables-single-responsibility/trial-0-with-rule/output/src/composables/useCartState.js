import { ref } from 'vue'

// Shared cart state, consumed by the cart composables below.
// Kept as a module-level singleton so every composable sees the same items.
const items = ref([])

export function useCartState() {
  return { items }
}
