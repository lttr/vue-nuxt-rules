# AI Agent Rules

```
# Conventions

## Vue components

- ALWAYS use TypeScript type-based syntax for defineProps() instead of runtime PropType declarations
- ALWAYS use `<script setup lang="ts">` for component's script section
- ALWAYS use key in v-for loops
- ALWAYS use multi-word component names except for Nuxt pages and layouts
- ALWAYS use type-based syntax for defineEmits in TypeScript instead of runtime array syntax
- PREFER to group by logical concerns rather than grouping by type (data, methods, computed) within components
- PREFER `ref()` for reactive state instead of `reactive()`
- USE `defineModel()` for v-model implementations instead of manually defining props and emits (Vue 3.4+)
```
