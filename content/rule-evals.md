# Rule Evals

Evaluation of whether explicit rules improve AI code generation output.

## Methodology

- **Model**: Claude Opus 4.5 via Claude Code
- **Approach**: Compare baseline (no rule) vs extracted rule (concise "Rule for AI agents" version)
- **Metric**: Does providing the rule improve output compared to model's inherent knowledge?

## Results

| Rule | ESLint | --fix | Eval Improved |
|------|:------:|:-----:|:-------------:|
| **Vue SFC Structure** ||||
| [template-on-the-top](/rules/template-on-the-top) | ✅ | ✅ | - |
| [script-setup-with-typescript](/rules/script-setup-with-typescript) | ✅ | - | ✅ |
| [group-script-by-logical-concerns](/rules/group-script-by-logical-concerns) | - | - | ✅ |
| [multi-word-component-names](/rules/multi-word-component-names) | ✅ | - | - |
| **Props & State** ||||
| [define-props-with-typescript](/rules/define-props-with-typescript) | ✅ | - | ✅ |
| [define-emits-with-typescript](/rules/define-emits-with-typescript) | ✅ | - | ✅ |
| [destructure-props](/rules/destructure-props) | ✅ | - | ✅ |
| [same-name-prop-shorthand](/rules/same-name-prop-shorthand) | ✅ | ✅ | ✅ |
| [prefer-definemodel](/rules/prefer-definemodel) | - | - | - |
| [prefer-ref-over-reactive](/rules/prefer-ref-over-reactive) | - | - | - |
| [prefer-vueuse](/rules/prefer-vueuse) | - | - | ✅ |
| **Template Directives** ||||
| [keyed-v-for](/rules/keyed-v-for) | ✅ | - | - |
| [use-of-instead-of-in-for-v-for](/rules/use-of-instead-of-in-for-v-for) | ✅ | ✅ | ✅ |
| **Styles** ||||
| [scoped-styles](/rules/scoped-styles) | - | - | - |
| **Composables** ||||
| [composables-setup-context](/rules/composables-setup-context) | - | - | - |
| [composables-naming](/rules/composables-naming) | - | - | - |
| [composables-return-refs](/rules/composables-return-refs) | - | - | - |
| [composables-cleanup](/rules/composables-cleanup) | - | - | - |
| [composables-vs-utils](/rules/composables-vs-utils) | - | - | - |
| [composables-organize-by-concern](/rules/composables-organize-by-concern) | - | - | ✅ |
| [composables-input-flexibility](/rules/composables-input-flexibility) | - | - | - |
| [composables-single-responsibility](/rules/composables-single-responsibility) | - | - | - |
| [composables-async-patterns](/rules/composables-async-patterns) | - | - | - |
| [composables-thin-composables](/rules/composables-thin-composables) | - | - | ✅ |
| [composables-progressive-extraction](/rules/composables-progressive-extraction) | - | - | - |

\- in Eval Improved = Model already applies this pattern without explicit instruction

## Summary

- **10/25** rules improve AI output (40%)
- **9/25** have ESLint rules (36%)
- **3/9** ESLint rules have autofix (33%)

