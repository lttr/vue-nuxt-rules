# Eval Report

## Summary

- **Already Known**: 14
- **With Rule Better**: 16
- **No Improvement**: 0

## Results

| Name | Type | Category | Classification | Baseline | With Rule |
|------|------|----------|---------------|----------|-----------|
| composables-cleanup-refactor | refactor | misc | 🔵 with-rule-better | 2/4 | 4/4 |
| composables-input-flexibility | generation | composables | 🔵 with-rule-better | 2/4 | 3/4 |
| composables-thin-composables | generation | composables | 🔵 with-rule-better | 0/2 | 2/2 |
| define-emits-with-typescript | generation | props | 🔵 with-rule-better | 0/4 | 4/4 |
| define-props-with-typescript | generation | props | 🔵 with-rule-better | 2/4 | 4/4 |
| destructure-props | generation | props | 🔵 with-rule-better | 2/4 | 4/4 |
| group-script-by-logical-concerns ⚠️ | generation | sfc-structure | 🔵 with-rule-better | 0/2 | 1/2 |
| no-mutating-props | generation | props-state | 🔵 with-rule-better | 3/4 | 4/4 |
| no-side-effects-in-computed | generation | props-state | 🔵 with-rule-better | 1/2 | 2/2 |
| prefer-definemodel | generation | props | 🔵 with-rule-better | 0/4 | 4/4 |
| prefer-ref-over-reactive-refactor | refactor | misc | 🔵 with-rule-better | 3/4 | 4/4 |
| prefer-vueuse-refactor | refactor | misc | 🔵 with-rule-better | 0/2 | 2/2 |
| prefer-vueuse | generation | composables | 🔵 with-rule-better | 0/4 | 4/4 |
| same-name-prop-shorthand ⚠️ | generation | props | 🔵 with-rule-better | 0/4 | 2/4 |
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
| composables-vs-utils | generation | composables | ⚪ already-known | 2/2 | 2/2 |
| keyed-v-for | generation | template-directives | ⚪ already-known | 4/4 | 4/4 |
| multi-word-component-names | generation | sfc-structure | ⚪ already-known | 2/2 | 2/2 |
| prefer-ref-over-reactive | generation | props | ⚪ already-known | 4/4 | 4/4 |
| scoped-styles | generation | styles | ⚪ already-known | 2/2 | 2/2 |
| template-on-the-top | generation | sfc-structure | ⚪ already-known | 4/4 | 4/4 |

## Recommendations

- **composables-cleanup-refactor** → use rule
- **composables-input-flexibility** → use rule
- **composables-thin-composables** → use rule
- **define-emits-with-typescript** → use rule
- **define-props-with-typescript** → use rule
- **destructure-props** → use rule
- **group-script-by-logical-concerns** → use rule
- **no-mutating-props** → use rule
- **no-side-effects-in-computed** → use rule
- **prefer-definemodel** → use rule
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
| clears-interval | ❌ pattern not found, expected present | ✅ pattern found, expected present |

🔵 **With-rule improved**: clears-interval

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

**Trial 1**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| uses-tovalue | ✅ pattern found, expected present | ✅ pattern found, expected present |
| flexible-input | ✅ pattern found, expected present | ❌ pattern not found, expected present |

🔴 **With-rule regressed**: flexible-input

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
| organized-by-concern | ✅ 1: PASS - state and functions are grouped by concern (profile, notification prefs, activity log) with comments marking each section | ✅ 1: PASS - profile, notification prefs, and activity log each grouped with their own state and functions, separated by comments |

⚪ **No difference** — all passed

**Trial 1**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| organized-by-concern | ✅ 1: PASS - state and functions are interleaved by concern (profile refs + fetchProfile, then notification refs + save, then activity refs + fetch) | ✅ 1: PASS - each sub-composable groups its own state and functions together (profile+isProfileLoading+loadProfile, notificationPreferences+isSavingPreferences+saveNotificationPreferences, activityLog+activityPage+isActivityLoading+loadActivityPage) |

⚪ **No difference** — all passed

### composables-progressive-extraction

**Trial 0**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| inline-or-colocated | ✅ 1: PASS - search logic is inline in `<script setup>` | ✅ 1: PASS - search logic is inline in `<script setup>` |

⚪ **No difference** — all passed

**Trial 1**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| inline-or-colocated | ✅ 1: PASS - search logic is inline in `<script setup>` | ✅ 1: PASS - search logic is inline in `<script setup>` |

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
| called-in-setup | ✅ 1: PASS - `useMouse()` and `useList()` are both called at the top level of `<script setup>`, not inside any callback or async context | ✅ 1: PASS - `useMouse()` and `useList()` are both called at the top level of `<script setup>`, not inside any callback or async context |

⚪ **No difference** — all passed

