# Rules

## Vue rules

### Make sure

- follow https://vuejs.org/style-guide
- prefer `ref` over `reactive`
- prefer `defineModel` over prop + emit
- prefer Typescript declaration of `defineProps`
- prefer short version of Typescript declaration of `defineEmits`
- prefer `script setup lang="ts"` for all components
- group code in `script setup` by functionality
- prefer `VueUse` composables and utilities before writing your own
- use PascalCase for component file names and for component usage in `template`
- don't use both `default` and `required` flags on a prop at the same time
- use `true` attribute shorthand
- use same name prop shorthand
- use `of` in v-for instead of `in`
- use kebab-case for properties in template
- let attributes be automatically sorted and split over multiple lines as needed
- use shorthands for `v-bind`, `v-on` and `v-slot`

### Consider

- using watchEffect over watch
- using experimental props destructuring in order to avoid extra boilerplate with `withDefaults`
- template on the top of SFC
- no-semicolon rule performed by `prettier`

## Nuxt rules

- Use Nuxt if you don't know why specifically you would only need Vue

## Styles

### If you use CSS

- use `style scoped` in all components
- prefer class selectors over element selectors
- use empty line between rules
- use CSS nesting only if readability is improved
- use simple class names, avoid name scoping (it is done by Vue already)
- prefer relative units over pixels
- prefer layout utilities over repeating the same set of properties (display: flex, justify-content...)
- prefer CSS custom properties that represent your design tokens
- prefer fluid systems
- prefer intrinsic design
- prefer CSS solution over JavaScript one

## Generic rules

- Use TypeScript

### Source control

- Do use rebase and squash to keep commit history linear
- Don't use merge and merge commits if possible
- Feature branch opened for more than a few days is too much
- Ask for code review early (the same day you have opened a feature branch)
- Finish your own PRs and make sure it is tested
- Strive to achive [Continuous Integration](https://martinfowler.com/articles/continuousIntegration.html)

## Resources

- https://vuejs.org/style-guide/
- https://github.com/rrd108/vue-mess-detector
- https://martinfowler.com/articles/continuousIntegration.html
