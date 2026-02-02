# Setup

- **Model**: claude-opus-4-5-20251101
- **Rule file**: composables-cleanup.md
- **Allowed tools**: Bash(*), Read, Write, Edit

## Prompt

```
Create a Vue 3 composable that tracks the current window scroll
position (x and y). It should work correctly when the component
using it is destroyed.

```

## Full rule content

````markdown
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
    window.addEventListener("mousemove", update)
  })

  // Cleanup - prevents memory leaks
  onUnmounted(() => {
    window.removeEventListener("mousemove", update)
  })

  return { x, y }
}
```

## Rule for AI agents

```
- ALWAYS clean up side effects via `onUnmounted()`; use `onMounted()` for DOM access
```

## Eslint rule

No ESLint rule available

## Source

- https://vuejs.org/guide/reusability/composables.html#side-effects

````

## Extracted rule content

````markdown
- ALWAYS clean up side effects via `onUnmounted()`; use `onMounted()` for DOM access
````
