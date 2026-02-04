# Setup

- **Model**: claude-opus-4-5-20251101
- **Rule file**: define-emits-with-typescript.md
- **Rule mode**: with-rule
- **Allowed tools**: Read, Write, Edit

## Prompt

```
Create a Vue 3 component called ConfirmDialog.
It shows a modal with title, message, and confirm/cancel buttons.
The parent needs to know when the user confirms or cancels.

```

## Rule content

````markdown
- ALWAYS use type-based syntax for defineEmits in TypeScript instead of runtime array syntax
````
