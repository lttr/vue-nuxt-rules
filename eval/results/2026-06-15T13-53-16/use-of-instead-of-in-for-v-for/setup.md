# Setup

- **Model**: claude-opus-4-8
- **Rule file**: use-of-instead-of-in-for-v-for.md
- **Rule mode**: with-rule
- **Allowed tools**: Read, Write, Edit

## Prompt

```
Create a Vue 3 component called ProductGrid.
It receives an array of products (id, name, price, imageUrl) and
displays them in a grid. Each product shows its image, name, and
formatted price.
Write files to disk.
```

## Rule content

````markdown
- ALWAYS use v-for="item of items" instead of v-for="item in items" to match JavaScript for...of syntax
````
