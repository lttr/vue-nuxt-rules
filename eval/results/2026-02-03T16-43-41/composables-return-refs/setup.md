# Setup

- **Model**: claude-opus-4-5-20251101
- **Rule file**: composables-return-refs.md
- **Rule mode**: with-rule
- **Allowed tools**: Read, Write, Edit

## Prompt

```
Create a Vue 3 composable that tracks mouse cursor position
on the page. Return the coordinates.

```

## Rule content

````markdown
- ALWAYS return a plain object of refs — never wrap return in `reactive()`
````
