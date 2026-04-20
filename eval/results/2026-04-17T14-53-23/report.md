# Eval Report

## Summary

- **Already Known**: 6
- **With Rule Better**: 19
- **No Improvement**: 5

## Results

| Name | Type | Category | Classification | Baseline | With Rule |
|------|------|----------|---------------|----------|-----------|
| composables-async-patterns | generation | composables | 🔵 with-rule-better | 0/4 | 4/4 |
| composables-cleanup-refactor | refactor | misc | 🔵 with-rule-better | 0/2 | 2/2 |
| composables-cleanup | generation | composables | 🔵 with-rule-better | 0/2 | 2/2 |
| composables-naming | generation | composables | 🔵 with-rule-better | 0/2 | 2/2 |
| composables-organize-by-concern | generation | composables | 🔵 with-rule-better | 0/1 | 1/1 |
| composables-return-refs | generation | composables | 🔵 with-rule-better | 1/3 | 3/3 |
| composables-single-responsibility | generation | composables | 🔵 with-rule-better | 0/2 | 2/2 |
| composables-thin-composables | generation | composables | 🔵 with-rule-better | 0/1 | 1/1 |
| define-emits-with-typescript | generation | props | 🔵 with-rule-better | 0/2 | 2/2 |
| define-props-with-typescript | generation | props | 🔵 with-rule-better | 1/2 | 2/2 |
| destructure-props | generation | props | 🔵 with-rule-better | 1/2 | 2/2 |
| group-script-by-logical-concerns | generation | sfc-structure | 🔵 with-rule-better | 0/1 | 1/1 |
| keyed-v-for | generation | template-directives | 🔵 with-rule-better | 0/2 | 2/2 |
| multi-word-component-names | generation | sfc-structure | 🔵 with-rule-better | 0/1 | 1/1 |
| no-side-effects-in-computed ⚠️ | generation | props-state | 🔵 with-rule-better | 0/2 | 1/2 |
| prefer-definemodel | generation | props | 🔵 with-rule-better | 0/2 | 2/2 |
| prefer-ref-over-reactive | generation | props | 🔵 with-rule-better | 1/2 | 2/2 |
| prefer-vueuse-refactor | refactor | misc | 🔵 with-rule-better | 0/1 | 1/1 |
| prefer-vueuse | generation | composables | 🔵 with-rule-better | 0/2 | 2/2 |
| same-name-prop-shorthand | generation | props | 🔴 no-improvement | 1/2 | 1/2 |
| scoped-styles | generation | styles | 🔴 no-improvement | 0/1 | 0/1 |
| script-setup-with-typescript | generation | sfc-structure | 🔴 no-improvement | 1/2 | 1/2 |
| template-on-the-top | generation | sfc-structure | 🔴 no-improvement | 0/2 | 0/2 |
| use-of-instead-of-in-for-v-for | generation | template-directives | 🔴 no-improvement | 1/2 | 1/2 |
| composables-input-flexibility | generation | composables | ⚪ already-known | 2/2 | 2/2 |
| composables-progressive-extraction | generation | composables | ⚪ already-known | 1/1 | 1/1 |
| composables-setup-context | generation | composables | ⚪ already-known | 1/1 | 1/1 |
| composables-vs-utils | generation | composables | ⚪ already-known | 1/1 | 1/1 |
| no-mutating-props | generation | props-state | ⚪ already-known | 2/2 | 2/2 |
| prefer-ref-over-reactive-refactor | refactor | misc | ⚪ already-known | 2/2 | 2/2 |

## Recommendations

- **composables-async-patterns** → use rule
- **composables-cleanup-refactor** → use rule
- **composables-cleanup** → use rule
- **composables-naming** → use rule
- **composables-organize-by-concern** → use rule
- **composables-return-refs** → use rule
- **composables-single-responsibility** → use rule
- **composables-thin-composables** → use rule
- **define-emits-with-typescript** → use rule
- **define-props-with-typescript** → use rule
- **destructure-props** → use rule
- **group-script-by-logical-concerns** → use rule
- **keyed-v-for** → use rule
- **multi-word-component-names** → use rule
- **no-side-effects-in-computed** → use rule
- **prefer-definemodel** → use rule
- **prefer-ref-over-reactive** → use rule
- **prefer-vueuse-refactor** → use rule
- **prefer-vueuse** → use rule

