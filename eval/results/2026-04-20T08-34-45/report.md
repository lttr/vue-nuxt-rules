# Eval Report

## Summary

- **Already Known**: 14
- **With Rule Better**: 16
- **No Improvement**: 0

## Results

| Name | Type | Category | Classification | Baseline | With Rule |
|------|------|----------|---------------|----------|-----------|
| composables-cleanup-refactor | refactor | misc | 🔵 with-rule-better | 3/4 | 4/4 |
| composables-input-flexibility | generation | composables | 🔵 with-rule-better | 0/4 | 2/4 |
| composables-thin-composables | generation | composables | 🔵 with-rule-better | 0/2 | 2/2 |
| composables-vs-utils | generation | composables | 🔵 with-rule-better | 1/2 | 2/2 |
| define-emits-with-typescript | generation | props | 🔵 with-rule-better | 0/4 | 4/4 |
| define-props-with-typescript | generation | props | 🔵 with-rule-better | 2/4 | 4/4 |
| destructure-props | generation | props | 🔵 with-rule-better | 1/4 | 4/4 |
| group-script-by-logical-concerns | generation | sfc-structure | 🔵 with-rule-better | 0/2 | 2/2 |
| no-mutating-props | generation | props-state | 🔵 with-rule-better | 3/4 | 4/4 |
| no-side-effects-in-computed | generation | props-state | 🔵 with-rule-better | 0/2 | 2/2 |
| prefer-definemodel | generation | props | 🔵 with-rule-better | 0/4 | 4/4 |
| prefer-vueuse-refactor | refactor | misc | 🔵 with-rule-better | 0/2 | 2/2 |
| prefer-vueuse | generation | composables | 🔵 with-rule-better | 0/4 | 4/4 |
| same-name-prop-shorthand | generation | props | 🔵 with-rule-better | 0/4 | 4/4 |
| script-setup-with-typescript | generation | sfc-structure | 🔵 with-rule-better | 2/4 | 4/4 |
| use-of-instead-of-in-for-v-for | generation | template-directives | 🔵 with-rule-better | 0/4 | 4/4 |
| composables-async-patterns | generation | composables | ⚪ already-known | 8/8 | 8/8 |
| composables-cleanup | generation | composables | ⚪ already-known | 4/4 | 4/4 |
| composables-naming | generation | composables | ⚪ already-known | 4/4 | 4/4 |
| composables-organize-by-concern | generation | composables | ⚪ already-known | 2/2 | 2/2 |
| composables-progressive-extraction | generation | composables | ⚪ already-known | 2/2 | 2/2 |
| composables-return-refs | generation | composables | ⚪ already-known | 6/6 | 6/6 |
| composables-setup-context | generation | composables | ⚪ already-known | 2/2 | 2/2 |
| composables-single-responsibility | generation | composables | ⚪ already-known | 4/4 | 4/4 |
| keyed-v-for | generation | template-directives | ⚪ already-known | 4/4 | 4/4 |
| multi-word-component-names | generation | sfc-structure | ⚪ already-known | 2/2 | 2/2 |
| prefer-ref-over-reactive-refactor | refactor | misc | ⚪ already-known | 4/4 | 4/4 |
| prefer-ref-over-reactive | generation | props | ⚪ already-known | 4/4 | 4/4 |
| scoped-styles | generation | styles | ⚪ already-known | 2/2 | 2/2 |
| template-on-the-top | generation | sfc-structure | ⚪ already-known | 4/4 | 4/4 |

## Recommendations

- **composables-cleanup-refactor** → use rule
- **composables-input-flexibility** → use rule
- **composables-thin-composables** → use rule
- **composables-vs-utils** → use rule
- **define-emits-with-typescript** → use rule
- **define-props-with-typescript** → use rule
- **destructure-props** → use rule
- **group-script-by-logical-concerns** → use rule
- **no-mutating-props** → use rule
- **no-side-effects-in-computed** → use rule
- **prefer-definemodel** → use rule
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
| error-ref | ✅ pattern found, expected present | ✅ pattern found, expected present |
| returns-loading | ✅ pattern found, expected present | ✅ pattern found, expected present |
| returns-error | ✅ pattern found, expected present | ✅ pattern found, expected present |

⚪ **No difference** — all passed

### composables-cleanup-refactor

**Trial 0**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| has-cleanup | ✅ pattern found, expected present | ✅ pattern found, expected present |
| clears-interval | ❌ pattern not found, expected present | ✅ pattern found, expected present |

🔵 **With-rule improved**: clears-interval

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
| flexible-input | ❌ pattern not found, expected present | ❌ pattern not found, expected present |

🔵 **With-rule improved**: uses-tovalue

**Trial 1**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| uses-tovalue | ❌ pattern not found, expected present | ✅ pattern found, expected present |
| flexible-input | ❌ pattern not found, expected present | ❌ pattern not found, expected present |

🔵 **With-rule improved**: uses-tovalue

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
| organized-by-concern | ✅ 1: PASS - profile state/loading/error grouped, prefs state grouped, activity state grouped, methods follow same grouping | ✅ 1: PASS - profile state/fns grouped, prefs state/fns grouped, activity state/fns grouped, separated by comments |

⚪ **No difference** — all passed

**Trial 1**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| organized-by-concern | ✅ 1: PASS - state grouped by concern (profile refs, notification reactive, activity refs), methods mirror same grouping | ✅ 1: PASS - profile, notif prefs, activity log each grouped with own state + functions |

⚪ **No difference** — all passed

### composables-progressive-extraction

**Trial 0**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| inline-or-colocated | ✅ 1: PASS - search logic inline in script setup | ✅ 1: PASS - search logic inline in script setup |

⚪ **No difference** — all passed

