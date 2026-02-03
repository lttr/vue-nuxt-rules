# Rules

## Philosophy

These rules exist as a reference for humans. The goal is consistent, readable, and maintainable code through shared conventions.

AI agents can use these rules as context for code generation, refactoring, or code review. Some rules overlap with what linting and code formatting tools handle automatically. The goal is reducing post-generation fixes, especially those requiring manual intervention.

## Vue SFC Structure

- [Overview](/rules/sfc-structure)
- [Template on the top](/rules/template-on-the-top)
- [Script setup with TypeScript](/rules/script-setup-with-typescript)
- [Group script by logical concerns](/rules/group-script-by-logical-concerns)
- [Multi-word component names](/rules/multi-word-component-names)

## Props & State

- [Overview](/rules/props-state)
- [Define props with TypeScript](/rules/define-props-with-typescript)
- [Define emits with TypeScript](/rules/define-emits-with-typescript)
- [Destructure props](/rules/destructure-props)
- [Same name prop shorthand](/rules/same-name-prop-shorthand)
- [Prefer defineModel](/rules/prefer-definemodel)
- [Prefer ref over reactive](/rules/prefer-ref-over-reactive)
- [Prefer VueUse](/rules/prefer-vueuse)
- [No Side Effects in Computed](/rules/no-side-effects-in-computed)
- [No Mutating Props](/rules/no-mutating-props)

## Template Directives

- [Overview](/rules/template-directives)
- [Keyed v-for](/rules/keyed-v-for)
- [Use of instead of in for v-for](/rules/use-of-instead-of-in-for-v-for)

## Styles

- [Overview](/rules/styles)
- [Scoped styles](/rules/scoped-styles)

## Composables

- [Overview](/rules/composables)
- [Call composables in setup context](/rules/composables-setup-context)
- [Use "use" prefix naming](/rules/composables-naming)
- [Return plain objects with refs](/rules/composables-return-refs)
- [Clean up side effects](/rules/composables-cleanup)
- [Composables vs utilities](/rules/composables-vs-utils)
- [Organize by logical concern](/rules/composables-organize-by-concern)
- [Accept flexible input types](/rules/composables-input-flexibility)
- [Single responsibility](/rules/composables-single-responsibility)
- [Async patterns](/rules/composables-async-patterns)
- [Thin composables](/rules/composables-thin-composables)
- [Progressive extraction](/rules/composables-progressive-extraction)