## Details

### composables-async-patterns

**Trial 0**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| loading-ref | ❌ pattern not found, expected present | ✅ pattern found, expected present |
| error-ref | ❌ pattern not found, expected present | ✅ pattern found, expected present |
| returns-loading | ❌ pattern not found, expected present | ✅ pattern found, expected present |
| returns-error | ❌ pattern not found, expected present | ✅ pattern found, expected present |

🔵 **With-rule improved**: loading-ref, error-ref, returns-loading, returns-error

### composables-cleanup-refactor

**Trial 0**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| has-cleanup | ❌ pattern not found, expected present | ✅ pattern found, expected present |
| clears-interval | ❌ pattern not found, expected present | ✅ pattern found, expected present |

🔵 **With-rule improved**: has-cleanup, clears-interval

### composables-cleanup

**Trial 0**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| has-cleanup | ❌ pattern not found, expected present | ✅ pattern found, expected present |
| removes-listener | ❌ pattern not found, expected present | ✅ pattern found, expected present |

🔵 **With-rule improved**: has-cleanup, removes-listener

### composables-input-flexibility

**Trial 0**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| uses-tovalue | ✅ pattern found, expected present | ✅ pattern found, expected present |
| flexible-input | ✅ pattern found, expected present | ✅ pattern found, expected present |

⚪ **No difference** — all passed

### composables-naming

**Trial 0**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| use-prefix | ❌ pattern not found, expected present | ✅ pattern found, expected present |
| returns-refs | ❌ pattern not found, expected present | ✅ pattern found, expected present |

🔵 **With-rule improved**: use-prefix, returns-refs

### composables-organize-by-concern

**Trial 0**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| organized-by-concern | ❌ 1: FAIL - refs grouped by type at top, not interleaved with related functions by concern | ✅ 1: PASS - profile, notification, activity each grouped with their state and functions |

🔵 **With-rule improved**: organized-by-concern

### composables-progressive-extraction

**Trial 0**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| inline-or-colocated | ✅ 1: PASS - no code to extract; empty input is inline by default | ✅ 1: PASS - search logic inline in script setup |

⚪ **No difference** — all passed

### composables-return-refs

**Trial 0**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| returns-plain-object | ❌ pattern not found, expected present | ✅ pattern found, expected present |
| uses-ref-not-reactive | ❌ pattern not found, expected present | ✅ pattern found, expected present |
| no-reactive-return | ✅ pattern not found, expected absent | ✅ pattern not found, expected absent |

🔵 **With-rule improved**: returns-plain-object, uses-ref-not-reactive

### composables-setup-context

**Trial 0**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| called-in-setup | ✅ 1: PASS - no composable calls present in empty code | ✅ 1: PASS - `useMouse()` and `useItems()` called at top level of `<script setup>` |

⚪ **No difference** — all passed

### composables-single-responsibility

**Trial 0**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| multiple-composables | ❌ pattern not found, expected present | ✅ pattern found, expected present |
| split-concerns | ❌ 1: FAIL - no code provided to evaluate | ✅ 1: PASS - six focused composables each own one concern (state, fetch, add, remove, totals, checkout) |

🔵 **With-rule improved**: multiple-composables, split-concerns

### composables-thin-composables

**Trial 0**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| pure-function-extracted | ❌ 1: FAIL - shipping calc inlined in computed, no separate pure function | ✅ 1: PASS - `calculateShippingCost` pure function in `shipping.js`, composable just wires refs via `toValue` |

🔵 **With-rule improved**: pure-function-extracted

### composables-vs-utils

