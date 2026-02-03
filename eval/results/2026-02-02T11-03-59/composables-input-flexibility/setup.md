# Setup

- **Model**: claude-opus-4-5-20251101
- **Rule file**: composables-input-flexibility.md
- **Allowed tools**: Bash(*), Read, Write, Edit

## Prompt

```
Create a Vue 3 composable called useTitle that sets the document
title. It should accept the title from the caller, which might
pass a static string, a reactive value, or a function. Update
the document title when the input changes.

```

## Full rule content

````markdown
# Accept flexible input types in composables

Use `toValue()` to normalize input arguments, allowing composables to accept refs, getters, or plain values. This makes composables more flexible for callers who may have static or reactive data.

Example:

```typescript
import { toValue, type MaybeRefOrGetter } from "vue"

// Good - accepts multiple input types
function useFetch(url: MaybeRefOrGetter<string>) {
  watchEffect(() => {
    // toValue() unwraps refs, calls getters, or returns plain values as-is
    fetch(toValue(url))
  })
}

// All these work:
useFetch("/api/users") // plain string
useFetch(urlRef) // ref
useFetch(() => `/api/users/${id.value}`) // getter
```

The `MaybeRefOrGetter<T>` type represents values that can be `T`, `Ref<T>`, or `() => T`. Combined with `toValue()`, this pattern maximizes composable reusability.

## Rule for AI agents

```
- PREFER `toValue()` to accept refs, getters, or plain values as input
```

## Eslint rule

No ESLint rule available

## Source

- https://vuejs.org/guide/reusability/composables.html#input-arguments

````

## Extracted rule content

````markdown
- PREFER `toValue()` to accept refs, getters, or plain values as input
````
