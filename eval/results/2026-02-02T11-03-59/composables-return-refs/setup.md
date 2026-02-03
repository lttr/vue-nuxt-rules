# Setup

- **Model**: claude-opus-4-5-20251101
- **Rule file**: composables-return-refs.md
- **Allowed tools**: Bash(*), Read, Write, Edit

## Prompt

```
Create a Vue 3 composable that tracks mouse cursor position
on the page. Return the coordinates.

```

## Full rule content

````markdown
# Return plain objects with refs from composables

Composables should return a plain object containing refs, not a `reactive()` object. When destructuring a `reactive()` object, the extracted values lose their reactivity. Plain objects with refs preserve reactivity through destructuring.

Example:

```typescript
// Good - refs in plain object
function useMouse() {
  const x = ref(0)
  const y = ref(0)
  return { x, y }
}

// Usage - reactivity preserved
const { x, y } = useMouse()

// Bad - reactive object loses reactivity on destructure
function useMouse() {
  const state = reactive({ x: 0, y: 0 })
  return state
}

// Usage - x and y are no longer reactive
const { x, y } = useMouse()
```

If you need the state as a reactive object without destructuring, consumers can wrap the returned object with `reactive()`.

## Rule for AI agents

```
- ALWAYS return a plain object of refs — never wrap return in `reactive()`
```

## Eslint rule

No ESLint rule available

## Source

- https://vuejs.org/guide/reusability/composables.html#return-values

````

## Extracted rule content

````markdown
- ALWAYS return a plain object of refs — never wrap return in `reactive()`
````
