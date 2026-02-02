# Setup

- **Model**: claude-opus-4-5-20251101
- **Rule file**: composables-single-responsibility.md
- **Allowed tools**: Bash(*), Read, Write, Edit

## Prompt

```
Create Vue 3 composables for a shopping cart feature. The feature
needs: managing cart items (add/remove), fetching cart data from
an API, calculating totals and discounts, and processing checkout.

```

## Full rule content

````markdown
# Single responsibility for composables

Keep composables focused on a single concern. Split large composables into smaller, focused ones that can be composed together. This improves testability, reusability, and maintainability.

Example:

```typescript
// Bad - monolithic composable
function useCart() {
  const items = ref([])
  const addItem = () => {
    /* ... */
  }
  const removeItem = () => {
    /* ... */
  }
  const fetchCart = () => {
    /* ... */
  }
  const checkout = () => {
    /* ... */
  }
  const applyDiscount = () => {
    /* ... */
  }
  // 200 more lines...
}

// Good - split by responsibility
function useCartItems() {
  const items = ref([])
  const addItem = () => {
    /* ... */
  }
  const removeItem = () => {
    /* ... */
  }
  return { items, addItem, removeItem }
}

function useCartFetch() {
  const { items } = useCartItems()
  const isLoading = ref(false)
  const fetchCart = async () => {
    /* ... */
  }
  return { fetchCart, isLoading }
}

function useCheckout() {
  const { items } = useCartItems()
  const checkout = async () => {
    /* ... */
  }
  return { checkout }
}
```

Each composable can be tested independently and reused in different contexts.

## Rule for AI agents

```
- PREFER splitting large composables by concern (e.g. `useCart` → `useAddToCart` + `useFetchCart`)
```

## Eslint rule

No ESLint rule available

## Source

- https://dev.to/jacobandrewsky/good-practices-and-design-patterns-for-vue-composables-24lk

````

## Extracted rule content

````markdown
- PREFER splitting large composables by concern (e.g. `useCart` → `useAddToCart` + `useFetchCart`)
````
