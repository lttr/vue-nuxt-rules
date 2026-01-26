# Use "use" prefix for composables

Always prefix composable function names with "use" (e.g., `useMouse`, `useFetch`, `useCounter`). This convention clearly signals that a function is a composable and follows Vue ecosystem standards.

The naming convention improves code discoverability, makes it immediately clear which functions require the setup context, and aligns with community standards including VueUse and Nuxt composables.

Example:

```typescript
// Good - clear composable naming
export function useCounter() {
  const count = ref(0)
  const increment = () => count.value++
  return { count, increment }
}

// Bad - unclear function purpose
export function counter() { /* ... */ }
export function getCounter() { /* ... */ }
```

## Rule for AI agents

```
ALWAYS prefix composable names with "use" (useMouse, useFetch)
```

## Eslint rule

No ESLint rule available

## Source

- https://vuejs.org/guide/reusability/composables.html#conventions-and-best-practices
