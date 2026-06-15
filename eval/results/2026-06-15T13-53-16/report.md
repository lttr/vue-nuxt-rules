# Eval Report

## Summary

- **Already Known**: 14
- **With Rule Better**: 16
- **No Improvement**: 0

## Results

| Name | Type | Category | Classification | Baseline | With Rule |
|------|------|----------|---------------|----------|-----------|
| composables-cleanup-refactor | refactor | misc | 🔵 with-rule-better | 3/4 | 4/4 |
| composables-organize-by-concern | generation | composables | 🔵 with-rule-better | 1/2 | 2/2 |
| composables-thin-composables | generation | composables | 🔵 with-rule-better | 1/2 | 2/2 |
| define-emits-with-typescript | generation | props | 🔵 with-rule-better | 0/4 | 4/4 |
| define-props-with-typescript | generation | props | 🔵 with-rule-better | 2/4 | 4/4 |
| destructure-props | generation | props | 🔵 with-rule-better | 2/4 | 4/4 |
| group-script-by-logical-concerns | generation | sfc-structure | 🔵 with-rule-better | 0/2 | 2/2 |
| no-mutating-props | generation | props-state | 🔵 with-rule-better | 2/4 | 4/4 |
| no-side-effects-in-computed | generation | props-state | 🔵 with-rule-better | 0/2 | 2/2 |
| prefer-ref-over-reactive-refactor | refactor | misc | 🔵 with-rule-better | 2/4 | 4/4 |
| prefer-vueuse-refactor | refactor | misc | 🔵 with-rule-better | 0/2 | 2/2 |
| prefer-vueuse | generation | composables | 🔵 with-rule-better | 0/4 | 4/4 |
| same-name-prop-shorthand | generation | props | 🔵 with-rule-better | 0/4 | 4/4 |
| script-setup-with-typescript | generation | sfc-structure | 🔵 with-rule-better | 2/4 | 4/4 |
| template-on-the-top | generation | sfc-structure | 🔵 with-rule-better | 0/4 | 4/4 |
| use-of-instead-of-in-for-v-for | generation | template-directives | 🔵 with-rule-better | 0/4 | 4/4 |
| composables-async-patterns | generation | composables | ⚪ already-known | 8/8 | 8/8 |
| composables-cleanup | generation | composables | ⚪ already-known | 4/4 | 4/4 |
| composables-input-flexibility | generation | composables | ⚪ already-known | 4/4 | 4/4 |
| composables-naming | generation | composables | ⚪ already-known | 4/4 | 4/4 |
| composables-progressive-extraction | generation | composables | ⚪ already-known | 2/2 | 2/2 |
| composables-return-refs | generation | composables | ⚪ already-known | 6/6 | 6/6 |
| composables-setup-context | generation | composables | ⚪ already-known | 2/2 | 2/2 |
| composables-single-responsibility | generation | composables | ⚪ already-known | 4/4 | 4/4 |
| composables-vs-utils | generation | composables | ⚪ already-known | 2/2 | 2/2 |
| keyed-v-for | generation | template-directives | ⚪ already-known | 4/4 | 4/4 |
| multi-word-component-names | generation | sfc-structure | ⚪ already-known | 2/2 | 2/2 |
| prefer-definemodel | generation | props | ⚪ already-known | 4/4 | 4/4 |
| prefer-ref-over-reactive | generation | props | ⚪ already-known | 4/4 | 3/4 |
| scoped-styles | generation | styles | ⚪ already-known | 2/2 | 2/2 |

## Recommendations

- **composables-cleanup-refactor** → use rule
- **composables-organize-by-concern** → use rule
- **composables-thin-composables** → use rule
- **define-emits-with-typescript** → use rule
- **define-props-with-typescript** → use rule
- **destructure-props** → use rule
- **group-script-by-logical-concerns** → use rule
- **no-mutating-props** → use rule
- **no-side-effects-in-computed** → use rule
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
| uses-tovalue | ✅ pattern found, expected present | ✅ pattern found, expected present |
| flexible-input | ✅ pattern found, expected present | ✅ pattern found, expected present |

⚪ **No difference** — all passed

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

### composables-organize-by-concern

**Trial 0**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| organized-by-concern | ✅ 1: PASS - state and methods for each concern (profile, preferences, activity log) are grouped together in clearly separated sections | ✅ 1: PASS - profile state/logic, notification state/logic, and activity state/logic are each grouped together under their own section comments |

⚪ **No difference** — all passed

**Trial 1**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| organized-by-concern | ❌ 1: FAIL - state variables are grouped by type (all refs/reactives together under a single "State" block) rather than by concern (profile refs, then notification refs, then activity refs in separate groups) | ✅ 1: PASS - profile state/logic, preferences state/logic, and activity state/logic are each grouped together with comments marking the concern boundaries |

🔵 **With-rule improved**: organized-by-concern

### composables-progressive-extraction

**Trial 0**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| inline-or-colocated | ✅ 1: PASS - search logic is inline in `<script setup>` | ✅ 1: PASS - search logic is inline in `<script setup>`, not extracted to a shared composables/ directory |

⚪ **No difference** — all passed

**Trial 1**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| inline-or-colocated | ✅ 1: PASS - search logic is inline in `<script setup>` | ✅ 1: PASS - search logic is defined inline inside `<script setup>` as a local `useSearch` function |

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
| called-in-setup | ✅ 1: PASS - both `useMouse()` and `useItemList()` are called at the top level of `<script setup>`, not inside any callback or async context | ✅ 1: PASS - both `useMousePosition()` and `useItemList()` are called at the top level of `<script setup>`, not inside callbacks or async contexts |

