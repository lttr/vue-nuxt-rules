# Composables Best Practices

Composables are the recommended way to share stateful logic between Vue components. They leverage the Composition API to encapsulate reactive state, computed properties, watchers, and lifecycle hooks into reusable functions.

## Individual Rules

- [Call composables in setup context](/rules/composables-setup-context)
- [Use "use" prefix naming convention](/rules/composables-naming)
- [Return plain objects with refs](/rules/composables-return-refs)
- [Clean up side effects](/rules/composables-cleanup)
- [Composables vs utilities](/rules/composables-vs-utils)
- [Organize by logical concern](/rules/composables-organize-by-concern)
- [Accept flexible input types](/rules/composables-input-flexibility)
- [Single responsibility principle](/rules/composables-single-responsibility)
- [Async patterns](/rules/composables-async-patterns)
- [Thin composables — functional core](/rules/composables-thin-composables)
- [Progressive extraction](/rules/composables-progressive-extraction)

## Patterns & Techniques

These are useful patterns that are not formal rules but worth knowing:

### Options object pattern

When a composable accepts multiple optional parameters, use a single options object instead of positional arguments. This is a generic JavaScript pattern that applies especially well to composables.

```typescript
interface UseIntervalOptions {
  immediate?: boolean
  interval?: number
}

export function useInterval(
  callback: () => void,
  options: UseIntervalOptions = {},
) {
  const { immediate = false, interval = 1000 } = options
  // ...
}
```

### Async + sync dual support

Some composables can support both synchronous initial data and asynchronous fetching, making them flexible for SSR or cached scenarios.

```typescript
export function useUser(initialData?: User) {
  const user = ref<User | null>(initialData ?? null)
  const isLoading = ref(!initialData)

  if (!initialData) {
    fetchUser().then((data) => {
      user.value = data
      isLoading.value = false
    })
  }

  return { user, isLoading }
}
```

## Source

- https://vuejs.org/guide/reusability/composables.html
