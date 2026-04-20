# Recommended Rules

## composables

### composables-async-patterns

- ALWAYS expose `loading`/`error` refs from async composables; use `watchEffect` for reactive data fetching

### composables-cleanup

- ALWAYS clean up side effects via `onUnmounted()`; use `onMounted()` for DOM access

### composables-naming

- ALWAYS prefix names with `use` (e.g. `useMouse`). One composable per file, named `useFeatureName.ts`

### composables-organize-by-concern

- PREFER grouping composable code by concern/feature, not by Vue API type (refs, computed, watchers)

### composables-return-refs

- ALWAYS return a plain object of refs — never wrap return in `reactive()`

### composables-single-responsibility

- PREFER splitting large composables by concern (e.g. `useCart` → `useAddToCart` + `useFetchCart`)

### composables-thin-composables

- PREFER extracting calculations to pure helper functions; composable only handles reactivity

### prefer-vueuse

- PREFER VueUse composables over custom implementations for common browser/DOM/state tasks

## misc

### composables-cleanup-refactor

- ALWAYS clean up side effects via `onUnmounted()`; use `onMounted()` for DOM access

### prefer-vueuse-refactor

- PREFER VueUse composables over custom implementations for common browser/DOM/state tasks

## props

### define-emits-with-typescript

- ALWAYS use type-based syntax for defineEmits in TypeScript instead of runtime array syntax

### define-props-with-typescript

- ALWAYS use TypeScript type-based syntax for defineProps() instead of runtime PropType declarations

### destructure-props

- ALWAYS destructure props directly from defineProps() to maintain reactivity and enable inline defaults; if no props are used in the script, call defineProps() without destructuring

### prefer-definemodel

- USE `defineModel()` for two-way binding instead of manual prop+emit pairs

### prefer-ref-over-reactive

- PREFER `ref()` over `reactive()` for state

## sfc-structure

### group-script-by-logical-concerns

- PREFER to group by logical concerns rather than grouping by type (data, methods, computed) within components

### multi-word-component-names

- ALWAYS use multi-word component names except for Nuxt pages and layouts

## template-directives

### keyed-v-for

- ALWAYS use key in v-for loops

## props-state

### no-side-effects-in-computed

- ALWAYS keep computed properties pure (no mutations, no async, no logging)
