# Setup

- **Model**: claude-opus-4-5-20251101
- **Rule file**: composables-thin-composables.md
- **Allowed tools**: Bash(*), Read, Write, Edit

## Prompt

```
Create a Vue 3 composable that calculates shipping cost based on
weight (kg) and destination zone (domestic/international). The
calculation has business rules: domestic is $5 + $1/kg, international
is $15 + $3/kg, free over $100 order total. Accept inputs and
return the cost.

```

## Full rule content

````markdown
# Keep composables thin — functional core, imperative shell

Separate pure business logic from the reactivity wrapper. The composable acts as a thin "imperative shell" that wires reactive state to pure functions (the "functional core").

This makes business logic testable without Vue context and keeps composables focused on reactivity plumbing.

Example:

```typescript
// Functional core — pure, testable without Vue
function calculateDiscount(price: number, tier: string): number {
  if (tier === "gold") return price * 0.8
  if (tier === "silver") return price * 0.9
  return price
}

// Imperative shell — thin composable
export function useDiscount(price: Ref<number>, tier: Ref<string>) {
  const discounted = computed(() => calculateDiscount(price.value, tier.value))
  return { discounted }
}
```

```typescript
// Bad — business logic buried in reactivity
export function useDiscount(price: Ref<number>, tier: Ref<string>) {
  const discounted = computed(() => {
    if (tier.value === "gold") return price.value * 0.8
    if (tier.value === "silver") return price.value * 0.9
    return price.value
  })
  return { discounted }
}
```

## Rule for AI agents

```
- Keep composables as thin reactive wrappers; extract pure business logic to plain functions for testability
```

## Eslint rule

No ESLint rule available

## Source

- https://michaelnthiessen.com/composable-patterns-in-vue
- https://alexop.dev/posts/mastering-vue-3-composables-a-comprehensive-style-guide/

````

## Extracted rule content

````markdown
- Keep composables as thin reactive wrappers; extract pure business logic to plain functions for testability
````
