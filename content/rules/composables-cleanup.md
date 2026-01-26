# Clean up side effects in composables

When a composable creates side effects (event listeners, timers, subscriptions), always clean them up in `onUnmounted()` to prevent memory leaks. For DOM operations, use `onMounted()` to ensure SSR compatibility since the DOM doesn't exist during server-side rendering.

Example:

```typescript
function useMouse() {
  const x = ref(0)
  const y = ref(0)

  function update(event: MouseEvent) {
    x.value = event.pageX
    y.value = event.pageY
  }

  // DOM operation - only runs client-side
  onMounted(() => {
    window.addEventListener('mousemove', update)
  })

  // Cleanup - prevents memory leaks
  onUnmounted(() => {
    window.removeEventListener('mousemove', update)
  })

  return { x, y }
}
```

## Rule for AI agents

```
ALWAYS cleanup side effects in onUnmounted(); use onMounted() for DOM operations
```

## Eslint rule

No ESLint rule available

## Source

- https://vuejs.org/guide/reusability/composables.html#side-effects
