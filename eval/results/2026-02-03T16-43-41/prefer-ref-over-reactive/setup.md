# Setup

- **Model**: claude-opus-4-5-20251101
- **Rule file**: prefer-ref-over-reactive.md
- **Rule mode**: with-rule
- **Allowed tools**: Read, Write, Edit

## Prompt

```
Create a Vue 3 component called TodoList.
It manages a list of todo items (text, completed status), with
add, toggle, and delete functionality. Track the new todo input
text and a filter state (all/active/completed).

```

## Rule content

````markdown
- PREFER `ref()` over `reactive()` for state
````
