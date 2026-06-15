# Setup

- **Model**: claude-opus-4-8
- **Rule file**: composables-single-responsibility.md
- **Rule mode**: with-rule
- **Allowed tools**: Read, Write, Edit

## Prompt

```
Create Vue 3 composables for a shopping cart feature. The feature
needs: managing cart items (add/remove), fetching cart data from
an API, calculating totals and discounts, and processing checkout.
Write files to disk.
```

## Rule content

````markdown
- PREFER splitting large composables by concern (e.g. `useCart` → `useAddToCart` + `useFetchCart`)
````
