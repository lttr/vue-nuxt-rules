# No Mutating Props

Props must never be mutated directly. They are readonly data flowing from parent to child. Mutating props breaks Vue's one-way data flow, creates implicit parent-child coupling that's hard to debug, and leads to unpredictable component behavior. Use `emit` to request changes from the parent, or use `defineModel()` for two-way binding patterns.

## Rule for AI agents

```
- NEVER mutate props directly or nested properties; emit changes to parent instead
```

## Eslint rule

- https://eslint.vuejs.org/rules/no-mutating-props.html (vue/essential)

## Source

- https://vuejs.org/guide/components/props.html#one-way-data-flow
