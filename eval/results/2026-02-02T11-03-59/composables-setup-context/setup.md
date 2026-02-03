# Setup

- **Model**: claude-opus-4-5-20251101
- **Rule file**: composables-setup-context.md
- **Allowed tools**: Bash(*), Read, Write, Edit

## Prompt

```
Create a Vue 3 component that uses a composable for tracking
mouse position and another composable for managing a list of items.
Show both in the template.

```

## Full rule content

````markdown
# Call composables in setup context

Composables must be called synchronously inside `<script setup>` or the `setup()` function. Never call them inside callbacks, promises, utility functions, or after an `await` statement.

Vue's reactivity system and lifecycle hooks depend on the active component instance. When a composable is called outside the setup context, Vue cannot associate it with the component, breaking reactivity tracking and lifecycle hook registration.

Example of correct usage:

```vue
<script setup>
// Correct - synchronous call in setup
const { x, y } = useMouse()

// Incorrect - inside async callback
onMounted(async () => {
  await fetchData()
  const { x, y } = useMouse() // Won't work properly
})
</script>
```

## Rule for AI agents

```
- ALWAYS call composables in `<script setup>` or `setup()` only — never in callbacks, utils, or async contexts
```

## Eslint rule

No ESLint rule available

## Source

- https://vuejs.org/guide/reusability/composables.html#usage-restrictions

````

## Extracted rule content

````markdown
- ALWAYS call composables in `<script setup>` or `setup()` only — never in callbacks, utils, or async contexts
````
