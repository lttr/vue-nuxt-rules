# Eval Report

## Summary

- **Already Known**: 13
- **Full Better**: 1
- **Extracted Better**: 1
- **Both Help**: 10
- **No Improvement**: 0

## Results

| Rule | Category | Classification | Baseline | Full | Extracted |
|------|----------|---------------|----------|------|-----------|
| composables-thin-composables.md | composables | 🟢 full-better | 0/3 | 3/3 | 2/3 |
| multi-word-component-names.md | sfc-structure | 🔵 extracted-better | 1/3 | 2/3 | 3/3 |
| composables-vs-utils.md | composables | 🟡 both-help | 0/3 | 3/3 | 3/3 |
| define-emits-with-typescript.md | props | 🟡 both-help | 0/6 | 6/6 | 6/6 |
| define-props-with-typescript.md | props | 🟡 both-help | 3/6 | 6/6 | 6/6 |
| destructure-props.md | props | 🟡 both-help | 3/6 | 6/6 | 6/6 |
| group-script-by-logical-concerns.md | sfc-structure | 🟡 both-help | 0/3 | 3/3 | 3/3 |
| prefer-definemodel.md | props | 🟡 both-help | 4/6 | 6/6 | 6/6 |
| prefer-vueuse.md | composables | 🟡 both-help | 0/6 | 6/6 | 6/6 |
| same-name-prop-shorthand.md | props | 🟡 both-help | 0/6 | 6/6 | 6/6 |
| script-setup-with-typescript.md | sfc-structure | 🟡 both-help | 3/6 | 6/6 | 6/6 |
| use-of-instead-of-in-for-v-for.md | template-directives | 🟡 both-help | 0/6 | 6/6 | 6/6 |
| composables-async-patterns.md | composables | ⚪ already-known | 12/12 | 12/12 | 12/12 |
| composables-cleanup.md | composables | ⚪ already-known | 6/6 | 6/6 | 6/6 |
| composables-input-flexibility.md | composables | ⚪ already-known | 6/6 | 6/6 | 6/6 |
| composables-naming.md | composables | ⚪ already-known | 6/6 | 6/6 | 6/6 |
| composables-organize-by-concern.md | composables | ⚪ already-known | 3/3 | 3/3 | 2/3 |
| composables-progressive-extraction.md | composables | ⚪ already-known | 3/3 | 3/3 | 3/3 |
| composables-return-refs.md | composables | ⚪ already-known | 9/9 | 9/9 | 9/9 |
| composables-setup-context.md | composables | ⚪ already-known | 3/3 | 3/3 | 3/3 |
| composables-single-responsibility.md | composables | ⚪ already-known | 6/6 | 6/6 | 6/6 |
| keyed-v-for.md | template-directives | ⚪ already-known | 6/6 | 6/6 | 6/6 |
| prefer-ref-over-reactive.md | props | ⚪ already-known | 6/6 | 6/6 | 6/6 |
| scoped-styles.md | styles | ⚪ already-known | 3/3 | 3/3 | 3/3 |
| template-on-the-top.md | sfc-structure | ⚪ already-known | 6/6 | 6/6 | 6/6 |

## Recommendations

- **composables-thin-composables.md** → use **full**
- **multi-word-component-names.md** → use **extracted**
- **composables-vs-utils.md** → use **extracted**
- **define-emits-with-typescript.md** → use **extracted**
- **define-props-with-typescript.md** → use **extracted**
- **destructure-props.md** → use **extracted**
- **group-script-by-logical-concerns.md** → use **extracted**
- **prefer-definemodel.md** → use **extracted**
- **prefer-vueuse.md** → use **extracted**
- **same-name-prop-shorthand.md** → use **extracted**
- **script-setup-with-typescript.md** → use **extracted**
- **use-of-instead-of-in-for-v-for.md** → use **extracted**

## Details

### composables-async-patterns.md

**Trial 0**

| Check | Baseline | Full | Extracted |
|-------|----------|------|-----------|
| loading-ref | ✅ pattern found, expected present | ✅ pattern found, expected present | ✅ pattern found, expected present |
| error-ref | ✅ pattern found, expected present | ✅ pattern found, expected present | ✅ pattern found, expected present |
| returns-loading | ✅ pattern found, expected present | ✅ pattern found, expected present | ✅ pattern found, expected present |
| returns-error | ✅ pattern found, expected present | ✅ pattern found, expected present | ✅ pattern found, expected present |

⚪ **No difference** — all passed

**Trial 1**

| Check | Baseline | Full | Extracted |
|-------|----------|------|-----------|
| loading-ref | ✅ pattern found, expected present | ✅ pattern found, expected present | ✅ pattern found, expected present |
| error-ref | ✅ pattern found, expected present | ✅ pattern found, expected present | ✅ pattern found, expected present |
| returns-loading | ✅ pattern found, expected present | ✅ pattern found, expected present | ✅ pattern found, expected present |
| returns-error | ✅ pattern found, expected present | ✅ pattern found, expected present | ✅ pattern found, expected present |

⚪ **No difference** — all passed

**Trial 2**

