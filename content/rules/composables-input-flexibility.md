# Accept flexible input types in composables

Use `toValue()` to normalize input arguments, allowing composables to accept refs, getters, or plain values. This makes composables more flexible for callers who may have static or reactive data.

Example:

```typescript
import { toValue, type MaybeRefOrGetter } from 'vue'

// Good - accepts multiple input types
function useFetch(url: MaybeRefOrGetter<string>) {
  watchEffect(() => {
    // toValue() unwraps refs, calls getters, or returns plain values as-is
    fetch(toValue(url))
  })
}

// All these work:
useFetch('/api/users')                    // plain string
useFetch(urlRef)                          // ref
useFetch(() => `/api/users/${id.value}`)  // getter
```

The `MaybeRefOrGetter<T>` type represents values that can be `T`, `Ref<T>`, or `() => T`. Combined with `toValue()`, this pattern maximizes composable reusability.

## Rule for AI agents

```
PREFER toValue() to normalize inputs - accept refs, getters, and plain values
```

## Eslint rule

No ESLint rule available

## Source

- https://vuejs.org/guide/reusability/composables.html#input-arguments
