# Setup

- **Model**: claude-opus-4-6
- **Rule file**: group-script-by-logical-concerns.md
- **Rule mode**: with-rule
- **Allowed tools**: Read, Write, Edit

## Prompt

```
Create a Vue 3 component called ProductPage.
It has: a product title/description section, an image gallery
with thumbnail selection, an add-to-cart button with quantity
selector, and a reviews section that loads reviews from a URL.
The component should have at least 6 state variables and 3
derived values.
Write files to disk.
```

## Rule content

````markdown
- PREFER to group by logical concerns rather than grouping by type (data, methods, computed) within components
````
