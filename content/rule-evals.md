# Rule Evals

Evaluation of whether explicit rules improve AI code generation output.

## Methodology

- **Model**: Claude Opus 4.7 via Claude Code
- **Approach**: Compare baseline (no rule) vs extracted rule (concise "Rule for AI agents" version)
- **Metric**: Does providing the rule improve output compared to model's inherent knowledge?
- **Code**: [eval suite on GitHub](https://github.com/lttr/vue-nuxt-rules/tree/master/eval)
- **Model comparison**: [per-rule results across Opus 4.5, 4.6, 4.7](/rule-evals-model-comparison)

## Results

| Rule                                                                            |                                      ESLint                                      | --fix | Eval Improved |
| ------------------------------------------------------------------------------- | :------------------------------------------------------------------------------: | :---: | :-----------: |
| **Vue SFC Structure**                                                           |                                                                                  |       |               |
| [template-on-the-top](/rules/template-on-the-top)                               |              [✅](https://eslint.vuejs.org/rules/block-order.html)               |  ✅   |      ✅       |
| [script-setup-with-typescript](/rules/script-setup-with-typescript)             |               [✅](https://eslint.vuejs.org/rules/block-lang.html)               |   -   |      ✅       |
| [group-script-by-logical-concerns](/rules/group-script-by-logical-concerns)     |                                        -                                         |   -   |      ✅       |
| [multi-word-component-names](/rules/multi-word-component-names)                 |       [✅](https://eslint.vuejs.org/rules/multi-word-component-names.html)       |   -   |      💪       |
| **Props & State**                                                               |                                                                                  |       |               |
| [define-props-with-typescript](/rules/define-props-with-typescript)             |        [✅](https://eslint.vuejs.org/rules/define-props-declaration.html)        |   -   |      ✅       |
| [define-emits-with-typescript](/rules/define-emits-with-typescript)             |        [✅](https://eslint.vuejs.org/rules/define-emits-declaration.html)        |   -   |      ✅       |
| [destructure-props](/rules/destructure-props)                                   |       [✅](https://eslint.vuejs.org/rules/define-props-destructuring.html)       |   -   |      ✅       |
| [same-name-prop-shorthand](/rules/same-name-prop-shorthand)                     |              [✅](https://eslint.vuejs.org/rules/v-bind-style.html)              |  ✅   |      ✅       |
| [no-mutating-props](/rules/no-mutating-props)                                   |           [✅](https://eslint.vuejs.org/rules/no-mutating-props.html)            |   -   |      ✅       |
| [no-side-effects-in-computed](/rules/no-side-effects-in-computed)               | [✅](https://eslint.vuejs.org/rules/no-side-effects-in-computed-properties.html) |   -   |      ✅       |
| [prefer-definemodel](/rules/prefer-definemodel)                                 |                                        -                                         |   -   |      ✅       |
| [prefer-ref-over-reactive](/rules/prefer-ref-over-reactive)                     |                                        -                                         |   -   |      💪       |
| [prefer-vueuse](/rules/prefer-vueuse)                                           |                                        -                                         |   -   |      ✅       |
| **Template Directives**                                                         |                                                                                  |       |               |
| [keyed-v-for](/rules/keyed-v-for)                                               |           [✅](https://eslint.vuejs.org/rules/require-v-for-key.html)            |   -   |      💪       |
| [use-of-instead-of-in-for-v-for](/rules/use-of-instead-of-in-for-v-for)         |         [✅](https://eslint.vuejs.org/rules/v-for-delimiter-style.html)          |  ✅   |      ✅       |
| **Styles**                                                                      |                                                                                  |       |               |
| [scoped-styles](/rules/scoped-styles)                                           |        [✅](https://eslint.vuejs.org/rules/enforce-style-attribute.html)         |   -   |      💪       |
| **Composables**                                                                 |                                                                                  |       |               |
| [composables-setup-context](/rules/composables-setup-context)                   |                                        -                                         |   -   |      💪       |
| [composables-naming](/rules/composables-naming)                                 |                                        -                                         |   -   |      💪       |
| [composables-return-refs](/rules/composables-return-refs)                       |                                        -                                         |   -   |      💪       |
| [composables-cleanup](/rules/composables-cleanup)                               |                                        -                                         |   -   |      ✅       |
| [composables-vs-utils](/rules/composables-vs-utils)                             |                                        -                                         |   -   |      💪       |
| [composables-organize-by-concern](/rules/composables-organize-by-concern)       |                                        -                                         |   -   |      💪       |
| [composables-input-flexibility](/rules/composables-input-flexibility)           |                                        -                                         |   -   |      ✅       |
| [composables-single-responsibility](/rules/composables-single-responsibility)   |                                        -                                         |   -   |      💪       |
| [composables-async-patterns](/rules/composables-async-patterns)                 |                                        -                                         |   -   |      ✅       |
| [composables-thin-composables](/rules/composables-thin-composables)             |                                        -                                         |   -   |      ✅       |
| [composables-progressive-extraction](/rules/composables-progressive-extraction) |                                        -                                         |   -   |      💪       |

✅ in Eval Improved = Rule measurably improves output over baseline
💪 in Eval Improved = Model already applies this pattern without explicit instruction