| Check | Baseline | Full | Extracted |
|-------|----------|------|-----------|
| loading-ref | ✅ pattern found, expected present | ✅ pattern found, expected present | ✅ pattern found, expected present |
| error-ref | ✅ pattern found, expected present | ✅ pattern found, expected present | ✅ pattern found, expected present |
| returns-loading | ✅ pattern found, expected present | ✅ pattern found, expected present | ✅ pattern found, expected present |
| returns-error | ✅ pattern found, expected present | ✅ pattern found, expected present | ✅ pattern found, expected present |

⚪ **No difference** — all passed

### composables-cleanup.md

**Trial 0**

| Check | Baseline | Full | Extracted |
|-------|----------|------|-----------|
| has-cleanup | ✅ pattern found, expected present | ✅ pattern found, expected present | ✅ pattern found, expected present |
| removes-listener | ✅ pattern found, expected present | ✅ pattern found, expected present | ✅ pattern found, expected present |

⚪ **No difference** — all passed

**Trial 1**

| Check | Baseline | Full | Extracted |
|-------|----------|------|-----------|
| has-cleanup | ✅ pattern found, expected present | ✅ pattern found, expected present | ✅ pattern found, expected present |
| removes-listener | ✅ pattern found, expected present | ✅ pattern found, expected present | ✅ pattern found, expected present |

⚪ **No difference** — all passed

**Trial 2**

| Check | Baseline | Full | Extracted |
|-------|----------|------|-----------|
| has-cleanup | ✅ pattern found, expected present | ✅ pattern found, expected present | ✅ pattern found, expected present |
| removes-listener | ✅ pattern found, expected present | ✅ pattern found, expected present | ✅ pattern found, expected present |

⚪ **No difference** — all passed

### composables-input-flexibility.md

**Trial 0**

| Check | Baseline | Full | Extracted |
|-------|----------|------|-----------|
| uses-tovalue | ✅ pattern found, expected present | ✅ pattern found, expected present | ✅ pattern found, expected present |
| flexible-input | ✅ pattern found, expected present | ✅ pattern found, expected present | ✅ pattern found, expected present |

⚪ **No difference** — all passed

**Trial 1**

| Check | Baseline | Full | Extracted |
|-------|----------|------|-----------|
| uses-tovalue | ✅ pattern found, expected present | ✅ pattern found, expected present | ✅ pattern found, expected present |
| flexible-input | ✅ pattern found, expected present | ✅ pattern found, expected present | ✅ pattern found, expected present |

⚪ **No difference** — all passed

**Trial 2**

| Check | Baseline | Full | Extracted |
|-------|----------|------|-----------|
| uses-tovalue | ✅ pattern found, expected present | ✅ pattern found, expected present | ✅ pattern found, expected present |
| flexible-input | ✅ pattern found, expected present | ✅ pattern found, expected present | ✅ pattern found, expected present |

⚪ **No difference** — all passed

### composables-naming.md

**Trial 0**

| Check | Baseline | Full | Extracted |
|-------|----------|------|-----------|
| use-prefix | ✅ pattern found, expected present | ✅ pattern found, expected present | ✅ pattern found, expected present |
| returns-refs | ✅ pattern found, expected present | ✅ pattern found, expected present | ✅ pattern found, expected present |

⚪ **No difference** — all passed

**Trial 1**

| Check | Baseline | Full | Extracted |
|-------|----------|------|-----------|
| use-prefix | ✅ pattern found, expected present | ✅ pattern found, expected present | ✅ pattern found, expected present |
| returns-refs | ✅ pattern found, expected present | ✅ pattern found, expected present | ✅ pattern found, expected present |

⚪ **No difference** — all passed

**Trial 2**

| Check | Baseline | Full | Extracted |
|-------|----------|------|-----------|
| use-prefix | ✅ pattern found, expected present | ✅ pattern found, expected present | ✅ pattern found, expected present |
| returns-refs | ✅ pattern found, expected present | ✅ pattern found, expected present | ✅ pattern found, expected present |

⚪ **No difference** — all passed

### composables-organize-by-concern.md

**Trial 0**

| Check | Baseline | Full | Extracted |
|-------|----------|------|-----------|
| organized-by-concern | ✅ PASS - Code groups profile (data + loading + error), notification preferences (data + saving), and activity log (data + pagination + loading) by logical concern rather than grouping all refs/reactives/functions together. | ✅ PASS - Code is clearly organized by logical concerns with explicit comments separating profile, notifications, and activity sections, grouping related state and functions together. | ✅ PASS - Code is well-organized by logical concerns with clear sections for profile data management, notifications handling, and activity log with pagination, rather than grouping all refs or functions together. |

⚪ **No difference** — all passed

**Trial 1**

| Check | Baseline | Full | Extracted |
|-------|----------|------|-----------|
| organized-by-concern | ✅ PASS - Code is organized by logical concern with profile, notification preferences, and activity log sections each grouping related state, computed properties, and methods together. | ✅ PASS - Code is clearly organized by logical concerns with comments separating user profile, notification preferences, and activity log sections, keeping related state and functions grouped together. | ❌ FAIL - Code is grouped by API type (all state refs together, all computed together, all methods together) rather than by logical concern (profile data + loading + fetch together, notifications + save together, activity + pagination together). |

🔴 **Extracted regressed**: organized-by-concern

**Trial 2**

