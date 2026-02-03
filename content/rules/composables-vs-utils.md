# Composables vs utility functions

Use composables only when you need Vue's reactivity system or lifecycle hooks. Pure functions that don't require reactive state should be regular utility functions.

Composables are for:

- Reactive state that persists across component lifecycle
- Lifecycle-aware logic (onMounted, onUnmounted, etc.)
- Watchers and computed properties

Utility functions are for:

- Pure transformations (formatting, calculations)
- Stateless operations
- Functions that work outside Vue context

Composables should not:

- Directly manipulate DOM elements
- Handle CSS/styling logic
- Contain template-specific code
- Trigger UI side effects (toasts, modals, alerts)

Instead of showing notifications or dialogs inside a composable, expose error and status state and let the component decide how to present it.

Example:

```typescript
// Composable - needs reactivity and lifecycle
function useWindowSize() {
  const width = ref(window.innerWidth)
  onMounted(() => window.addEventListener("resize", update))
  onUnmounted(() => window.removeEventListener("resize", update))
  return { width }
}

// Utility - pure function, no reactivity needed
function formatDate(date: Date): string {
  return date.toLocaleDateString()
}
```

## Rule for AI agents

```
PREFER plain utility functions over composables unless you need reactivity or lifecycle hooks. Expose state, let components handle presentation.
```

## Eslint rule

No ESLint rule available

## Source

- https://vuejs.org/guide/reusability/composables.html
- https://dev.to/jacobandrewsky/good-practices-and-design-patterns-for-vue-composables-24lk
