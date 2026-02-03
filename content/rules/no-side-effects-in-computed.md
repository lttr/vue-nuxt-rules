# No Side Effects in Computed

Computed properties must be pure functions. They should only derive values from reactive sources without causing side effects. Side effects include mutating external state, making API calls, DOM manipulation, or triggering watchers. Impure computed properties break Vue's caching mechanism, create unpredictable behavior, and make code difficult to test and debug.

## Rule for AI agents

```
- ALWAYS keep computed properties pure (no mutations, no async, no logging)
```

## Eslint rule

- https://eslint.vuejs.org/rules/no-side-effects-in-computed-properties.html

## Source

- https://vuejs.org/guide/essentials/computed.html#getters-should-be-side-effect-free
