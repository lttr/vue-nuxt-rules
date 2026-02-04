# Eval Report

## Summary

- **Already Known**: 17
- **With Rule Better**: 13
- **No Improvement**: 1

## Results

| Name | Type | Category | Classification | Baseline | With Rule |
|------|------|----------|---------------|----------|-----------|
| composables-organize-by-concern | generation | composables | 🔵 with-rule-better | 0/2 | 2/2 |
| composables-thin-composables | generation | composables | 🔵 with-rule-better | 0/2 | 2/2 |
| define-emits-with-typescript | generation | props | 🔵 with-rule-better | 2/4 | 4/4 |
| define-props-with-typescript | generation | props | 🔵 with-rule-better | 2/4 | 4/4 |
| destructure-props | generation | props | 🔵 with-rule-better | 2/4 | 4/4 |
| group-script-by-logical-concerns | generation | sfc-structure | 🔵 with-rule-better | 0/2 | 2/2 |
| multi-word-component-names | generation | sfc-structure | 🔵 with-rule-better | 1/2 | 2/2 |
| prefer-ref-over-reactive-refactor | refactor | misc | 🔵 with-rule-better | 3/4 | 4/4 |
| prefer-vueuse-refactor | refactor | misc | 🔵 with-rule-better | 0/2 | 2/2 |
| prefer-vueuse | generation | composables | 🔵 with-rule-better | 0/4 | 4/4 |
| same-name-prop-shorthand | generation | props | 🔵 with-rule-better | 0/4 | 4/4 |
| script-setup-with-typescript | generation | sfc-structure | 🔵 with-rule-better | 3/4 | 4/4 |
| use-of-instead-of-in-for-v-for | generation | template-directives | 🔵 with-rule-better | 0/4 | 4/4 |
| no-side-effects-in-computed | generation | props-state | 🔴 no-improvement | 0/2 | 0/2 |
| composables-async-patterns | generation | composables | ⚪ already-known | 8/8 | 7/8 |
| composables-cleanup-refactor | refactor | misc | ⚪ already-known | 4/4 | 4/4 |
| composables-cleanup | generation | composables | ⚪ already-known | 4/4 | 4/4 |
| composables-input-flexibility ⚠️ | generation | composables | ⚪ already-known | 4/4 | 2/4 |
| composables-naming | generation | composables | ⚪ already-known | 4/4 | 4/4 |
| composables-organize-by-concern-refactor ⚠️ | refactor | misc | ⚪ already-known | 2/2 | 1/2 |
| composables-progressive-extraction | generation | composables | ⚪ already-known | 2/2 | 2/2 |
| composables-return-refs | generation | composables | ⚪ already-known | 6/6 | 6/6 |
| composables-setup-context | generation | composables | ⚪ already-known | 2/2 | 2/2 |
| composables-single-responsibility | generation | composables | ⚪ already-known | 4/4 | 4/4 |
| composables-vs-utils | generation | composables | ⚪ already-known | 2/2 | 2/2 |
| keyed-v-for | generation | template-directives | ⚪ already-known | 4/4 | 4/4 |
| no-mutating-props | generation | props-state | ⚪ already-known | 4/4 | 4/4 |
| prefer-definemodel | generation | props | ⚪ already-known | 4/4 | 4/4 |
| prefer-ref-over-reactive | generation | props | ⚪ already-known | 4/4 | 4/4 |
| scoped-styles | generation | styles | ⚪ already-known | 2/2 | 2/2 |
| template-on-the-top | generation | sfc-structure | ⚪ already-known | 4/4 | 4/4 |

## Recommendations

- **composables-organize-by-concern** → use rule
- **composables-thin-composables** → use rule
- **define-emits-with-typescript** → use rule
- **define-props-with-typescript** → use rule
- **destructure-props** → use rule
- **group-script-by-logical-concerns** → use rule
- **multi-word-component-names** → use rule
- **prefer-ref-over-reactive-refactor** → use rule
- **prefer-vueuse-refactor** → use rule
- **prefer-vueuse** → use rule
- **same-name-prop-shorthand** → use rule
- **script-setup-with-typescript** → use rule
- **use-of-instead-of-in-for-v-for** → use rule

## Details

### composables-async-patterns

