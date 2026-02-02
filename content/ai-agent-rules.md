# AI Agent Rules

```
# Vue/Nuxt Code Conventions

## Vue Components

- ALWAYS use `<script setup lang="ts">`
- ALWAYS place `<template>` first in SFC files, before `<script>` and `<style>`
- ALWAYS use TypeScript type-based syntax for `defineProps()` — no runtime PropType declarations
- ALWAYS destructure props from `defineProps()` for reactivity and inline defaults; omit destructuring if props unused in script
- ALWAYS use TypeScript type-based syntax for `defineEmits()` — no runtime array syntax
- ALWAYS use `:key` on `v-for` elements
- ALWAYS use `v-for="item of items"` (not `in`) to match JS `for...of`
- ALWAYS use multi-word component names; exception: Nuxt `pages/` and `layouts/`
- ALWAYS use same-name shorthand `:propName` instead of `:propName="propName"`
- PREFER grouping `<script setup>` code by logical concern, not by API type (refs, computed, watch)
- PREFER `ref()` over `reactive()` for state
- PREFER VueUse composables over custom implementations for common browser/DOM/state tasks
- USE `defineModel()` for two-way binding instead of manual prop+emit pairs

## Composables

- ALWAYS call composables in `<script setup>` or `setup()` only — never in callbacks, utils, or async contexts
- ALWAYS prefix names with `use` (e.g. `useMouse`). One composable per file, named `useFeatureName.ts`
- ALWAYS return a plain object of refs — never wrap return in `reactive()`
- ALWAYS clean up side effects via `onUnmounted()`; use `onMounted()` for DOM access
- ALWAYS expose `loading`/`error` refs from async composables; use `watchEffect` for reactive data fetching
- PREFER `toValue()` to accept refs, getters, or plain values as input
- PREFER splitting large composables by concern (e.g. `useCart` → `useAddToCart` + `useFetchCart`)
- PREFER organizing code within composables as: state → metadata → methods → return
- Keep composables as thin reactive wrappers; extract pure business logic to plain functions for testability
- Only create composables when you need reactivity or lifecycle hooks — otherwise use plain utility functions
- Composables manage state/logic, not UI side effects — expose state, let components handle presentation
- Don't extract to shared `composables/` until a second consumer exists (inline → colocated → shared)

## Styling

- ALWAYS use `<style scoped>`
```
