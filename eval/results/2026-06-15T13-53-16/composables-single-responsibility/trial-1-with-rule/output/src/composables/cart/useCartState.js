import { reactive, readonly } from 'vue'

/**
 * Shared, module-level cart state.
 *
 * Kept tiny and dependency-free so the behavioural composables
 * (useCartItems, useFetchCart, useCartTotals, useCheckout) can each
 * own a single concern while reading/writing the same source of truth.
 */
const state = reactive({
  items: [],
})

export function useCartState() {
  return {
    // expose a readonly view; mutations go through the dedicated composables
    items: readonly(state).items,
    // internal handle for composables that need to mutate
    _state: state,
  }
}
