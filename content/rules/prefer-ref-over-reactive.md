# Prefer ref over reactive

Prefer using `ref()` over `reactive()` for reactive state in Vue. While both are valid, `ref()` offers better TypeScript support, works with all value types (primitives and objects), and has clearer reactivity tracking. The `reactive()` API is limited to objects and arrays, loses reactivity when destructured, and can lead to subtle bugs when reassigning the entire object. Using `ref()` consistently creates a more predictable and maintainable codebase.

## Rule for AI agents

```
PREFER use `ref()` for reactive state instead of `reactive()` in Vue projects
```

## Eslint rule

No ESLint rule available

## Source

- https://vuejs.org/guide/essentials/reactivity-fundamentals.html#limitations-of-reactive