**Trial 1**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| called-in-setup | ✅ 1: PASS - `useMouse()` and `useList()` are both called at the top level of `<script setup>`, not inside any callback or async context | ✅ 1: PASS - `useMouse()` and `useItemList()` are both called at the top level of `<script setup>`, not inside any callback or async context. |

⚪ **No difference** — all passed

### composables-single-responsibility

**Trial 0**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| multiple-composables | ✅ pattern found, expected present | ✅ pattern found, expected present |
| split-concerns | ✅ 1: PASS - split into focused units: useCartItems (state/persistence), useCartApi (fetch/sync), useCartTotals (price calc), useCheckout (order flow) | ✅ 1: PASS - four focused composables each own one concern (items, totals, fetch, checkout) |

⚪ **No difference** — all passed

**Trial 1**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| multiple-composables | ✅ pattern found, expected present | ✅ pattern found, expected present |
| split-concerns | ✅ 1: PASS - split into focused units: useCartItems (state), useCartApi (fetch/sync), useCartTotals (calculations), useCheckout (checkout flow) | ✅ 1: PASS - cart items, totals, fetching, and checkout are each separate composables |

⚪ **No difference** — all passed

### composables-thin-composables

**Trial 0**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| pure-function-extracted | ❌ 1: FAIL - shipping cost calculation is inlined in `computed()` rather than extracted into a pure function | ✅ 1: PASS - `calculateShippingCost` is a pure function in `shippingCost.js`; composable only wires refs via `unref` in a thin `computed` |

🔵 **With-rule improved**: pure-function-extracted

**Trial 1**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| pure-function-extracted | ❌ 1: FAIL - business logic is inlined inside `computed()` rather than extracted into a separate pure function | ✅ 1: PASS - `calculateShippingCost` is a pure function in `shipping.ts`; the composable only wires refs to it via `unref`. |

🔵 **With-rule improved**: pure-function-extracted

### composables-vs-utils

**Trial 0**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| util-functions | ✅ 1: PASS - `formatCurrency`/`formatDate` are plain exported functions in `utils/format.js`; only `useWindowFocus` with reactive state is a composable. | ✅ 1: PASS - `formatCurrency` and `formatDate` are plain utility functions; only `useWindowFocus` is a composable |

⚪ **No difference** — all passed

**Trial 1**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| util-functions | ✅ 1: PASS - `formatCurrency` and `formatDate` are plain functions in `utils/`, while only `useWindowFocus` (which manages reactive state and lifecycle hooks) is a composable. | ✅ 1: PASS - `formatCurrency` and `formatDate` are plain functions; only `useWindowFocus` is a composable. |

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
| logical-grouping | ❌ 1: FAIL - script groups all refs together, then all computeds, then all functions, rather than grouping by concern (gallery, cart, reviews) | ❌ 1: FAIL - script groups all refs together, all computeds together, then all functions together, rather than grouping by concern (gallery, cart, reviews) |

⚪ **No difference** — all failed the same checks

**Trial 1**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| logical-grouping | ❌ 1: FAIL - script groups all refs together, then all computeds, then all functions, rather than grouping gallery/cart/reviews logic by concern | ✅ 1: PASS - code is organized into gallery, cart, and reviews concern blocks with comments separating them |

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
| multi-word-name | ✅ 1: PASS - component is named `ProfileCard` (multi-word, BEM class `.profile-card` confirms it) | ✅ 1: PASS - component name `UserProfileCard` is multi-word |

⚪ **No difference** — all passed

**Trial 1**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| multi-word-name | ✅ 1: PASS - component class name `profile-card` implies multi-word name `ProfileCard` | ✅ 1: PASS - component name `UserProfileCard` is multi-word |

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
| uses-emit-or-model | ❌ pattern not found, expected present | ✅ pattern found, expected present |
| no-direct-prop-mutation | ✅ pattern not found, expected absent | ✅ pattern not found, expected absent |

🔵 **With-rule improved**: uses-emit-or-model

### no-side-effects-in-computed

**Trial 0**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| no-ref-assignment-in-computed | ❌ 1: FAIL - `inStockProducts` computed assigns `lastFilteredCount.value = filtered.length` (side effect inside computed) | ✅ 1: PASS - computed only filters, side effect is in watch() |

🔵 **With-rule improved**: no-ref-assignment-in-computed

**Trial 1**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| no-ref-assignment-in-computed | ✅ 1: PASS - computed only filters, no `.value` assignment; the side effect is in `watchEffect` where it belongs | ✅ 1: PASS - computed only filters, no `.value` assignment; count is derived via a separate `watch()` |

⚪ **No difference** — all passed

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
| uses-shorthand | ❌ pattern not found, expected present | ❌ pattern not found, expected present |
| no-verbose | ❌ pattern found, expected absent | ❌ pattern found, expected absent |

⚪ **No difference** — all failed the same checks

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
