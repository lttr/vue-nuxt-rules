# Setup

- **Model**: claude-opus-4-5-20251101
- **Rule file**: composables-vs-utils.md
- **Allowed tools**: Bash(*), Read, Write, Edit

## Prompt

```
Create code for a Vue 3 app that needs: a function to format
currency values (e.g. 1234.5 → "$1,234.50"), a function to
format dates, and a feature that tracks whether the browser
window is focused.

```

## Full rule content

````markdown
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
- Only create composables when you need reactivity or lifecycle hooks — otherwise use plain utility functions
- Composables manage state/logic, not UI side effects — expose state, let components handle presentation
```

## Eslint rule

No ESLint rule available

## Source

- https://vuejs.org/guide/reusability/composables.html
- https://dev.to/jacobandrewsky/good-practices-and-design-patterns-for-vue-composables-24lk

````

## Extracted rule content

````markdown
- Only create composables when you need reactivity or lifecycle hooks — otherwise use plain utility functions
- Composables manage state/logic, not UI side effects — expose state, let components handle presentation
````
