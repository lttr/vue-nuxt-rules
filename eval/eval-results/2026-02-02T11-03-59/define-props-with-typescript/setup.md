# Setup

- **Model**: claude-opus-4-5-20251101
- **Rule file**: define-props-with-typescript.md
- **Allowed tools**: Bash(*), Read, Write, Edit

## Prompt

```
Create a Vue 3 component called DataTable.
It receives: an array of column definitions (key, label, sortable flag),
an array of row data objects, and an optional title string.
Render a table with sortable column headers.

```

## Full rule content

````markdown
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

````

## Extracted rule content

````markdown
- ALWAYS use TypeScript type-based syntax for defineProps() instead of runtime PropType declarations
````