| Check | Baseline | Full | Extracted |
|-------|----------|------|-----------|
| organized-by-concern | ✅ PASS - Code groups related state and functionality by logical concern (profile, notifications, activity) with clear section comments, rather than grouping by API type. | ✅ PASS - Code is clearly organized by logical concerns with profile, notifications, and activity sections each containing related state and functions together. | ✅ PASS - Code is organized by logical concern with clear sections (State, Metadata, Methods) and related functionality grouped together (profile with loading state, notifications with preferences, activity with pagination). |

⚪ **No difference** — all passed

### composables-progressive-extraction.md

**Trial 0**

| Check | Baseline | Full | Extracted |
|-------|----------|------|-----------|
| inline-or-colocated | ✅ PASS - Search logic is kept inline within the component's script setup block, not extracted to composables. | ✅ PASS - Search logic is kept inline within the component's script setup block, not extracted to a shared composables directory. | ✅ PASS - Search logic is kept inline within the component's script setup block, not extracted to a shared composables directory. |

⚪ **No difference** — all passed

**Trial 1**

| Check | Baseline | Full | Extracted |
|-------|----------|------|-----------|
| inline-or-colocated | ✅ PASS - Search logic is inline in script setup, not extracted to shared composables directory. | ✅ PASS - Search logic is kept inline within the component's script setup rather than being extracted to a shared composable. | ✅ PASS - Search logic is kept inline within the component's script setup block, not extracted to composables. |

⚪ **No difference** — all passed

**Trial 2**

| Check | Baseline | Full | Extracted |
|-------|----------|------|-----------|
| inline-or-colocated | ✅ PASS - Search logic is inline in the component's script setup, not extracted to shared composables. | ✅ PASS - Search logic is kept inline within the component's script setup section, not extracted to a shared composables directory. | ✅ PASS - Search logic is kept inline within the component's script setup block, not extracted to shared composables. |

⚪ **No difference** — all passed

### composables-return-refs.md

**Trial 0**

| Check | Baseline | Full | Extracted |
|-------|----------|------|-----------|
| returns-plain-object | ✅ pattern found, expected present | ✅ pattern found, expected present | ✅ pattern found, expected present |
| uses-ref-not-reactive | ✅ pattern found, expected present | ✅ pattern found, expected present | ✅ pattern found, expected present |
| no-reactive-return | ✅ pattern not found, expected absent | ✅ pattern not found, expected absent | ✅ pattern not found, expected absent |

⚪ **No difference** — all passed

**Trial 1**

| Check | Baseline | Full | Extracted |
|-------|----------|------|-----------|
| returns-plain-object | ✅ pattern found, expected present | ✅ pattern found, expected present | ✅ pattern found, expected present |
| uses-ref-not-reactive | ✅ pattern found, expected present | ✅ pattern found, expected present | ✅ pattern found, expected present |
| no-reactive-return | ✅ pattern not found, expected absent | ✅ pattern not found, expected absent | ✅ pattern not found, expected absent |

⚪ **No difference** — all passed

**Trial 2**

| Check | Baseline | Full | Extracted |
|-------|----------|------|-----------|
| returns-plain-object | ✅ pattern found, expected present | ✅ pattern found, expected present | ✅ pattern found, expected present |
| uses-ref-not-reactive | ✅ pattern found, expected present | ✅ pattern found, expected present | ✅ pattern found, expected present |
| no-reactive-return | ✅ pattern not found, expected absent | ✅ pattern not found, expected absent | ✅ pattern not found, expected absent |

⚪ **No difference** — all passed

### composables-setup-context.md

**Trial 0**

| Check | Baseline | Full | Extracted |
|-------|----------|------|-----------|
| called-in-setup | ✅ PASS - All composable calls (useMousePosition, useItemList) are at top level of <script setup>, not inside callbacks or async contexts. | ✅ PASS - All composable calls (useMouse, useItemList) are made directly at the top level of <script setup> before any other logic. | ✅ PASS - All composable calls (`useMousePosition()` and `useItemList()`) are made directly at the top level of `<script setup>`, not inside callbacks, promises, or after await statements. |

⚪ **No difference** — all passed

**Trial 1**

| Check | Baseline | Full | Extracted |
|-------|----------|------|-----------|
| called-in-setup | ✅ PASS - All composable calls (useMousePosition, useItemList) are made directly at the top level of <script setup>, not inside callbacks or after await statements. | ✅ PASS - All composable calls (useMouse, useItemList) are at the top level of <script setup>, not inside callbacks or after await. | ✅ PASS - All composable calls (useMousePosition, useItemList) are at the top level of <script setup>, before any other logic or event handlers. |

⚪ **No difference** — all passed

**Trial 2**

| Check | Baseline | Full | Extracted |
|-------|----------|------|-----------|
| called-in-setup | ✅ PASS - All composable calls (useMousePosition, useItemList) are made directly at the top level of <script setup>, not inside callbacks or conditional blocks. | ✅ PASS - All composable calls (useMouse, useItemList) are made directly at the top level of <script setup>, not inside any callbacks, promises, or after await statements. | ✅ PASS - All composable calls (useMousePosition, useItemList) are at the top level of <script setup>, not inside callbacks or conditional blocks. |

⚪ **No difference** — all passed

### composables-single-responsibility.md

**Trial 0**

