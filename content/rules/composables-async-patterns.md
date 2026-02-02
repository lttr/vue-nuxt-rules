# Async patterns in composables

For data fetching composables, use `watchEffect()` to automatically track reactive dependencies and refetch when they change. Always expose loading and error state refs to enable proper UI feedback.

Example:

```typescript
function useFetch<T>(url: MaybeRefOrGetter<string>) {
  const data = ref<T | null>(null)
  const error = ref<Error | null>(null)
  const isLoading = ref(false)

  watchEffect(async () => {
    // Reset state
    data.value = null
    error.value = null
    isLoading.value = true

    try {
      const response = await fetch(toValue(url))
      data.value = await response.json()
    } catch (e) {
      error.value = e as Error
    } finally {
      isLoading.value = false
    }
  })

  return { data, error, isLoading }
}

// Usage - auto-refetches when userId changes
const {
  data: user,
  error,
  isLoading,
} = useFetch(() => `/api/users/${userId.value}`)
```

The `watchEffect()` automatically tracks `url` as a dependency and re-runs whenever it changes.

## Rule for AI agents

```
- ALWAYS expose `loading`/`error` refs from async composables; use `watchEffect` for reactive data fetching
```

## Eslint rule

No ESLint rule available

## Source

- https://vuejs.org/guide/reusability/composables.html#async-state-example
