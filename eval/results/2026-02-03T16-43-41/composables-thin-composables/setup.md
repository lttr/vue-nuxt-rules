# Setup

- **Model**: claude-opus-4-5-20251101
- **Rule file**: composables-thin-composables.md
- **Rule mode**: with-rule
- **Allowed tools**: Read, Write, Edit

## Prompt

```
Create a Vue 3 composable that calculates shipping cost based on
weight (kg) and destination zone (domestic/international). The
calculation has business rules: domestic is $5 + $1/kg, international
is $15 + $3/kg, free over $100 order total. Accept inputs and
return the cost.

```

## Rule content

````markdown
- PREFER extracting calculations to pure helper functions; composable only handles reactivity
````