| Check | Baseline | Full | Extracted |
|-------|----------|------|-----------|
| multiple-composables | ✅ pattern found, expected present | ✅ pattern found, expected present | ✅ pattern found, expected present |
| split-concerns | ✅ PASS - Code is properly split into focused composables: useCartItems (state management), useCartApi (HTTP operations), useCartTotals (calculations), useCheckout (checkout flow), with useCart as a clean orchestration layer. | ✅ PASS - Code is properly split into focused composables: useCartItems (state management), useCartFetch (API operations), useCartTotals (calculations), and useCheckout (checkout logic), each with single responsibility. | ✅ PASS - Code splits cart functionality into focused composables: useCartItems (item management), useFetchCart (data fetching), useCartTotals (calculations), and useCheckout (order processing), with useCart serving as a clean composition layer. |

⚪ **No difference** — all passed

**Trial 1**

| Check | Baseline | Full | Extracted |
|-------|----------|------|-----------|
| multiple-composables | ✅ pattern found, expected present | ✅ pattern found, expected present | ✅ pattern found, expected present |
| split-concerns | ✅ PASS - Code is properly split into 5 focused composables: useCartItems (state), useCartApi (HTTP), useCartTotals (calculations), useCheckout (checkout flow), with useCart as coordinator. | ✅ PASS - Code is well-split into focused composables: useCartItems (state management), useCartFetch (API operations), useCartTotals (calculations), and useCheckout (checkout process), each with single responsibility. | ✅ PASS - composables are well-separated into focused units: useFetchCart (API operations), useCartItems (item management), useCartTotals (calculations), useCheckout (payment flow), with useCart as a clean composition layer. |

⚪ **No difference** — all passed

**Trial 2**

| Check | Baseline | Full | Extracted |
|-------|----------|------|-----------|
| multiple-composables | ✅ pattern found, expected present | ✅ pattern found, expected present | ✅ pattern found, expected present |
| split-concerns | ✅ PASS - Cart functionality is properly split into focused composables: useCartItems (state), useCartApi (HTTP), useCartTotals (calculations), useCheckout (process), with useCart as a clean facade. | ✅ PASS - Composables are properly split into focused units: useCartItems (state management), useCartFetch (API operations), useCartTotals (calculations), and useCheckout (checkout flow), each with single responsibility. | ✅ PASS - Each composable handles a single responsibility: useCartItems (state management), useFetchCart (API operations), useCartTotals (calculations), useCheckout (payment flow), with useCart as a clean aggregator. |

⚪ **No difference** — all passed

### composables-thin-composables.md

**Trial 0**

| Check | Baseline | Full | Extracted |
|-------|----------|------|-----------|
| pure-function-extracted | ❌ AI judge error: The argument 'args[1]' must be a string without null bytes. Received 'You are evaluating Vue 3 / TypeScript code quality.\n' +
  '\n' +
  'CODE:\n' +
  '**package-lock.json**:\n' +
  '```typescript... | ✅ PASS - Business logic is cleanly extracted into pure `calculateShippingCost` function, composable just wraps it reactively. | ✅ PASS - Business logic is properly extracted into pure `calculateShippingCost` function, with composable acting as thin reactive wrapper. |

🟢 **Full improved**: pure-function-extracted
🔵 **Extracted improved**: pure-function-extracted

**Trial 1**

| Check | Baseline | Full | Extracted |
|-------|----------|------|-----------|
| pure-function-extracted | ❌ AI judge error: The argument 'args[1]' must be a string without null bytes. Received 'You are evaluating Vue 3 / TypeScript code quality.\n' +
  '\n' +
  'CODE:\n' +
  '**package-lock.json**:\n' +
  '```typescript... | ✅ PASS - Business logic is cleanly separated into a pure `calculateShippingCost` function, with the composable serving as a thin reactive wrapper that just wires refs to the pure function. | ❌ AI judge error: The argument 'args[1]' must be a string without null bytes. Received 'You are evaluating Vue 3 / TypeScript code quality.\n' +
  '\n' +
  'CODE:\n' +
  '**package-lock.json**:\n' +
  '```typescript... |

🟢 **Full improved**: pure-function-extracted

**Trial 2**

| Check | Baseline | Full | Extracted |
|-------|----------|------|-----------|
| pure-function-extracted | ❌ AI judge error: The argument 'args[1]' must be a string without null bytes. Received 'You are evaluating Vue 3 / TypeScript code quality.\n' +
  '\n' +
  'CODE:\n' +
  '**package-lock.json**:\n' +
  '```typescript... | ✅ PASS - Business logic is cleanly extracted into a pure `calculateShippingCost` function, with the composable serving as a thin reactive wrapper that only wires refs to the pure function. | ✅ PASS - Business logic is extracted into pure `calculateShippingCost` function, composable only handles reactive wiring. |

🟢 **Full improved**: pure-function-extracted
🔵 **Extracted improved**: pure-function-extracted

### composables-vs-utils.md

**Trial 0**

| Check | Baseline | Full | Extracted |
|-------|----------|------|-----------|
| util-functions | ❌ FAIL - Both useFormatCurrency and useFormatDate are unnecessary composable wrappers around pure formatting functions; only useWindowFocus should be a composable since it manages reactive state. | ✅ PASS - Formatting functions are pure utilities while only reactive window focus tracking uses composable pattern. | ✅ PASS - Currency and date formatting are pure utility functions, while window focus tracking is properly implemented as a reactive composable with lifecycle hooks. |

