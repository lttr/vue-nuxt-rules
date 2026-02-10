# Setup

- **Model**: claude-opus-4-6
- **Rule file**: no-side-effects-in-computed.md
- **Rule mode**: with-rule
- **Allowed tools**: Read, Write, Edit

## Prompt

```
Create a Vue 3 component with a list of products (name, price, inStock boolean).
Add a computed that filters to in-stock items and also updates a "lastFilteredCount" ref with the count.
Write files to disk.
```

## Rule content

````markdown
- ALWAYS keep computed properties pure (no mutations, no async, no logging)
````
