# Single responsibility for composables

Keep composables focused on a single concern. Split large composables into smaller, focused ones that can be composed together. This improves testability, reusability, and maintainability.

Example:

```typescript
// Bad - monolithic composable
function useCart() {
  const items = ref([])
  const addItem = () => { /* ... */ }
  const removeItem = () => { /* ... */ }
  const fetchCart = () => { /* ... */ }
  const checkout = () => { /* ... */ }
  const applyDiscount = () => { /* ... */ }
  // 200 more lines...
}

// Good - split by responsibility
function useCartItems() {
  const items = ref([])
  const addItem = () => { /* ... */ }
  const removeItem = () => { /* ... */ }
  return { items, addItem, removeItem }
}

function useCartFetch() {
  const { items } = useCartItems()
  const isLoading = ref(false)
  const fetchCart = async () => { /* ... */ }
  return { fetchCart, isLoading }
}

function useCheckout() {
  const { items } = useCartItems()
  const checkout = async () => { /* ... */ }
  return { checkout }
}
```

Each composable can be tested independently and reused in different contexts.

## Rule for AI agents

```
Split monolithic composables by concern (useCart -> useAddToCart, useFetchCart, useRemoveFromCart)
```

## Eslint rule

No ESLint rule available

## Source

- https://dev.to/jacobandrewsky/good-practices-and-design-patterns-for-vue-composables-24lk
- https://medium.com/@vasanthancomrads/custom-composables-in-vue-3-clean-code-through-reusability-a698bb1d81b3
