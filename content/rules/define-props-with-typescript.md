# Define props with TypeScript

Prefer the type-based declaration syntax for `defineProps()` using a TypeScript interface or type literal, rather than the runtime declaration with PropType. This provides better type inference, autocomplete support, and compile-time type checking without runtime overhead.

## Rule for AI agents

```
- ALWAYS use TypeScript type-based syntax for defineProps() instead of runtime PropType declarations
```

## Eslint rule

- https://eslint.vuejs.org/rules/define-props-declaration.html

## Source

- https://vuejs.org/api/sfc-script-setup.html#type-only-props-emit-declarations