**Trial 0**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| loading-ref | ✅ pattern found, expected present | ✅ pattern found, expected present |
| error-ref | ✅ pattern found, expected present | ✅ pattern found, expected present |
| returns-loading | ✅ pattern found, expected present | ✅ pattern found, expected present |
| returns-error | ✅ pattern found, expected present | ✅ pattern found, expected present |

⚪ **No difference** — all passed

**Trial 1**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| loading-ref | ✅ pattern found, expected present | ✅ pattern found, expected present |
| error-ref | ✅ pattern found, expected present | ❌ pattern not found, expected present |
| returns-loading | ✅ pattern found, expected present | ✅ pattern found, expected present |
| returns-error | ✅ pattern found, expected present | ✅ pattern found, expected present |

🔴 **With-rule regressed**: error-ref

### composables-cleanup-refactor

**Trial 0**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| has-cleanup | ✅ pattern found, expected present | ✅ pattern found, expected present |
| clears-interval | ✅ pattern found, expected present | ✅ pattern found, expected present |

⚪ **No difference** — all passed

**Trial 1**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| has-cleanup | ✅ pattern found, expected present | ✅ pattern found, expected present |
| clears-interval | ✅ pattern found, expected present | ✅ pattern found, expected present |

⚪ **No difference** — all passed

### composables-cleanup

**Trial 0**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| has-cleanup | ✅ pattern found, expected present | ✅ pattern found, expected present |
| removes-listener | ✅ pattern found, expected present | ✅ pattern found, expected present |

⚪ **No difference** — all passed

**Trial 1**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| has-cleanup | ✅ pattern found, expected present | ✅ pattern found, expected present |
| removes-listener | ✅ pattern found, expected present | ✅ pattern found, expected present |

⚪ **No difference** — all passed

### composables-input-flexibility

**Trial 0**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| uses-tovalue | ✅ pattern found, expected present | ❌ pattern not found, expected present |
| flexible-input | ✅ pattern found, expected present | ❌ pattern not found, expected present |

🔴 **With-rule regressed**: uses-tovalue, flexible-input

**Trial 1**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| uses-tovalue | ✅ pattern found, expected present | ✅ pattern found, expected present |
| flexible-input | ✅ pattern found, expected present | ✅ pattern found, expected present |

⚪ **No difference** — all passed

### composables-naming

**Trial 0**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| use-prefix | ✅ pattern found, expected present | ✅ pattern found, expected present |
| returns-refs | ✅ pattern found, expected present | ✅ pattern found, expected present |

⚪ **No difference** — all passed

**Trial 1**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| use-prefix | ✅ pattern found, expected present | ✅ pattern found, expected present |
| returns-refs | ✅ pattern found, expected present | ✅ pattern found, expected present |

⚪ **No difference** — all passed

### composables-organize-by-concern-refactor

**Trial 0**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| organized-by-concern | ✅ 1: PASS - code is organized by logical concern with separate composables for user, posts, and notifications functionality rather than grouping by API type | ❌ 1: FAIL - code groups by API type (all refs together, all functions together) rather than by concern |

🔴 **With-rule regressed**: organized-by-concern

**Trial 1**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| organized-by-concern | ✅ 1: PASS - code is organized by logical concerns with separate composables for user, posts, and notifications, each containing their related state and functions together | ✅ 1: PASS - code is organized by logical concern with related state and functions grouped together |

⚪ **No difference** — all passed

### composables-organize-by-concern

**Trial 0**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| organized-by-concern | ❌ 1: FAIL - grouped by type (all state vars together, all computed together, all methods together) rather than by concern (profile+loading, prefs+saving, activity+pagination) | ✅ 1: PASS - code is well-organized by concern with user profile, notification preferences, and activity log sections clearly separated with their related state and functions grouped together |

🔵 **With-rule improved**: organized-by-concern

**Trial 1**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| organized-by-concern | ❌ 1: FAIL - grouped by API type (state/computed/methods) rather than by logical concern | ✅ 1: PASS - code groups profile data+loading, notification prefs+save, and activity log+pagination together by logical concern rather than grouping all refs/functions separately |

🔵 **With-rule improved**: organized-by-concern

### composables-progressive-extraction

**Trial 0**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| inline-or-colocated | ✅ 1: PASS - search logic is kept inline in the component's script setup section | ✅ 1: PASS - search logic is kept inline in component's script setup, not extracted to shared composables |

⚪ **No difference** — all passed