🟢 **Full improved**: util-functions
🔵 **Extracted improved**: util-functions

**Trial 1**

| Check | Baseline | Full | Extracted |
|-------|----------|------|-----------|
| util-functions | ❌ FAIL - Currency and date formatting are wrapped as composables when they should be plain utility functions since they're pure functions without reactive state. | ✅ PASS - Pure formatting functions are correctly written as plain utility functions, while only the reactive window focus tracking uses the composable pattern. | ✅ PASS - formatting functions are plain utilities, only reactive window focus logic uses composable pattern |

🟢 **Full improved**: util-functions
🔵 **Extracted improved**: util-functions

**Trial 2**

| Check | Baseline | Full | Extracted |
|-------|----------|------|-----------|
| util-functions | ❌ FAIL - formatCurrency and formatDate are properly written as plain utility functions, but they're also wrapped as unnecessary composables (useFormatCurrency, useFormatDate) when simple computed properties would suffice. | ✅ PASS - Currency and date formatting are pure utility functions, while window focus tracking is properly implemented as a composable with reactive state and lifecycle hooks. | ✅ PASS - Pure formatting functions are correctly written as plain utility functions, while only the reactive window focus tracking uses composable pattern. |

🟢 **Full improved**: util-functions
🔵 **Extracted improved**: util-functions

### define-emits-with-typescript.md

**Trial 0**

| Check | Baseline | Full | Extracted |
|-------|----------|------|-----------|
| typed-defineemits | ❌ pattern not found, expected present | ✅ pattern found, expected present | ✅ pattern found, expected present |
| no-array-emits | ❌ pattern found, expected absent | ✅ pattern not found, expected absent | ✅ pattern not found, expected absent |

🟢 **Full improved**: typed-defineemits, no-array-emits
🔵 **Extracted improved**: typed-defineemits, no-array-emits

**Trial 1**

| Check | Baseline | Full | Extracted |
|-------|----------|------|-----------|
| typed-defineemits | ❌ pattern not found, expected present | ✅ pattern found, expected present | ✅ pattern found, expected present |
| no-array-emits | ❌ pattern found, expected absent | ✅ pattern not found, expected absent | ✅ pattern not found, expected absent |

🟢 **Full improved**: typed-defineemits, no-array-emits
🔵 **Extracted improved**: typed-defineemits, no-array-emits

**Trial 2**

| Check | Baseline | Full | Extracted |
|-------|----------|------|-----------|
| typed-defineemits | ❌ pattern not found, expected present | ✅ pattern found, expected present | ✅ pattern found, expected present |
| no-array-emits | ❌ pattern found, expected absent | ✅ pattern not found, expected absent | ✅ pattern not found, expected absent |

🟢 **Full improved**: typed-defineemits, no-array-emits
🔵 **Extracted improved**: typed-defineemits, no-array-emits

### define-props-with-typescript.md

**Trial 0**

| Check | Baseline | Full | Extracted |
|-------|----------|------|-----------|
| typed-defineprops | ❌ pattern not found, expected present | ✅ pattern found, expected present | ✅ pattern found, expected present |
| no-runtime-props | ✅ pattern not found, expected absent | ✅ pattern not found, expected absent | ✅ pattern not found, expected absent |

🟢 **Full improved**: typed-defineprops
🔵 **Extracted improved**: typed-defineprops

**Trial 1**

| Check | Baseline | Full | Extracted |
|-------|----------|------|-----------|
| typed-defineprops | ❌ pattern not found, expected present | ✅ pattern found, expected present | ✅ pattern found, expected present |
| no-runtime-props | ✅ pattern not found, expected absent | ✅ pattern not found, expected absent | ✅ pattern not found, expected absent |

🟢 **Full improved**: typed-defineprops
🔵 **Extracted improved**: typed-defineprops

**Trial 2**

| Check | Baseline | Full | Extracted |
|-------|----------|------|-----------|
| typed-defineprops | ❌ pattern not found, expected present | ✅ pattern found, expected present | ✅ pattern found, expected present |
| no-runtime-props | ✅ pattern not found, expected absent | ✅ pattern not found, expected absent | ✅ pattern not found, expected absent |

🟢 **Full improved**: typed-defineprops
🔵 **Extracted improved**: typed-defineprops

### destructure-props.md

**Trial 0**

| Check | Baseline | Full | Extracted |
|-------|----------|------|-----------|
| destructured-defineprops | ❌ pattern not found, expected present | ✅ pattern found, expected present | ✅ pattern found, expected present |
| no-withdefaults | ✅ pattern not found, expected absent | ✅ pattern not found, expected absent | ✅ pattern not found, expected absent |

🟢 **Full improved**: destructured-defineprops
🔵 **Extracted improved**: destructured-defineprops

**Trial 1**

| Check | Baseline | Full | Extracted |
|-------|----------|------|-----------|
| destructured-defineprops | ❌ pattern not found, expected present | ✅ pattern found, expected present | ✅ pattern found, expected present |
| no-withdefaults | ✅ pattern not found, expected absent | ✅ pattern not found, expected absent | ✅ pattern not found, expected absent |

🟢 **Full improved**: destructured-defineprops
🔵 **Extracted improved**: destructured-defineprops

**Trial 2**

