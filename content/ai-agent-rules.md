# AI Agent Rules

These rules are designed for AI code generation agents. They complement, not replace, your formatting and linting pipeline.

## Philosophy

**AI generates conceptually correct code.** The goal is right patterns, right architecture, right conventions. Exact formatting is irrelevant, Prettier handles that.

**ESLint runs after generation.** Auto-fixable issues resolve automatically. But some violations require manual intervention, so we include those rules explicitly even when ESLint covers them.

**Not all rules are needed.** Some conventions are already baked into AI models. We run evals to identify which rules actually improve output vs. which are redundant.

## Evaluated Rules

Each rule is tested against AI models with before/after comparisons. Rules that don't measurably improve code generation are excluded. This prevents rule bloat and keeps the agent context focused on what matters.

---

```
# Vue/Nuxt Code Conventions

## Vue SFC Structure

- ALWAYS place the <template> section at the top of Vue SFC files, before <script> and <style> sections
- ALWAYS use `<script setup lang="ts">` for component's script section
- PREFER to group by logical concerns rather than grouping by type (data, methods, computed) within components

## Props & State

- ALWAYS use TypeScript type-based syntax for defineProps() instead of runtime PropType declarations
- ALWAYS use type-based syntax for defineEmits in TypeScript instead of runtime array syntax
- ALWAYS destructure props directly from defineProps() to maintain reactivity and enable inline defaults; if no props are used in the script, call defineProps() without destructuring
- ALWAYS use same-name shorthand `:propName` instead of `:propName="propName"`
- NEVER mutate props directly or nested properties; emit changes to parent instead
- ALWAYS keep computed properties pure (no mutations, no async, no logging)
- USE `defineModel()` for two-way binding instead of manual prop+emit pairs
- PREFER `ref()` over `reactive()` for state
- PREFER VueUse composables over custom implementations for common browser/DOM/state tasks

## Template Directives

- ALWAYS use v-for="item of items" instead of v-for="item in items" to match JavaScript for...of syntax

## Composables

- PREFER `toValue()` to accept refs, getters, or plain values as input in shared composables
- PREFER grouping composable code by concern/feature, not by Vue API type (refs, computed, watchers)
- PREFER extracting calculations to pure helper functions; composable only handles reactivity
- PREFER plain utility functions over composables unless you need reactivity or lifecycle hooks. Expose state, let components handle presentation.
```

## Reference Rules

These conventions are already followed by AI models without explicit instruction, but are included here for completeness.

```
## Vue SFC Structure

- ALWAYS use multi-word component names except for Nuxt pages and layouts

## Template Directives

- ALWAYS use key in v-for loops

## Styles

- ALWAYS use <style scoped> for component styles

## Composables

- ALWAYS call composables in `<script setup>` or `setup()` only — never in callbacks, utils, or async contexts
- ALWAYS prefix names with `use` (e.g. `useMouse`). One composable per file, named `useFeatureName.ts`
- ALWAYS return a plain object of refs — never wrap return in `reactive()`
- ALWAYS clean up side effects via `onUnmounted()`; use `onMounted()` for DOM access
- ALWAYS expose `loading`/`error` refs from async composables; use `watchEffect` for reactive data fetching
- PREFER splitting large composables by concern (e.g. `useCart` → `useAddToCart` + `useFetchCart`)
- PREFER inline composables; extract to shared `composables/` only when a second consumer exists. Ladder: inline → colocated → shared.
```
