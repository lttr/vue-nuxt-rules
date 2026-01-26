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
ALWAYS call composables in <script setup> or setup(), never in utils/callbacks/promises
```

## Eslint rule

No ESLint rule available

## Source

- https://vuejs.org/guide/reusability/composables.html#usage-restrictions
