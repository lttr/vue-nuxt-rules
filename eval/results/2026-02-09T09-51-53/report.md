# Eval Report

## Summary

- **Already Known**: 12
- **With Rule Better**: 17
- **No Improvement**: 1

## Results

| Name | Type | Category | Classification | Baseline | With Rule |
|------|------|----------|---------------|----------|-----------|
| composables-input-flexibility | generation | composables | 🔵 with-rule-better | 0/2 | 2/2 |
| composables-organize-by-concern | generation | composables | 🔵 with-rule-better | 0/1 | 1/1 |
| composables-thin-composables | generation | composables | 🔵 with-rule-better | 0/1 | 1/1 |
| composables-vs-utils | generation | composables | 🔵 with-rule-better | 1/2 | 2/2 |
| define-emits-with-typescript | generation | props | 🔵 with-rule-better | 0/4 | 4/4 |
| define-props-with-typescript | generation | props | 🔵 with-rule-better | 2/4 | 4/4 |
| destructure-props | generation | props | 🔵 with-rule-better | 1/4 | 4/4 |
| group-script-by-logical-concerns | generation | sfc-structure | 🔵 with-rule-better | 0/1 | 1/1 |
| no-mutating-props | generation | props-state | 🔵 with-rule-better | 2/4 | 4/4 |
| prefer-definemodel | generation | props | 🔵 with-rule-better | 0/4 | 4/4 |
| prefer-ref-over-reactive-refactor | refactor | misc | 🔵 with-rule-better | 1/2 | 2/2 |
| prefer-vueuse-refactor | refactor | misc | 🔵 with-rule-better | 0/2 | 2/2 |
| prefer-vueuse | generation | composables | 🔵 with-rule-better | 0/4 | 4/4 |
| same-name-prop-shorthand | generation | props | 🔵 with-rule-better | 0/4 | 4/4 |
| script-setup-with-typescript | generation | sfc-structure | 🔵 with-rule-better | 2/4 | 4/4 |
| template-on-the-top | generation | sfc-structure | 🔵 with-rule-better | 2/4 | 4/4 |
| use-of-instead-of-in-for-v-for | generation | template-directives | 🔵 with-rule-better | 0/4 | 4/4 |
| no-side-effects-in-computed | generation | props-state | 🔴 no-improvement | 0/1 | 0/1 |
| composables-async-patterns | generation | composables | ⚪ already-known | 8/8 | 8/8 |
| composables-cleanup-refactor | refactor | misc | ⚪ already-known | 4/4 | 4/4 |
| composables-cleanup | generation | composables | ⚪ already-known | 4/4 | 4/4 |
| composables-naming | generation | composables | ⚪ already-known | 4/4 | 4/4 |
| composables-progressive-extraction | generation | composables | ⚪ already-known | 2/2 | 2/2 |
| composables-return-refs | generation | composables | ⚪ already-known | 6/6 | 6/6 |
| composables-setup-context | generation | composables | ⚪ already-known | 2/2 | 2/2 |
| composables-single-responsibility | generation | composables | ⚪ already-known | 4/4 | 4/4 |
| keyed-v-for | generation | template-directives | ⚪ already-known | 4/4 | 4/4 |
| multi-word-component-names | generation | sfc-structure | ⚪ already-known | 1/1 | 1/1 |
| prefer-ref-over-reactive | generation | props | ⚪ already-known | 4/4 | 4/4 |
| scoped-styles | generation | styles | ⚪ already-known | 2/2 | 2/2 |

## Recommendations

- **composables-input-flexibility** → use rule
- **composables-organize-by-concern** → use rule
- **composables-thin-composables** → use rule
- **composables-vs-utils** → use rule
- **define-emits-with-typescript** → use rule
- **define-props-with-typescript** → use rule
- **destructure-props** → use rule
- **group-script-by-logical-concerns** → use rule
- **no-mutating-props** → use rule
- **prefer-definemodel** → use rule
- **prefer-ref-over-reactive-refactor** → use rule
- **prefer-vueuse-refactor** → use rule
- **prefer-vueuse** → use rule
- **same-name-prop-shorthand** → use rule
- **script-setup-with-typescript** → use rule
- **template-on-the-top** → use rule
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
| error-ref | ✅ pattern found, expected present | ✅ pattern found, expected present |
| returns-loading | ✅ pattern found, expected present | ✅ pattern found, expected present |
| returns-error | ✅ pattern found, expected present | ✅ pattern found, expected present |

⚪ **No difference** — all passed

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
| uses-tovalue | ❌ pattern not found, expected present | ✅ pattern found, expected present |
| flexible-input | ❌ pattern not found, expected present | ✅ pattern found, expected present |

🔵 **With-rule improved**: uses-tovalue, flexible-input

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

### composables-organize-by-concern

**Trial 0**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| organized-by-concern | ❌ Failed to parse response for criterion 1 | ✅ 1: PASS - code is organized by concern with clear sections for user profile, notification preferences, and activity log, each grouping related state and functions together |

🔵 **With-rule improved**: organized-by-concern

### composables-progressive-extraction

**Trial 0**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| inline-or-colocated | ✅ 1: PASS - search logic is kept inline within the component's script setup block | ✅ 1: PASS - search logic is kept inline in component's script setup block |

⚪ **No difference** — all passed

**Trial 1**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| inline-or-colocated | ✅ 1: PASS - search logic is kept inline within the component's script setup section | ✅ 1: PASS - search logic is kept inline in the component's script setup block |

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
| called-in-setup | ✅ 1: PASS - all composable calls are at top level of setup context | ✅ 1: PASS - all composable calls (useMousePosition, useItemList) are at top level of <script setup> |

