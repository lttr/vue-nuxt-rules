# Setup

- **Model**: claude-opus-4-5-20251101
- **Rule file**: no-side-effects-in-computed.md
- **Rule mode**: with-rule
- **Allowed tools**: Read, Write, Edit

## Prompt

```
Create a Vue 3 component that displays a shopping cart.
It has a list of items with price and quantity.
Create a computed property that tracks the total price and logs when it changes.

```

## Rule content

````markdown
- ALWAYS keep computed properties pure (no mutations, no async, no logging)
````