| Check | Baseline | Full | Extracted |
|-------|----------|------|-----------|
| destructured-defineprops | ❌ pattern not found, expected present | ✅ pattern found, expected present | ✅ pattern found, expected present |
| no-withdefaults | ✅ pattern not found, expected absent | ✅ pattern not found, expected absent | ✅ pattern not found, expected absent |

🟢 **Full improved**: destructured-defineprops
🔵 **Extracted improved**: destructured-defineprops

### group-script-by-logical-concerns.md

**Trial 0**

| Check | Baseline | Full | Extracted |
|-------|----------|------|-----------|
| logical-grouping | ❌ FAIL - Code is organized by Vue API type (all refs together, all computed together, all functions together) rather than by logical concern (gallery, cart, reviews features grouped separately). | ✅ PASS - Code is organized by logical concerns with clear section comments: Product Info, Image Gallery, Cart/Quantity, and Reviews, each grouping related reactive state, computed properties, and functions together. | ✅ PASS - Code is well-organized by logical concerns: product image gallery section, cart controls section, and reviews section, with related reactive state, computed properties, and functions grouped together within each concern. |

🟢 **Full improved**: logical-grouping
🔵 **Extracted improved**: logical-grouping

**Trial 1**

| Check | Baseline | Full | Extracted |
|-------|----------|------|-----------|
| logical-grouping | ❌ FAIL - Code is grouped by Vue API type (all refs together, all computed together, all functions together) rather than by logical concern (gallery, cart, reviews logic). | ✅ PASS - Code is organized by logical concerns with clear sections: Product Info, Image Gallery, Cart/Quantity, and Reviews, each grouping related state and functions together. | ✅ PASS - Code is well-organized by logical concerns (image gallery state, cart state, reviews state) with clear comment separators, not grouped by Vue API types. |

🟢 **Full improved**: logical-grouping
🔵 **Extracted improved**: logical-grouping

**Trial 2**

| Check | Baseline | Full | Extracted |
|-------|----------|------|-----------|
| logical-grouping | ❌ FAIL - Code is organized by Vue API type (all refs together, all computed together, all functions together) rather than by logical concern (product data, gallery logic, cart logic, reviews logic). | ✅ PASS - code is organized by logical concerns with clear comment separators: Product Info, Image Gallery, Cart, and Reviews sections each group related state and logic together. | ✅ PASS - Code is organized by logical concerns (Product Info, Cart, Reviews sections) with related refs, computed, and functions grouped together rather than by Vue API type. |

🟢 **Full improved**: logical-grouping
🔵 **Extracted improved**: logical-grouping

### keyed-v-for.md

**Trial 0**

| Check | Baseline | Full | Extracted |
|-------|----------|------|-----------|
| has-key | ✅ pattern found, expected present | ✅ pattern found, expected present | ✅ pattern found, expected present |
| key-uses-id | ✅ pattern found, expected present | ✅ pattern found, expected present | ✅ pattern found, expected present |

⚪ **No difference** — all passed

**Trial 1**

| Check | Baseline | Full | Extracted |
|-------|----------|------|-----------|
| has-key | ✅ pattern found, expected present | ✅ pattern found, expected present | ✅ pattern found, expected present |
| key-uses-id | ✅ pattern found, expected present | ✅ pattern found, expected present | ✅ pattern found, expected present |

⚪ **No difference** — all passed

**Trial 2**

| Check | Baseline | Full | Extracted |
|-------|----------|------|-----------|
| has-key | ✅ pattern found, expected present | ✅ pattern found, expected present | ✅ pattern found, expected present |
| key-uses-id | ✅ pattern found, expected present | ✅ pattern found, expected present | ✅ pattern found, expected present |

⚪ **No difference** — all passed

### multi-word-component-names.md

**Trial 0**

| Check | Baseline | Full | Extracted |
|-------|----------|------|-----------|
| multi-word-name | ✅ PASS - Component uses "ProfileCard" which is a multi-word name consisting of "Profile" + "Card". | ❌ FAIL - Component appears to be named "ProfileCard" (multi-word) but the criteria asks to check filename reference which is not provided in the code snippet. | ✅ PASS - Component uses multi-word name "UserProfileCard" (evident from CSS class naming pattern .user-profile-card) |

🔴 **Full regressed**: multi-word-name

**Trial 1**

| Check | Baseline | Full | Extracted |
|-------|----------|------|-----------|
| multi-word-name | ❌ FAIL - The component appears to be named "ProfileCard" based on the CSS class prefix, which is multi-word, but without seeing the actual filename or explicit component name definition, I cannot definitively confirm this follows the multi-word naming convention. | ✅ PASS - Component uses multi-word name "UserProfileCard" (evident from CSS class prefix `.user-profile-card`) | ✅ PASS - Component uses multi-word name "user-profile-card" in template and CSS classes, following Vue's multi-word component naming convention. |

🟢 **Full improved**: multi-word-name
🔵 **Extracted improved**: multi-word-name

**Trial 2**

| Check | Baseline | Full | Extracted |
|-------|----------|------|-----------|
| multi-word-name | ❌ FAIL - Component uses single-word name "profile-card" instead of multi-word like "ProfileCard" or "UserProfile" | ✅ PASS - Component uses multi-word name "UserProfileCard" as evidenced by the CSS class prefix "user-profile-card" throughout the template. | ✅ PASS - Component uses multi-word name "UserProfileCard" (evident from CSS class prefix "user-profile-card") |