**Trial 0**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| util-functions | ✅ 1: PASS - `formatCurrency`/`formatDate` plain functions, only `useWindowFocus` composable | ✅ 1: PASS - `formatCurrency`/`formatDate` plain utility functions, only stateful `useWindowFocus` is composable |

⚪ **No difference** — all passed

### define-emits-with-typescript

**Trial 0**

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

### destructure-props

**Trial 0**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| destructured-defineprops | ❌ pattern not found, expected present | ✅ pattern found, expected present |
| no-withdefaults | ✅ pattern not found, expected absent | ✅ pattern not found, expected absent |

🔵 **With-rule improved**: destructured-defineprops

### group-script-by-logical-concerns

**Trial 0**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| logical-grouping | ❌ 1: FAIL - grouped by API type (all refs, all computed, all methods in separate blocks) | ✅ 1: PASS - script groups by concern: image gallery, quantity/cart, reviews each have refs/computed/functions together |

🔵 **With-rule improved**: logical-grouping

### keyed-v-for

**Trial 0**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| has-key | ❌ pattern not found, expected present | ✅ pattern found, expected present |
| key-uses-id | ❌ pattern not found, expected present | ✅ pattern found, expected present |

🔵 **With-rule improved**: has-key, key-uses-id

### multi-word-component-names

**Trial 0**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| multi-word-name | ❌ 1: FAIL - no component name or filename provided to evaluate | ✅ 1: PASS - component named `UserProfileCard` (multi-word) |

🔵 **With-rule improved**: multi-word-name

### no-mutating-props

**Trial 0**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| uses-emit-or-model | ✅ pattern found, expected present | ✅ pattern found, expected present |
| no-direct-prop-mutation | ✅ pattern not found, expected absent | ✅ pattern not found, expected absent |

⚪ **No difference** — all passed

### no-side-effects-in-computed

**Trial 0**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| no-ref-assignment-in-computed | ❌ 1: FAIL - `inStockProducts` computed assigns `lastFilteredCount.value = filtered.length` (side effect in computed) | ✅ 1: PASS - no code to evaluate, empty submission |

🔵 **With-rule improved**: no-ref-assignment-in-computed

**Trial 1**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| no-ref-assignment-in-computed | ❌ AI judge error: claude exited 1:  | ❌ AI judge error: claude exited 1:  |

⚪ **No difference** — all failed the same checks

### prefer-definemodel

**Trial 0**

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

### prefer-ref-over-reactive

**Trial 0**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| uses-ref | ❌ pattern not found, expected present | ✅ pattern found, expected present |
| no-reactive | ✅ pattern not found, expected absent | ✅ pattern not found, expected absent |

🔵 **With-rule improved**: uses-ref

### prefer-vueuse-refactor

**Trial 0**

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

### same-name-prop-shorthand

**Trial 0**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| uses-shorthand | ❌ pattern not found, expected present | ❌ pattern not found, expected present |
| no-verbose | ✅ pattern not found, expected absent | ✅ pattern not found, expected absent |

⚪ **No difference** — all failed the same checks

### scoped-styles

**Trial 0**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| has-scoped-styles | ❌ pattern not found, expected present | ❌ pattern not found, expected present |

⚪ **No difference** — all failed the same checks

### script-setup-with-typescript

**Trial 0**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| script-setup-ts | ❌ pattern not found, expected present | ❌ pattern not found, expected present |
| no-options-api | ✅ pattern not found, expected absent | ✅ pattern not found, expected absent |

⚪ **No difference** — all failed the same checks

### template-on-the-top

**Trial 0**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| template-first | ❌ pattern not found, expected present | ❌ pattern not found, expected present |
| script-after-template | ❌ pattern not found, expected present | ❌ pattern not found, expected present |

⚪ **No difference** — all failed the same checks

### use-of-instead-of-in-for-v-for

**Trial 0**

| Check | Baseline | With Rule |
|-------|----------|-----------|
| uses-of | ❌ pattern not found, expected present | ❌ pattern not found, expected present |
| no-in | ✅ pattern not found, expected absent | ✅ pattern not found, expected absent |

⚪ **No difference** — all failed the same checks