⚪ **No difference** — all passed

**Trial 1**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| called-in-setup | ✅ 1: PASS - all composable calls made at top level of setup context | ✅ 1: PASS - all composable calls made at top level of setup context |

⚪ **No difference** — all passed

### composables-single-responsibility

**Trial 0**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| multiple-composables | ✅ pattern found, expected present | ✅ pattern found, expected present |
| split-concerns | ✅ 1: PASS - well-separated concerns: useCartItems (state), useCartApi (HTTP), useCartTotals (calculations), useCheckout (workflow), with main useCart as orchestrator | ✅ 1: PASS - cart logic properly split into focused composables (useCartItems for state, useFetchCart for API, useCartTotals for calculations, useCheckout for checkout flow) |

⚪ **No difference** — all passed

**Trial 1**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| multiple-composables | ✅ pattern found, expected present | ✅ pattern found, expected present |
| split-concerns | ✅ 1: PASS - cart split into focused units: useCartItems (state), useCartApi (server sync), useCartTotals (calculations), useCheckout (order flow), with useCart as facade | ✅ 1: PASS - composables are well-split into focused units: useCartItems (item management), useCartApi (API operations), useCartCheckout (checkout flow), useCartTotals (calculations), with useCart as orchestrator |

⚪ **No difference** — all passed

### composables-thin-composables

**Trial 0**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| pure-function-extracted | ❌ 1: FAIL - business logic is inlined in computed, not extracted to pure function | ✅ 1: PASS - business logic extracted to pure `calculateShippingCost` function, composable just wraps it with reactivity |

🔵 **With-rule improved**: pure-function-extracted

### composables-vs-utils

**Trial 0**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| util-functions | ❌ 1: FAIL - currency and date formatters are plain functions but imported from composables/ directory, should be in utils/ directory instead | ✅ 1: PASS - formatCurrency and formatDate are plain utility functions, useWindowFocus is properly a composable due to reactive state and lifecycle hooks |

🔵 **With-rule improved**: util-functions

**Trial 1**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| util-functions | ✅ 1: PASS - currency and date functions are pure utilities, only window focus tracking is a composable | ✅ 1: PASS - formatting functions are plain utilities, only reactive window focus uses composable pattern |

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
| typed-defineemits | ❌ pattern not found, expected present | ✅ pattern found, expected present |
| no-array-emits | ❌ pattern found, expected absent | ✅ pattern not found, expected absent |

🔵 **With-rule improved**: typed-defineemits, no-array-emits

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
| no-withdefaults | ❌ pattern found, expected absent | ✅ pattern not found, expected absent |

🔵 **With-rule improved**: destructured-defineprops, no-withdefaults

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
| logical-grouping | ❌ 1: FAIL - organized by Vue API type (refs, computed, functions) instead of logical concern (gallery, quantity, reviews, cart) | ✅ 1: PASS - script code is clearly organized by logical concern with sections for image gallery, quantity selector, cart logic, pricing, and reviews rather than grouping all refs/computed/functions together |

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
| multi-word-name | ✅ 1: PASS - component name "ProfileCard" uses multi-word naming convention | ✅ 1: PASS - component uses multi-word name "UserProfileCard" (evident from CSS class naming pattern and component structure) |

⚪ **No difference** — all passed

### no-mutating-props

**Trial 0**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| uses-emit-or-model | ❌ pattern not found, expected present | ✅ pattern found, expected present |
| no-direct-prop-mutation | ✅ pattern not found, expected absent | ✅ pattern not found, expected absent |

🔵 **With-rule improved**: uses-emit-or-model

**Trial 1**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| uses-emit-or-model | ❌ pattern not found, expected present | ✅ pattern found, expected present |
| no-direct-prop-mutation | ✅ pattern not found, expected absent | ✅ pattern not found, expected absent |

🔵 **With-rule improved**: uses-emit-or-model

### no-side-effects-in-computed

**Trial 0**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| no-ref-assignment-in-computed | ❌ Failed to parse response for criterion 1 | ❌ 1: FAIL - `lastFilteredCount` computed accesses `.value` of another computed property, which creates unnecessary reactivity chain; should directly compute length from filtered array or use the filtered array's length in template |

⚪ **No difference** — all failed the same checks

### prefer-definemodel

**Trial 0**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| uses-definemodel | ❌ pattern not found, expected present | ✅ pattern found, expected present |
| no-manual-emit | ❌ pattern found, expected absent | ✅ pattern not found, expected absent |

🔵 **With-rule improved**: uses-definemodel, no-manual-emit

**Trial 1**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| uses-definemodel | ❌ pattern not found, expected present | ✅ pattern found, expected present |
| no-manual-emit | ❌ pattern found, expected absent | ✅ pattern not found, expected absent |

🔵 **With-rule improved**: uses-definemodel, no-manual-emit

### prefer-ref-over-reactive-refactor

**Trial 0**

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
| script-setup-ts | ❌ pattern not found, expected present | ✅ pattern found, expected present |
| no-options-api | ✅ pattern not found, expected absent | ✅ pattern not found, expected absent |

🔵 **With-rule improved**: script-setup-ts

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
| template-first | ❌ pattern not found, expected present | ✅ pattern found, expected present |
| script-after-template | ✅ pattern found, expected present | ✅ pattern found, expected present |

🔵 **With-rule improved**: template-first

**Trial 1**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| template-first | ❌ pattern not found, expected present | ✅ pattern found, expected present |
| script-after-template | ✅ pattern found, expected present | ✅ pattern found, expected present |

🔵 **With-rule improved**: template-first

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