**Trial 1**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| inline-or-colocated | ✅ 1: PASS - search logic is kept inline within the component's script setup block | ✅ 1: PASS - search logic is kept inline in component's script setup block |

⚪ **No difference** — all passed

### composables-return-refs

**Trial 0**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| returns-plain-object | ✅ pattern found, expected present | ✅ pattern found, expected present |
| uses-ref-not-reactive | ✅ pattern found, expected present | ✅ pattern found, expected present |
| no-reactive-return | ✅ pattern not found, expected absent | ✅ pattern not found, expected absent |

⚪ **No difference** — all passed

**Trial 1**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| returns-plain-object | ✅ pattern found, expected present | ✅ pattern found, expected present |
| uses-ref-not-reactive | ✅ pattern found, expected present | ✅ pattern found, expected present |
| no-reactive-return | ✅ pattern not found, expected absent | ✅ pattern not found, expected absent |

⚪ **No difference** — all passed

### composables-setup-context

**Trial 0**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| called-in-setup | ✅ 1: PASS - all composable calls made at top level of script setup | ✅ 1: PASS - all composable calls (useMousePosition, useItemList) are at top level of <script setup> |

⚪ **No difference** — all passed

**Trial 1**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| called-in-setup | ✅ 1: PASS - all composable calls made at top level of script setup | ✅ 1: PASS - all composable calls (useMousePosition, useItemList) are at top level of <script setup> |

⚪ **No difference** — all passed

### composables-single-responsibility

**Trial 0**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| multiple-composables | ✅ pattern found, expected present | ✅ pattern found, expected present |
| split-concerns | ✅ 1: PASS - properly split into focused units with single responsibilities | ✅ 1: PASS - cart functionality properly split into focused units: useCartItems (state management), useFetchCart (API operations), useCartTotals (calculations), useCheckout (order processing), with useCart as orchestrator |

⚪ **No difference** — all passed

**Trial 1**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| multiple-composables | ✅ pattern found, expected present | ✅ pattern found, expected present |
| split-concerns | ✅ 1: PASS - cart functionality properly split into focused units: useCart (items management), useCartApi (server sync), useCartTotals (calculations), useCheckout (checkout flow) | ✅ 1: PASS - split into focused composables: useCartItems (state), useFetchCart (API), useCartTotals (calculations), useCheckout (processing) |

⚪ **No difference** — all passed

### composables-thin-composables

**Trial 0**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| pure-function-extracted | ❌ 1: FAIL - shipping cost calculation is inlined in computed, not extracted as separate pure function | ✅ 1: PASS - business logic extracted into pure `calculateShippingCost` function, composable only handles reactivity wrapper |

🔵 **With-rule improved**: pure-function-extracted

**Trial 1**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| pure-function-extracted | ❌ 1: FAIL - shipping cost calculation is inlined in computed, not extracted to pure function | ✅ 1: PASS - business logic extracted to pure calculateShippingCost function, composable only handles reactivity wrapper |

🔵 **With-rule improved**: pure-function-extracted

### composables-vs-utils

**Trial 0**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| util-functions | ✅ 1: PASS - pure formatting functions are utility functions, reactive window focus is properly a composable | ✅ 1: PASS - currency/date formatters are pure utility functions, only reactive window focus uses composable pattern |

⚪ **No difference** — all passed

**Trial 1**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| util-functions | ✅ 1: PASS - pure formatting functions are utility functions, only reactive window focus is a composable | ✅ 1: PASS - pure formatting functions are utility functions, reactive window focus is composable |

⚪ **No difference** — all passed

### define-emits-with-typescript

**Trial 0**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| typed-defineemits | ❌ pattern not found, expected present | ✅ pattern found, expected present |
| no-array-emits | ❌ pattern found, expected absent | ✅ pattern not found, expected absent |

🔵 **With-rule improved**: typed-defineemits, no-array-emits

**Trial 1**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| typed-defineemits | ✅ pattern found, expected present | ✅ pattern found, expected present |
| no-array-emits | ✅ pattern not found, expected absent | ✅ pattern not found, expected absent |

⚪ **No difference** — all passed

### define-props-with-typescript

**Trial 0**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| typed-defineprops | ❌ pattern not found, expected present | ✅ pattern found, expected present |
| no-runtime-props | ✅ pattern not found, expected absent | ✅ pattern not found, expected absent |

