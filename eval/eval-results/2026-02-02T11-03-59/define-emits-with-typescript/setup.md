# Setup

- **Model**: claude-opus-4-5-20251101
- **Rule file**: define-emits-with-typescript.md
- **Allowed tools**: Bash(*), Read, Write, Edit

## Prompt

```
Create a Vue 3 component called ConfirmDialog.
It shows a modal with title, message, and confirm/cancel buttons.
The parent needs to know when the user confirms or cancels.

```

## Full rule content

````markdown
# Define emits with TypeScript

Use the type-based declaration syntax instead of runtime declaration. This provides better type safety and IDE support for emitted events. The type-based syntax allows TypeScript to infer correct types for the emit function and validate event payloads at compile time.

Type-based syntax: `const emit = defineEmits<{ eventName: [payload: Type] }>()`
Runtime syntax: `const emit = defineEmits(['eventName'])` (avoid in TypeScript)

## Rule for AI agents

```
- ALWAYS use type-based syntax for defineEmits in TypeScript instead of runtime array syntax
```

## Eslint rule

- https://eslint.vuejs.org/rules/define-emits-declaration.html

## Source

- https://vuejs.org/api/sfc-script-setup.html#type-only-props-emit-declarations

````

## Extracted rule content

````markdown
- ALWAYS use type-based syntax for defineEmits in TypeScript instead of runtime array syntax
````
