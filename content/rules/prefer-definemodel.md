# Prefer defineModel

Use `defineModel()` macro for two-way binding instead of manually defining props and emits for v-model. The `defineModel()` macro, introduced in Vue 3.4+, simplifies component v-model implementation by automatically handling the prop declaration, update event, and computed getter/setter.

This approach reduces boilerplate code and makes v-model implementations more maintainable. It's particularly useful for form components and any component that needs two-way data binding with its parent.

Note: `defineModel()` requires Vue 3.4 or later. For projects using earlier versions, continue using the manual props + emits pattern.

## Rule for AI agents

```
- USE `defineModel()` for v-model implementations instead of manually defining props and emits (Vue 3.4+)
```

## Eslint rule

- No ESLint rule available

## Source

- https://vuejs.org/api/sfc-script-setup.html#definemodel
- https://vuejs.org/guide/components/v-model.html#component-v-model