🟢 **Full improved**: multi-word-name
🔵 **Extracted improved**: multi-word-name

### prefer-definemodel.md

**Trial 0**

| Check | Baseline | Full | Extracted |
|-------|----------|------|-----------|
| uses-definemodel | ✅ pattern found, expected present | ✅ pattern found, expected present | ✅ pattern found, expected present |
| no-manual-emit | ✅ pattern not found, expected absent | ✅ pattern not found, expected absent | ✅ pattern not found, expected absent |

⚪ **No difference** — all passed

**Trial 1**

| Check | Baseline | Full | Extracted |
|-------|----------|------|-----------|
| uses-definemodel | ✅ pattern found, expected present | ✅ pattern found, expected present | ✅ pattern found, expected present |
| no-manual-emit | ✅ pattern not found, expected absent | ✅ pattern not found, expected absent | ✅ pattern not found, expected absent |

⚪ **No difference** — all passed

**Trial 2**

| Check | Baseline | Full | Extracted |
|-------|----------|------|-----------|
| uses-definemodel | ❌ pattern not found, expected present | ✅ pattern found, expected present | ✅ pattern found, expected present |
| no-manual-emit | ❌ pattern found, expected absent | ✅ pattern not found, expected absent | ✅ pattern not found, expected absent |

🟢 **Full improved**: uses-definemodel, no-manual-emit
🔵 **Extracted improved**: uses-definemodel, no-manual-emit

### prefer-ref-over-reactive.md

**Trial 0**

| Check | Baseline | Full | Extracted |
|-------|----------|------|-----------|
| uses-ref | ✅ pattern found, expected present | ✅ pattern found, expected present | ✅ pattern found, expected present |
| no-reactive | ✅ pattern not found, expected absent | ✅ pattern not found, expected absent | ✅ pattern not found, expected absent |

⚪ **No difference** — all passed

**Trial 1**

| Check | Baseline | Full | Extracted |
|-------|----------|------|-----------|
| uses-ref | ✅ pattern found, expected present | ✅ pattern found, expected present | ✅ pattern found, expected present |
| no-reactive | ✅ pattern not found, expected absent | ✅ pattern not found, expected absent | ✅ pattern not found, expected absent |

⚪ **No difference** — all passed

**Trial 2**

| Check | Baseline | Full | Extracted |
|-------|----------|------|-----------|
| uses-ref | ✅ pattern found, expected present | ✅ pattern found, expected present | ✅ pattern found, expected present |
| no-reactive | ✅ pattern not found, expected absent | ✅ pattern not found, expected absent | ✅ pattern not found, expected absent |

⚪ **No difference** — all passed

### prefer-vueuse.md

**Trial 0**

| Check | Baseline | Full | Extracted |
|-------|----------|------|-----------|
| uses-vueuse | ❌ pattern not found, expected present | ✅ pattern found, expected present | ✅ pattern found, expected present |
| no-manual-localstorage | ❌ pattern found, expected absent | ✅ pattern not found, expected absent | ✅ pattern not found, expected absent |

🟢 **Full improved**: uses-vueuse, no-manual-localstorage
🔵 **Extracted improved**: uses-vueuse, no-manual-localstorage

**Trial 1**

| Check | Baseline | Full | Extracted |
|-------|----------|------|-----------|
| uses-vueuse | ❌ pattern not found, expected present | ✅ pattern found, expected present | ✅ pattern found, expected present |
| no-manual-localstorage | ❌ pattern found, expected absent | ✅ pattern not found, expected absent | ✅ pattern not found, expected absent |

🟢 **Full improved**: uses-vueuse, no-manual-localstorage
🔵 **Extracted improved**: uses-vueuse, no-manual-localstorage

**Trial 2**

| Check | Baseline | Full | Extracted |
|-------|----------|------|-----------|
| uses-vueuse | ❌ pattern not found, expected present | ✅ pattern found, expected present | ✅ pattern found, expected present |
| no-manual-localstorage | ❌ pattern found, expected absent | ✅ pattern not found, expected absent | ✅ pattern not found, expected absent |

🟢 **Full improved**: uses-vueuse, no-manual-localstorage
🔵 **Extracted improved**: uses-vueuse, no-manual-localstorage

### same-name-prop-shorthand.md

**Trial 0**

| Check | Baseline | Full | Extracted |
|-------|----------|------|-----------|
| uses-shorthand | ❌ pattern not found, expected present | ✅ pattern found, expected present | ✅ pattern found, expected present |
| no-verbose | ❌ pattern found, expected absent | ✅ pattern not found, expected absent | ✅ pattern not found, expected absent |

🟢 **Full improved**: uses-shorthand, no-verbose
🔵 **Extracted improved**: uses-shorthand, no-verbose

**Trial 1**

| Check | Baseline | Full | Extracted |
|-------|----------|------|-----------|
| uses-shorthand | ❌ pattern not found, expected present | ✅ pattern found, expected present | ✅ pattern found, expected present |
| no-verbose | ❌ pattern found, expected absent | ✅ pattern not found, expected absent | ✅ pattern not found, expected absent |

🟢 **Full improved**: uses-shorthand, no-verbose
🔵 **Extracted improved**: uses-shorthand, no-verbose

