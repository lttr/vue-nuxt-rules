# Recommended Rules

## composables

### composables-input-flexibility

- PREFER `toValue()` to accept refs, getters, or plain values as input in shared composables

### composables-organize-by-concern

- PREFER grouping composable code by concern/feature, not by Vue API type (refs, computed, watchers)

### composables-thin-composables

- PREFER extracting calculations to pure helper functions; composable only handles reactivity

### composables-vs-utils

PREFER plain utility functions over composables unless you need reactivity or lifecycle hooks. Expose state, let components handle presentation.

### prefer-vueuse

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

### same-name-prop-shorthand

- ALWAYS use same-name shorthand `:propName` instead of `:propName="propName"`

## sfc-structure

### group-script-by-logical-concerns

- PREFER to group by logical concerns rather than grouping by type (data, methods, computed) within components

### script-setup-with-typescript

- ALWAYS use `<script setup lang="ts">` for component's script section

### template-on-the-top

- ALWAYS place the <template> section at the top of Vue SFC files, before <script> and <style> sections

## props-state

### no-mutating-props

- NEVER mutate props directly or nested properties; emit changes to parent instead

## misc

### prefer-ref-over-reactive-refactor

- PREFER `ref()` over `reactive()` for state

### prefer-vueuse-refactor

- PREFER VueUse composables over custom implementations for common browser/DOM/state tasks

## template-directives

### use-of-instead-of-in-for-v-for

- ALWAYS use v-for="item of items" instead of v-for="item in items" to match JavaScript for...of syntax
