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