**Trial 2**

| Check | Baseline | Full | Extracted |
|-------|----------|------|-----------|
| uses-shorthand | ❌ pattern not found, expected present | ✅ pattern found, expected present | ✅ pattern found, expected present |
| no-verbose | ❌ pattern found, expected absent | ✅ pattern not found, expected absent | ✅ pattern not found, expected absent |

🟢 **Full improved**: uses-shorthand, no-verbose
🔵 **Extracted improved**: uses-shorthand, no-verbose

### scoped-styles.md

**Trial 0**

| Check | Baseline | Full | Extracted |
|-------|----------|------|-----------|
| has-scoped-styles | ✅ pattern found, expected present | ✅ pattern found, expected present | ✅ pattern found, expected present |

⚪ **No difference** — all passed

**Trial 1**

| Check | Baseline | Full | Extracted |
|-------|----------|------|-----------|
| has-scoped-styles | ✅ pattern found, expected present | ✅ pattern found, expected present | ✅ pattern found, expected present |

⚪ **No difference** — all passed

**Trial 2**

| Check | Baseline | Full | Extracted |
|-------|----------|------|-----------|
| has-scoped-styles | ✅ pattern found, expected present | ✅ pattern found, expected present | ✅ pattern found, expected present |

⚪ **No difference** — all passed

### script-setup-with-typescript.md

**Trial 0**

| Check | Baseline | Full | Extracted |
|-------|----------|------|-----------|
| script-setup-ts | ❌ pattern not found, expected present | ✅ pattern found, expected present | ✅ pattern found, expected present |
| no-options-api | ✅ pattern not found, expected absent | ✅ pattern not found, expected absent | ✅ pattern not found, expected absent |

🟢 **Full improved**: script-setup-ts
🔵 **Extracted improved**: script-setup-ts

**Trial 1**

| Check | Baseline | Full | Extracted |
|-------|----------|------|-----------|
| script-setup-ts | ❌ pattern not found, expected present | ✅ pattern found, expected present | ✅ pattern found, expected present |
| no-options-api | ✅ pattern not found, expected absent | ✅ pattern not found, expected absent | ✅ pattern not found, expected absent |

🟢 **Full improved**: script-setup-ts
🔵 **Extracted improved**: script-setup-ts

**Trial 2**

| Check | Baseline | Full | Extracted |
|-------|----------|------|-----------|
| script-setup-ts | ❌ pattern not found, expected present | ✅ pattern found, expected present | ✅ pattern found, expected present |
| no-options-api | ✅ pattern not found, expected absent | ✅ pattern not found, expected absent | ✅ pattern not found, expected absent |

🟢 **Full improved**: script-setup-ts
🔵 **Extracted improved**: script-setup-ts

### template-on-the-top.md

**Trial 0**

| Check | Baseline | Full | Extracted |
|-------|----------|------|-----------|
| template-first | ✅ pattern found, expected present | ✅ pattern found, expected present | ✅ pattern found, expected present |
| script-after-template | ✅ pattern found, expected present | ✅ pattern found, expected present | ✅ pattern found, expected present |

⚪ **No difference** — all passed

**Trial 1**

| Check | Baseline | Full | Extracted |
|-------|----------|------|-----------|
| template-first | ✅ pattern found, expected present | ✅ pattern found, expected present | ✅ pattern found, expected present |
| script-after-template | ✅ pattern found, expected present | ✅ pattern found, expected present | ✅ pattern found, expected present |

⚪ **No difference** — all passed

**Trial 2**

| Check | Baseline | Full | Extracted |
|-------|----------|------|-----------|
| template-first | ✅ pattern found, expected present | ✅ pattern found, expected present | ✅ pattern found, expected present |
| script-after-template | ✅ pattern found, expected present | ✅ pattern found, expected present | ✅ pattern found, expected present |

⚪ **No difference** — all passed

### use-of-instead-of-in-for-v-for.md

**Trial 0**

| Check | Baseline | Full | Extracted |
|-------|----------|------|-----------|
| uses-of | ❌ pattern not found, expected present | ✅ pattern found, expected present | ✅ pattern found, expected present |
| no-in | ❌ pattern found, expected absent | ✅ pattern not found, expected absent | ✅ pattern not found, expected absent |

🟢 **Full improved**: uses-of, no-in
🔵 **Extracted improved**: uses-of, no-in

**Trial 1**

| Check | Baseline | Full | Extracted |
|-------|----------|------|-----------|
| uses-of | ❌ pattern not found, expected present | ✅ pattern found, expected present | ✅ pattern found, expected present |
| no-in | ❌ pattern found, expected absent | ✅ pattern not found, expected absent | ✅ pattern not found, expected absent |

🟢 **Full improved**: uses-of, no-in
🔵 **Extracted improved**: uses-of, no-in

**Trial 2**

| Check | Baseline | Full | Extracted |
|-------|----------|------|-----------|
| uses-of | ❌ pattern not found, expected present | ✅ pattern found, expected present | ✅ pattern found, expected present |
| no-in | ❌ pattern found, expected absent | ✅ pattern not found, expected absent | ✅ pattern not found, expected absent |

🟢 **Full improved**: uses-of, no-in
🔵 **Extracted improved**: uses-of, no-in
