# Destructure props

Vue's reactive props destructure feature allows you to destructure props directly from `defineProps()` while maintaining reactivity. This enables cleaner syntax, easier default value declaration, and local aliasing without the need for `toRefs()` or accessing properties via `props.x`.

The compiler automatically transforms destructured props to maintain reactivity, so you can use them in computed properties, watchers, and other reactive contexts. This is particularly useful for setting default values inline and creating local aliases for props.

Example:

```typescript
const {
  msg, // required prop
  count = 1, // prop with default value
  foo: bar, // local aliasing
} = defineProps<Props>()
```

However, if no props are actually used in the `<script setup>` block (e.g., props are only used in the template), do not destructure anything. Simply call `defineProps()` without assignment to maintain type checking for the template.

Note: Avoid combining `withDefaults` with destructuring as they serve overlapping purposes.

## Rule for AI agents

```
- ALWAYS destructure props directly from defineProps() to maintain reactivity and enable inline defaults; if no props are used in the script, call defineProps() without destructuring
```

## Eslint rule

- https://eslint.vuejs.org/rules/define-props-destructuring.html

## Source

- https://vuejs.org/guide/extras/reactivity-transform.html#reactive-props-destructure
