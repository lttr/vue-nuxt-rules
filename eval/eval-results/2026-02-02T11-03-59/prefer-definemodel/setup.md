# Setup

- **Model**: claude-opus-4-5-20251101
- **Rule file**: prefer-definemodel.md
- **Allowed tools**: Bash(*), Read, Write, Edit

## Prompt

```
Create a Vue 3 component called RatingInput.
It shows 5 star buttons. The parent component needs to read
and control the selected rating value (1-5).

```

## Full rule content

````markdown
# Prefer defineModel

Use `defineModel()` macro for two-way binding instead of manually defining props and emits for v-model. The `defineModel()` macro, introduced in Vue 3.4+, simplifies component v-model implementation by automatically handling the prop declaration, update event, and computed getter/setter.

This approach reduces boilerplate code and makes v-model implementations more maintainable. It's particularly useful for form components and any component that needs two-way data binding with its parent.

Note: `defineModel()` requires Vue 3.4 or later. For projects using earlier versions, continue using the manual props + emits pattern.

## Rule for AI agents

```
- USE `defineModel()` for two-way binding instead of manual prop+emit pairs
```

## Eslint rule

- No ESLint rule available

## Source

- https://vuejs.org/api/sfc-script-setup.html#definemodel
- https://vuejs.org/guide/components/v-model.html#component-v-model

````

## Extracted rule content

````markdown
- USE `defineModel()` for two-way binding instead of manual prop+emit pairs
````
