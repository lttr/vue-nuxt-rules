# Setup

- **Model**: claude-opus-4-5-20251101
- **Rule file**: define-props-with-typescript.md
- **Rule mode**: with-rule
- **Allowed tools**: Read, Write, Edit

## Prompt

```
Create a Vue 3 component called DataTable.
It receives: an array of column definitions (key, label, sortable flag),
an array of row data objects, and an optional title string.
Render a table with sortable column headers.

```

## Rule content

````markdown
- ALWAYS use TypeScript type-based syntax for defineProps() instead of runtime PropType declarations
````