**Trial 1**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| inline-or-colocated | ✅ 1: PASS - search logic inline in `<script setup>` | ✅ 1: PASS - search logic inline in script setup |

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
| called-in-setup | ✅ 1: PASS - `useMousePosition()` and `useItemList()` called at top level of `<script setup>`, no conditional/async wrapping | ✅ 1: PASS - both `useMousePosition()` and `useItemList()` called at top level of `<script setup>` |

⚪ **No difference** — all passed

**Trial 1**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| called-in-setup | ✅ 1: PASS - `useMousePosition()` and `useItemList()` called at top level of `<script setup>`, no conditional/async wrapping | ✅ 1: PASS - both `useMousePosition()` and `useItemList()` called at top level of `<script setup>` |

⚪ **No difference** — all passed

### composables-single-responsibility

**Trial 0**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| multiple-composables | ✅ pattern found, expected present | ✅ pattern found, expected present |
| split-concerns | ✅ 1: PASS - cart state, API sync, totals, checkout split into 4 focused composables | ✅ 1: PASS - four focused composables, each single responsibility |

⚪ **No difference** — all passed

**Trial 1**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| multiple-composables | ✅ pattern found, expected present | ✅ pattern found, expected present |
| split-concerns | ✅ 1: PASS - cart state, API sync, totals, and checkout split into four focused composables | ✅ 1: PASS - split into useFetchCart, useAddToCart, useRemoveFromCart, useCartTotals, useCheckout; useCart composes them |

⚪ **No difference** — all passed

### composables-thin-composables

**Trial 0**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| pure-function-extracted | ❌ 1: FAIL - business logic inlined in `computed()`, no separate pure function | ✅ 1: PASS - `calculateShippingCost` and `applyFreeShipping` extracted as pure functions; composable only wires refs |

🔵 **With-rule improved**: pure-function-extracted

**Trial 1**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| pure-function-extracted | ❌ 1: FAIL - business logic inlined in computed, no separate pure function | ✅ 1: PASS - `calculateShippingCost` pure function in separate file, composable just wires refs to it |

🔵 **With-rule improved**: pure-function-extracted

### composables-vs-utils

**Trial 0**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| util-functions | ✅ 1: PASS - `formatCurrency`/`formatDate` plain functions in `utils/formatters.js`, only `useWindowFocus` is composable | ✅ 1: PASS - `formatCurrency`/`formatDate` plain functions in `utils/format.js`, only stateful `useWindowFocus` is composable |

⚪ **No difference** — all passed

**Trial 1**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| util-functions | ❌ 1: FAIL - pure formatting functions wrapped in `useFormatters` composable instead of plain utility functions | ✅ 1: PASS - `formatCurrency`/`formatDate` plain utils in `format.js`, reactive state in `useWindowFocus` composable |

🔵 **With-rule improved**: util-functions

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
| no-withdefaults | ✅ pattern not found, expected absent | ✅ pattern not found, expected absent |

🔵 **With-rule improved**: destructured-defineprops

**Trial 1**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| destructured-defineprops | ❌ pattern not found, expected present | ✅ pattern found, expected present |
| no-withdefaults | ❌ pattern found, expected absent | ✅ pattern not found, expected absent |

🔵 **With-rule improved**: destructured-defineprops, no-withdefaults

### group-script-by-logical-concerns

**Trial 0**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| logical-grouping | ❌ 1: FAIL - all refs grouped together, all computeds together, all functions together; no concern-based grouping | ✅ 1: PASS - script groups by concern (gallery, product, cart, reviews) with clear comment separators |

🔵 **With-rule improved**: logical-grouping

**Trial 1**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| logical-grouping | ❌ 1: FAIL - all refs together, all computeds together, all functions together; not grouped by concern (gallery/cart/reviews mixed throughout) | ✅ 1: PASS - script grouped by concern (product, gallery, cart, reviews) with comment separators |

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
| multi-word-name | ✅ 1: PASS - filename `ProfileCard.vue` is multi-word | ✅ 1: PASS - component named `UserProfileCard` (multi-word) |

⚪ **No difference** — all passed

**Trial 1**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| multi-word-name | ✅ 1: PASS - component named `ProfileCard` (multi-word) | ✅ 1: PASS - component named `UserProfileCard` (multi-word) |

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
| uses-emit-or-model | ✅ pattern found, expected present | ✅ pattern found, expected present |
| no-direct-prop-mutation | ✅ pattern not found, expected absent | ✅ pattern not found, expected absent |

⚪ **No difference** — all passed

### no-side-effects-in-computed

**Trial 0**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| no-ref-assignment-in-computed | ❌ 1: FAIL - `inStockProducts` computed assigns `lastFilteredCount.value = filtered.length` (side effect in computed) | ✅ 1: PASS - count tracked via `watch()`, computed has no side effects |

🔵 **With-rule improved**: no-ref-assignment-in-computed

**Trial 1**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| no-ref-assignment-in-computed | ❌ 1: FAIL - `inStockProducts` computed assigns `lastFilteredCount.value = filtered.length` (side effect inside computed) | ✅ 1: PASS - computed only filters, watch handles lastFilteredCount assignment |

🔵 **With-rule improved**: no-ref-assignment-in-computed

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
| converted-to-ref | ✅ pattern found, expected present | ✅ pattern found, expected present |
| no-reactive | ✅ pattern not found, expected absent | ✅ pattern not found, expected absent |

⚪ **No difference** — all passed

**Trial 1**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| converted-to-ref | ✅ pattern found, expected present | ✅ pattern found, expected present |
| no-reactive | ✅ pattern not found, expected absent | ✅ pattern not found, expected absent |

⚪ **No difference** — all passed

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
