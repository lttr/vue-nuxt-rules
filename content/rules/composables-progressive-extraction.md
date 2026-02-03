# Extract composables progressively

Don't create a shared composable until you actually need to reuse it. Follow the extraction ladder:

1. **Inline** — logic lives directly in the component's `<script setup>`
2. **Colocated file** — extract to a `useFeature.ts` next to the component
3. **Shared `composables/`** — promote to the shared directory only when a second consumer appears

Starting inline keeps things simple. Premature extraction adds indirection without benefit.

Example:

```typescript
// Step 1: Inline in component
// <script setup>
const count = ref(0)
const increment = () => count.value++
// </script>

// Step 2: Colocated (same folder as component)
// components/Counter/useCounter.ts
export function useCounter() {
  const count = ref(0)
  const increment = () => count.value++
  return { count, increment }
}

// Step 3: Shared (only when reused elsewhere)
// composables/useCounter.ts
```

## Rule for AI agents

```
PREFER inline composables; extract to shared `composables/` only when a second consumer exists. Ladder: inline → colocated → shared.
```

## Eslint rule

No ESLint rule available

## Source

- https://michaelnthiessen.com/inline-composables
- https://alexop.dev/posts/inline-vue-composables-refactoring/