🔵 **With-rule improved**: typed-defineprops

**Trial 1**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| typed-defineprops | ❌ pattern not found, expected present | ✅ pattern found, expected present |
| no-runtime-props | ✅ pattern not found, expected absent | ✅ pattern not found, expected absent |

🔵 **With-rule improved**: typed-defineprops

### destructure-props

**Trial 0**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| destructured-defineprops | ❌ pattern not found, expected present | ✅ pattern found, expected present |
| no-withdefaults | ✅ pattern not found, expected absent | ✅ pattern not found, expected absent |

🔵 **With-rule improved**: destructured-defineprops

**Trial 1**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| destructured-defineprops | ❌ pattern not found, expected present | ✅ pattern found, expected present |
| no-withdefaults | ✅ pattern not found, expected absent | ✅ pattern not found, expected absent |

🔵 **With-rule improved**: destructured-defineprops

### group-script-by-logical-concerns

**Trial 0**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| logical-grouping | ❌ 1: FAIL - organized by Vue API type (refs/computed/methods) instead of logical concerns | ✅ 1: PASS - code is organized by logical concerns (image gallery state, cart state, reviews state) rather than grouping all refs/computed/functions together |

🔵 **With-rule improved**: logical-grouping

**Trial 1**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| logical-grouping | ❌ 1: FAIL - code is grouped by Vue API type (all refs together, all computed together, all functions together) rather than by logical concern (product data, gallery logic, cart logic, reviews logic should be grouped separately) | ✅ 1: PASS - code is organized by logical concerns with clear section comments (Product Information, Image Gallery, Cart/Quantity, Reviews) |

🔵 **With-rule improved**: logical-grouping

### keyed-v-for

**Trial 0**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| has-key | ✅ pattern found, expected present | ✅ pattern found, expected present |
| key-uses-id | ✅ pattern found, expected present | ✅ pattern found, expected present |

⚪ **No difference** — all passed

**Trial 1**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| has-key | ✅ pattern found, expected present | ✅ pattern found, expected present |
| key-uses-id | ✅ pattern found, expected present | ✅ pattern found, expected present |

⚪ **No difference** — all passed

### multi-word-component-names

**Trial 0**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| multi-word-name | ❌ 1: FAIL - component appears to be named "ProfileCard" which is multi-word, but the code snippet doesn't show the actual filename or component name definition to verify this criterion | ✅ 1: PASS - component name "UserProfileCard" is multi-word (three words: User + Profile + Card) |

🔵 **With-rule improved**: multi-word-name

**Trial 1**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| multi-word-name | ✅ 1: PASS - component uses multi-word name "ProfileCard" | ✅ 1: PASS - component name "UserProfileCard" is multi-word (User + Profile + Card) |

⚪ **No difference** — all passed

### no-mutating-props

**Trial 0**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| uses-emit-or-model | ✅ pattern found, expected present | ✅ pattern found, expected present |
| no-direct-prop-mutation | ✅ pattern not found, expected absent | ✅ pattern not found, expected absent |

⚪ **No difference** — all passed

**Trial 1**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| uses-emit-or-model | ✅ pattern found, expected present | ✅ pattern found, expected present |
| no-direct-prop-mutation | ✅ pattern not found, expected absent | ✅ pattern not found, expected absent |

⚪ **No difference** — all passed

### no-side-effects-in-computed

**Trial 0**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| no-mutation-in-computed | ❌ pattern found, expected absent | ❌ pattern found, expected absent |

⚪ **No difference** — all failed the same checks

**Trial 1**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| no-mutation-in-computed | ❌ pattern found, expected absent | ❌ pattern found, expected absent |

⚪ **No difference** — all failed the same checks

### prefer-definemodel

**Trial 0**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| uses-definemodel | ✅ pattern found, expected present | ✅ pattern found, expected present |
| no-manual-emit | ✅ pattern not found, expected absent | ✅ pattern not found, expected absent |

⚪ **No difference** — all passed

**Trial 1**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| uses-definemodel | ✅ pattern found, expected present | ✅ pattern found, expected present |
| no-manual-emit | ✅ pattern not found, expected absent | ✅ pattern not found, expected absent |

⚪ **No difference** — all passed

### prefer-ref-over-reactive-refactor

