# Setup

- **Model**: claude-sonnet-4-6
- **Rule file**: composables-cleanup.md
- **Rule mode**: with-rule
- **Allowed tools**: Read, Write, Edit

## Prompt

```
Improve usePolling.ts:
```ts
// usePolling.ts
export function usePolling(url: string, intervalMs = 5000) {
  const data = ref(null)
  const error = ref(null)

  const poll = async () => {
    try {
      const res = await fetch(url)
      data.value = await res.json()
    } catch (e) {
      error.value = e
    }
  }

  poll()
  setInterval(poll, intervalMs)

  return { data, error }
}
```
Write the improved version to usePolling.ts.
Write files to disk.
```

## Rule content

````markdown
- ALWAYS clean up side effects via `onUnmounted()`; use `onMounted()` for DOM access
````
