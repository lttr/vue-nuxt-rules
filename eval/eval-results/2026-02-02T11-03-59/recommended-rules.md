# Recommended Rules

## composables

### composables-thin-composables.md

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


### composables-vs-utils.md

- Only create composables when you need reactivity or lifecycle hooks — otherwise use plain utility functions
- Composables manage state/logic, not UI side effects — expose state, let components handle presentation

### prefer-vueuse.md

- PREFER VueUse composables over custom implementations for common browser/DOM/state tasks

## props

### define-emits-with-typescript.md

- ALWAYS use type-based syntax for defineEmits in TypeScript instead of runtime array syntax

### define-props-with-typescript.md

- ALWAYS use TypeScript type-based syntax for defineProps() instead of runtime PropType declarations

### destructure-props.md

- ALWAYS destructure props directly from defineProps() to maintain reactivity and enable inline defaults; if no props are used in the script, call defineProps() without destructuring

### prefer-definemodel.md

- USE `defineModel()` for two-way binding instead of manual prop+emit pairs

### same-name-prop-shorthand.md

- ALWAYS use same-name shorthand `:propName` instead of `:propName="propName"`

## sfc-structure

### group-script-by-logical-concerns.md

- PREFER to group by logical concerns rather than grouping by type (data, methods, computed) within components

### multi-word-component-names.md

- ALWAYS use multi-word component names except for Nuxt pages and layouts

## template-directives

### use-of-instead-of-in-for-v-for.md

- ALWAYS use v-for="item of items" instead of v-for="item in items" to match JavaScript for...of syntax
