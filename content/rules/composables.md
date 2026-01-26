# Composables Best Practices

Composables are the recommended way to share stateful logic between Vue components. They leverage the Composition API to encapsulate reactive state, computed properties, watchers, and lifecycle hooks into reusable functions.

## Individual Rules

- [Call composables in setup context](/rules/composables-setup-context)
- [Use "use" prefix naming convention](/rules/composables-naming)
- [Return plain objects with refs](/rules/composables-return-refs)
- [Clean up side effects](/rules/composables-cleanup)
- [Composables vs utilities](/rules/composables-vs-utils)
- [Organize by logical concern](/rules/composables-organize-by-concern)
- [Accept flexible input types](/rules/composables-input-flexibility)
- [Single responsibility principle](/rules/composables-single-responsibility)
- [Async patterns](/rules/composables-async-patterns)

## Source

- https://vuejs.org/guide/reusability/composables.html