**Trial 0**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| converted-to-ref | ✅ pattern found, expected present | ✅ pattern found, expected present |
| no-reactive | ✅ pattern not found, expected absent | ✅ pattern not found, expected absent |

⚪ **No difference** — all passed

**Trial 1**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| converted-to-ref | ❌ pattern not found, expected present | ✅ pattern found, expected present |
| no-reactive | ✅ pattern not found, expected absent | ✅ pattern not found, expected absent |

🔵 **With-rule improved**: converted-to-ref

### prefer-ref-over-reactive

**Trial 0**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| uses-ref | ✅ pattern found, expected present | ✅ pattern found, expected present |
| no-reactive | ✅ pattern not found, expected absent | ✅ pattern not found, expected absent |

⚪ **No difference** — all passed

**Trial 1**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| uses-ref | ✅ pattern found, expected present | ✅ pattern found, expected present |
| no-reactive | ✅ pattern not found, expected absent | ✅ pattern not found, expected absent |

⚪ **No difference** — all passed

### prefer-vueuse-refactor

**Trial 0**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| uses-vueuse | ❌ pattern not found, expected present | ✅ pattern found, expected present |

🔵 **With-rule improved**: uses-vueuse

**Trial 1**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| uses-vueuse | ❌ pattern not found, expected present | ✅ pattern found, expected present |

🔵 **With-rule improved**: uses-vueuse

### prefer-vueuse

**Trial 0**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| uses-vueuse | ❌ pattern not found, expected present | ✅ pattern found, expected present |
| no-manual-localstorage | ❌ pattern found, expected absent | ✅ pattern not found, expected absent |

🔵 **With-rule improved**: uses-vueuse, no-manual-localstorage

**Trial 1**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| uses-vueuse | ❌ pattern not found, expected present | ✅ pattern found, expected present |
| no-manual-localstorage | ❌ pattern found, expected absent | ✅ pattern not found, expected absent |

🔵 **With-rule improved**: uses-vueuse, no-manual-localstorage

### same-name-prop-shorthand

**Trial 0**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| uses-shorthand | ❌ pattern not found, expected present | ✅ pattern found, expected present |
| no-verbose | ❌ pattern found, expected absent | ✅ pattern not found, expected absent |

🔵 **With-rule improved**: uses-shorthand, no-verbose

**Trial 1**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| uses-shorthand | ❌ pattern not found, expected present | ✅ pattern found, expected present |
| no-verbose | ❌ pattern found, expected absent | ✅ pattern not found, expected absent |

🔵 **With-rule improved**: uses-shorthand, no-verbose

### scoped-styles

**Trial 0**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| has-scoped-styles | ✅ pattern found, expected present | ✅ pattern found, expected present |

⚪ **No difference** — all passed

**Trial 1**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| has-scoped-styles | ✅ pattern found, expected present | ✅ pattern found, expected present |

⚪ **No difference** — all passed

### script-setup-with-typescript

**Trial 0**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| script-setup-ts | ✅ pattern found, expected present | ✅ pattern found, expected present |
| no-options-api | ✅ pattern not found, expected absent | ✅ pattern not found, expected absent |

⚪ **No difference** — all passed

**Trial 1**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| script-setup-ts | ❌ pattern not found, expected present | ✅ pattern found, expected present |
| no-options-api | ✅ pattern not found, expected absent | ✅ pattern not found, expected absent |

🔵 **With-rule improved**: script-setup-ts

### template-on-the-top

**Trial 0**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| template-first | ✅ pattern found, expected present | ✅ pattern found, expected present |
| script-after-template | ✅ pattern found, expected present | ✅ pattern found, expected present |

⚪ **No difference** — all passed

**Trial 1**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| template-first | ✅ pattern found, expected present | ✅ pattern found, expected present |
| script-after-template | ✅ pattern found, expected present | ✅ pattern found, expected present |

⚪ **No difference** — all passed

### use-of-instead-of-in-for-v-for

**Trial 0**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| uses-of | ❌ pattern not found, expected present | ✅ pattern found, expected present |
| no-in | ❌ pattern found, expected absent | ✅ pattern not found, expected absent |

🔵 **With-rule improved**: uses-of, no-in

**Trial 1**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| uses-of | ❌ pattern not found, expected present | ✅ pattern found, expected present |
| no-in | ❌ pattern found, expected absent | ✅ pattern not found, expected absent |

🔵 **With-rule improved**: uses-of, no-in
