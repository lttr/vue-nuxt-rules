# Setup

- **Model**: claude-sonnet-4-6
- **Rule file**: composables-cleanup.md
- **Rule mode**: with-rule
- **Allowed tools**: Read, Write, Edit

## Prompt

```
Create a Vue 3 composable that tracks the current window scroll
position (x and y). It should work correctly when the component
using it is destroyed.
Write files to disk.
```

## Rule content

````markdown
- ALWAYS clean up side effects via `onUnmounted()`; use `onMounted()` for DOM access
````
