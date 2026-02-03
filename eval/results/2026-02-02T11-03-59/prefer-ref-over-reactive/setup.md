# Setup

- **Model**: claude-opus-4-5-20251101
- **Rule file**: prefer-ref-over-reactive.md
- **Allowed tools**: Bash(*), Read, Write, Edit

## Prompt

```
Create a Vue 3 component called TodoList.
It manages a list of todo items (text, completed status), with
add, toggle, and delete functionality. Track the new todo input
text and a filter state (all/active/completed).

```

## Full rule content

````markdown
# Prefer ref over reactive

Prefer using `ref()` over `reactive()` for reactive state in Vue. While both are valid, `ref()` offers better TypeScript support, works with all value types (primitives and objects), and has clearer reactivity tracking. The `reactive()` API is limited to objects and arrays, loses reactivity when destructured, and can lead to subtle bugs when reassigning the entire object. Using `ref()` consistently creates a more predictable and maintainable codebase.

## Rule for AI agents

```
- PREFER `ref()` over `reactive()` for state
```

## Eslint rule

No ESLint rule available

## Source

- https://vuejs.org/guide/essentials/reactivity-fundamentals.html#limitations-of-reactive

````

## Extracted rule content

````markdown
- PREFER `ref()` over `reactive()` for state
````