⚪ **No difference** — all passed

**Trial 1**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| called-in-setup | ✅ 1: PASS - both `useMouse()` and `useItems()` are called at the top level of `<script setup>`, not inside any callbacks or after awaits | ✅ 1: PASS - both `useMouse()` and `useItemList()` are called at the top level of `<script setup>`, not inside any callback or async context |

⚪ **No difference** — all passed

### composables-single-responsibility

**Trial 0**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| multiple-composables | ✅ pattern found, expected present | ✅ pattern found, expected present |
| split-concerns | ✅ 1: PASS - composables are split into focused units: useCartItems (item state), useCartApi (HTTP), useCartTotals (monetary calculations), useCheckout (checkout lifecycle), with useCart as a thin coordinator | ✅ 1: PASS - cart logic is split into five focused composables: useCartState (shared state), useCartItems (mutations), useCartTotals (derived values), useFetchCart (API load), useCheckout (API submit) |

⚪ **No difference** — all passed

**Trial 1**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| multiple-composables | ✅ pattern found, expected present | ✅ pattern found, expected present |
| split-concerns | ✅ 1: PASS - cart items (useCart), API sync (useCartApi), pricing (useCartTotals), and checkout flow (useCheckout) are each separate focused composables | ✅ 1: PASS - state, items, fetch, totals, and checkout are each in dedicated composables with no cross-concern mixing |

⚪ **No difference** — all passed

### composables-thin-composables

**Trial 0**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| pure-function-extracted | ❌ 1: FAIL - business logic (rate lookup, free shipping threshold, weight clamping) is inlined directly in the `computed()` callbacks rather than extracted into a separate pure function | ✅ 1: PASS - business logic is in `calculateShippingCost` pure function; composable only wires reactivity via `toValue` and `computed` |

🔵 **With-rule improved**: pure-function-extracted

**Trial 1**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| pure-function-extracted | ✅ 1: PASS - `calculateShippingCost` is a separate exported pure function; the composable only wraps it with `computed(() => calculateShippingCost(...unref(...)))`. | ✅ 1: PASS - `calculateShippingCost` is a pure function in a separate utility file; the composable only wires reactive inputs to it via `toValue` inside `computed` |

⚪ **No difference** — all passed

### composables-vs-utils

**Trial 0**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| util-functions | ✅ 1: PASS - `formatCurrency` and `formatDate` are plain functions in `src/utils/format.js`; only the stateful window focus tracking is a composable in `useWindowFocus.js` | ✅ 1: PASS - `formatCurrency` and `formatDate` are plain utility functions; only `useWindowFocus` (which needs reactive state and lifecycle hooks) is a composable. |

⚪ **No difference** — all passed

**Trial 1**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| util-functions | ✅ 1: PASS - `formatCurrency` and `formatDate` are plain utility functions; only `useWindowFocus` is a composable. | ✅ 1: PASS - `formatCurrency` and `formatDate` are plain exported functions in `utils/format.js`; only `useWindowFocus` (which owns reactive state and lifecycle hooks) is a composable. |

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
| logical-grouping | ❌ 1: FAIL - code is grouped by API type (all refs together, all computed together, all functions together) rather than by concern (gallery, cart, reviews) | ✅ 1: PASS - script groups refs, computed, and functions by concern (gallery, cart, reviews) with section comments separating each |

🔵 **With-rule improved**: logical-grouping

**Trial 1**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| logical-grouping | ❌ 1: FAIL - code is grouped by API type (all refs together, all computed together, all functions together) rather than by concern (gallery, cart, reviews) | ✅ 1: PASS - script is organized into three clearly delimited concern blocks (image gallery, add to cart + quantity, reviews) rather than grouping all refs or all computed properties together |

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
| multi-word-name | ✅ 1: PASS - component is named `profile-card` (ProfileCard) throughout, a multi-word name | ✅ 1: PASS - component is named `UserProfileCard` (multi-word) |

⚪ **No difference** — all passed

**Trial 1**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| multi-word-name | ✅ 1: PASS - component is named `profile-card` (multi-word) throughout the template and styles | ✅ 1: PASS - component is named `user-profile-card` (multi-word) |

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
| no-ref-assignment-in-computed | ❌ 1: FAIL - `inStockProducts` computed assigns to `lastFilteredCount.value` inside the getter, which is a side effect | ✅ 1: PASS - `inStockProducts` computed is pure; the `lastFilteredCount.value` assignment is in a `watch`, not in the computed. |

🔵 **With-rule improved**: no-ref-assignment-in-computed

**Trial 1**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| no-ref-assignment-in-computed | ❌ 1: FAIL - `inStockProducts` computed assigns to `lastFilteredCount.value` inside the computed body | ✅ 1: PASS - computed only filters, side effect is in watch() |

🔵 **With-rule improved**: no-ref-assignment-in-computed

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
| converted-to-ref | ❌ pattern not found, expected present | ✅ pattern found, expected present |
| no-reactive | ✅ pattern not found, expected absent | ✅ pattern not found, expected absent |

🔵 **With-rule improved**: converted-to-ref

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
| no-reactive | ✅ pattern not found, expected absent | ❌ pattern found, expected absent |

🔴 **With-rule regressed**: no-reactive

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
| script-after-template | ❌ pattern not found, expected present | ✅ pattern found, expected present |

🔵 **With-rule improved**: template-first, script-after-template

**Trial 1**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| template-first | ❌ pattern not found, expected present | ✅ pattern found, expected present |
| script-after-template | ❌ pattern not found, expected present | ✅ pattern found, expected present |

🔵 **With-rule improved**: template-first, script-after-template

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
