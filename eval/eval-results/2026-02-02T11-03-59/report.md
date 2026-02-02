# Eval Report

## Summary

- **Already Known**: 11
- **Full Better**: 1
- **Extracted Better**: 0
- **Both Help**: 10
- **No Improvement**: 3

## Results

| Rule | Category | Classification | Baseline | Full | Extracted |
|------|----------|---------------|----------|------|-----------|
| composables-thin-composables.md | composables | 🟢 full-better | 0/3 | 3/3 | 2/3 |
| composables-vs-utils.md | composables | 🟡 both-help | 0/3 | 3/3 | 3/3 |
| define-emits-with-typescript.md | props | 🟡 both-help | 0/6 | 6/6 | 6/6 |
| define-props-with-typescript.md | props | 🟡 both-help | 3/6 | 6/6 | 6/6 |
| destructure-props.md | props | 🟡 both-help | 3/6 | 6/6 | 6/6 |
| group-script-by-logical-concerns.md | sfc-structure | 🟡 both-help | 0/3 | 3/3 | 3/3 |
| multi-word-component-names.md | sfc-structure | 🟡 both-help | 2/3 | 3/3 | 3/3 |
| prefer-definemodel.md | props | 🟡 both-help | 4/6 | 6/6 | 6/6 |
| prefer-vueuse.md | composables | 🟡 both-help | 0/6 | 6/6 | 6/6 |
| same-name-prop-shorthand.md | props | 🟡 both-help | 0/6 | 6/6 | 6/6 |
| use-of-instead-of-in-for-v-for.md | template-directives | 🟡 both-help | 0/6 | 6/6 | 6/6 |
| composables-async-patterns.md | composables | 🔴 no-improvement | 6/9 | 6/9 | 6/9 |
| keyed-v-for.md | template-directives | 🔴 no-improvement | 3/6 | 3/6 | 3/6 |
| script-setup-with-typescript.md | sfc-structure | 🔴 no-improvement | 3/6 | 3/6 | 3/6 |
| composables-cleanup.md | composables | ⚪ already-known | 6/6 | 6/6 | 6/6 |
| composables-input-flexibility.md | composables | ⚪ already-known | 6/6 | 6/6 | 6/6 |
| composables-naming.md | composables | ⚪ already-known | 6/6 | 6/6 | 6/6 |
| composables-organize-by-concern.md | composables | ⚪ already-known | 3/3 | 3/3 | 1/3 |
| composables-progressive-extraction.md | composables | ⚪ already-known | 3/3 | 3/3 | 3/3 |
| composables-return-refs.md | composables | ⚪ already-known | 9/9 | 9/9 | 9/9 |
| composables-setup-context.md | composables | ⚪ already-known | 3/3 | 3/3 | 3/3 |
| composables-single-responsibility.md | composables | ⚪ already-known | 6/6 | 6/6 | 6/6 |
| prefer-ref-over-reactive.md | props | ⚪ already-known | 6/6 | 6/6 | 6/6 |
| scoped-styles.md | styles | ⚪ already-known | 3/3 | 3/3 | 3/3 |
| template-on-the-top.md | sfc-structure | ⚪ already-known | 6/6 | 6/6 | 6/6 |

## Recommendations

- **composables-thin-composables.md** → use **full**
- **composables-vs-utils.md** → use **extracted**
- **define-emits-with-typescript.md** → use **extracted**
- **define-props-with-typescript.md** → use **extracted**
- **destructure-props.md** → use **extracted**
- **group-script-by-logical-concerns.md** → use **extracted**
- **multi-word-component-names.md** → use **extracted**
- **prefer-definemodel.md** → use **extracted**
- **prefer-vueuse.md** → use **extracted**
- **same-name-prop-shorthand.md** → use **extracted**
- **use-of-instead-of-in-for-v-for.md** → use **extracted**

## Details

### composables-async-patterns.md

**Trial 0**

| Check | Baseline | Full | Extracted |
|-------|----------|------|-----------|
| loading-ref | ✅ pattern found, expected present | ✅ pattern found, expected present | ✅ pattern found, expected present |
| error-ref | ✅ pattern found, expected present | ✅ pattern found, expected present | ✅ pattern found, expected present |
| returns-state | ❌ pattern not found, expected present | ❌ pattern not found, expected present | ❌ pattern not found, expected present |

⚪ **No difference** — all failed the same checks

**Trial 1**

| Check | Baseline | Full | Extracted |
|-------|----------|------|-----------|
| loading-ref | ✅ pattern found, expected present | ✅ pattern found, expected present | ✅ pattern found, expected present |
| error-ref | ✅ pattern found, expected present | ✅ pattern found, expected present | ✅ pattern found, expected present |
| returns-state | ❌ pattern not found, expected present | ❌ pattern not found, expected present | ❌ pattern not found, expected present |

⚪ **No difference** — all failed the same checks

**Trial 2**

| Check | Baseline | Full | Extracted |
|-------|----------|------|-----------|
| loading-ref | ✅ pattern found, expected present | ✅ pattern found, expected present | ✅ pattern found, expected present |
| error-ref | ✅ pattern found, expected present | ✅ pattern found, expected present | ✅ pattern found, expected present |
| returns-state | ❌ pattern not found, expected present | ❌ pattern not found, expected present | ❌ pattern not found, expected present |

⚪ **No difference** — all failed the same checks

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
| organized-by-concern | ✅ PASS - Code is grouped by logical concern: profile state/methods together, notification preferences together, activity log/pagination together, rather than grouping all refs or all functions separately. | ✅ PASS - Code is clearly organized by logical concerns with each section (profile, notifications, activity log) keeping related state and functions grouped together rather than separating by API type. | ✅ PASS - Code is organized by logical concern with clear sections: state, metadata (computed values), and methods, with related functionality grouped together (profile data + loading, notifications + preferences, activity + pagination). |

⚪ **No difference** — all passed

**Trial 1**

| Check | Baseline | Full | Extracted |
|-------|----------|------|-----------|
| organized-by-concern | ✅ PASS - Code is well-organized by logical concern with state, computed, and methods for each feature (profile, notifications, activity) grouped together, and clear section comments separating concerns. | ✅ PASS - Code is clearly organized by logical concerns with comments separating user profile, notification preferences, and activity log sections, keeping related state and functions grouped together. | ❌ FAIL - Code is grouped by API type (state section, computed section, methods section) rather than logical concern (profile data + loading + methods together, notifications + preferences + save together, etc.) |

🔴 **Extracted regressed**: organized-by-concern

**Trial 2**

| Check | Baseline | Full | Extracted |
|-------|----------|------|-----------|
| organized-by-concern | ✅ PASS - Code groups related state and methods by logical concern (profile data + loading/error, notifications + saving, activity + pagination) with clear section comments, rather than grouping all refs together or all functions together. | ✅ PASS - Code is clearly organized by logical concerns with comments separating user profile, notification preferences, and activity log sections, each grouping related state and functions together. | ❌ FAIL - Code is grouped by API type (all refs together, computed together, functions together) rather than by logical concern (profile data + loading + fetch method grouped together). |

🔴 **Extracted regressed**: organized-by-concern

### composables-progressive-extraction.md

**Trial 0**

| Check | Baseline | Full | Extracted |
|-------|----------|------|-----------|
| inline-or-colocated | ✅ PASS - Search logic is kept inline within the component's script setup section, not extracted to shared composables. | ✅ PASS - Search logic is inline within the component's script setup block, not extracted to a shared composables directory. | ✅ PASS - Search logic is inline in script setup block, properly colocated with the component rather than prematurely extracted to composables. |

⚪ **No difference** — all passed

**Trial 1**

| Check | Baseline | Full | Extracted |
|-------|----------|------|-----------|
| inline-or-colocated | ✅ PASS - search logic is kept inline within the component's script setup block, not extracted to shared composables. | ✅ PASS - Search logic is kept inline within the component's script setup block, not extracted to a shared composables directory. | ✅ PASS - Search logic is kept inline within the component's script setup block, not extracted to a shared composables directory. |

⚪ **No difference** — all passed

**Trial 2**

| Check | Baseline | Full | Extracted |
|-------|----------|------|-----------|
| inline-or-colocated | ✅ PASS - Search logic is properly kept inline in the component's script setup, avoiding premature extraction to composables. | ✅ PASS - Search logic is kept inline within the component's script setup, not extracted to a shared composables directory. | ✅ PASS - Search logic is kept inline within the component's script setup block, not extracted to a shared composables directory. |

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
| called-in-setup | ✅ PASS - All composable calls (useMousePosition, useItemList) are made directly at the top level of <script setup> before any other logic. | ✅ PASS - All composable calls (useMouse, useItemList) are made synchronously at the top level of <script setup>, not inside callbacks or after await statements. | ✅ PASS - All composable calls (useMousePosition, useItemList) are made directly at the top level of <script setup>, not inside callbacks or after await statements. |

⚪ **No difference** — all passed

**Trial 1**

| Check | Baseline | Full | Extracted |
|-------|----------|------|-----------|
| called-in-setup | ✅ PASS - All composable calls (`useMousePosition`, `useItemList`) are at the top level of `<script setup>`, not inside callbacks or async contexts. | ✅ PASS - All composable calls (useMouse, useItemList) are made directly at the top level of <script setup> in proper setup context. | ✅ PASS - All composable calls (`useMousePosition` and `useItemList`) are at the top level of `<script setup>`, not inside any callbacks, promises, or after await statements. |

⚪ **No difference** — all passed

**Trial 2**

| Check | Baseline | Full | Extracted |
|-------|----------|------|-----------|
| called-in-setup | ✅ PASS - All composable calls (`useMousePosition`, `useItemList`) are made directly at the top level of `<script setup>`, not inside callbacks or conditional blocks. | ✅ PASS - All composable calls (useMouse, useItemList) are made synchronously at the top level of <script setup>, not inside any callbacks, promises, or after await statements. | ✅ PASS - All composable calls (`useMousePosition`, `useItemList`) are at the top level of `<script setup>`, not inside callbacks or conditional blocks. |

⚪ **No difference** — all passed

### composables-single-responsibility.md

**Trial 0**

| Check | Baseline | Full | Extracted |
|-------|----------|------|-----------|
| multiple-composables | ✅ pattern found, expected present | ✅ pattern found, expected present | ✅ pattern found, expected present |
| split-concerns | ✅ PASS - Cart functionality is properly split into focused composables: useCartItems (state management), useCartApi (HTTP operations), useCartTotals (calculations), and useCheckout (checkout flow), with useCart as a clean composition layer. | ✅ PASS - Composables are well-split into single responsibilities: `useCartItems` (state management), `useCartFetch` (API operations), `useCartTotals` (calculations), and `useCheckout` (checkout logic). | ✅ PASS - Code is properly split into focused composables: useCartItems (state management), useFetchCart (data fetching), useCartTotals (calculations), useCheckout (checkout logic), with useCart as a clean orchestrator. |

⚪ **No difference** — all passed

**Trial 1**

| Check | Baseline | Full | Extracted |
|-------|----------|------|-----------|
| multiple-composables | ✅ pattern found, expected present | ✅ pattern found, expected present | ✅ pattern found, expected present |
| split-concerns | ✅ PASS - Well-separated composables: useCartItems (state), useCartApi (HTTP), useCartTotals (calculations), useCheckout (checkout flow), with main useCart orchestrating them. | ✅ PASS - Code is properly split into focused composables: useCartItems (state management), useCartFetch (API operations), useCartTotals (calculations), and useCheckout (checkout flow), each with single responsibility. | ✅ PASS - Code is split into focused composables: useCartItems (item management), useFetchCart (API operations), useCartTotals (calculations), useCheckout (payment flow), with useCart as a clean composition layer. |

⚪ **No difference** — all passed

**Trial 2**

| Check | Baseline | Full | Extracted |
|-------|----------|------|-----------|
| multiple-composables | ✅ pattern found, expected present | ✅ pattern found, expected present | ✅ pattern found, expected present |
| split-concerns | ✅ PASS - Code is properly split into focused composables: useCartItems (state management), useCartApi (HTTP requests), useCartTotals (calculations), useCheckout (checkout flow), with useCart as a facade composer. | ✅ PASS - Code is well-split into focused composables: useCartItems (state management), useCartFetch (API operations), useCartTotals (calculations), and useCheckout (checkout flow). | ✅ PASS - The code is properly split into focused, single-responsibility composables: `useCartItems` (item management), `useFetchCart` (API operations), `useCartTotals` (calculations), and `useCheckout` (checkout flow), with `useCart` serving as a clean composition layer. |

⚪ **No difference** — all passed

### composables-thin-composables.md

**Trial 0**

| Check | Baseline | Full | Extracted |
|-------|----------|------|-----------|
| pure-function-extracted | ❌ AI judge error: The argument 'args[1]' must be a string without null bytes. Received 'You are evaluating Vue 3 / TypeScript code quality.\n' +
  '\n' +
  'CODE:\n' +
  '**package-lock.json**:\n' +
  '```typescript... | ✅ PASS - Business logic is extracted into pure `calculateShippingCost` function, composable just wires refs to it via computed. | ✅ PASS - Business logic is extracted into `calculateShippingCost` pure function, composable only wires refs to it via computed. |

🟢 **Full improved**: pure-function-extracted
🔵 **Extracted improved**: pure-function-extracted

**Trial 1**

| Check | Baseline | Full | Extracted |
|-------|----------|------|-----------|
| pure-function-extracted | ❌ AI judge error: The argument 'args[1]' must be a string without null bytes. Received 'You are evaluating Vue 3 / TypeScript code quality.\n' +
  '\n' +
  'CODE:\n' +
  '**package-lock.json**:\n' +
  '```typescript... | ✅ PASS - Business logic is properly extracted into a pure `calculateShippingCost` function, with the composable only providing a thin reactive wrapper via computed. | ❌ AI judge error: The argument 'args[1]' must be a string without null bytes. Received 'You are evaluating Vue 3 / TypeScript code quality.\n' +
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
  '```typescript... | ✅ PASS - Business logic is cleanly extracted into pure `calculateShippingCost` function, with composable only providing reactive wrapper via computed. | ✅ PASS - Business logic is extracted into pure `calculateShippingCost` function, composable just wraps it with reactivity. |

🟢 **Full improved**: pure-function-extracted
🔵 **Extracted improved**: pure-function-extracted

### composables-vs-utils.md

**Trial 0**

| Check | Baseline | Full | Extracted |
|-------|----------|------|-----------|
| util-functions | ❌ FAIL - Currency and date formatting have both utility functions AND composable wrappers, violating the separation principle. | ✅ PASS - Formatting functions are plain utilities, only reactive window focus logic is properly implemented as a composable. | ✅ PASS - Currency and date formatting are plain utility functions, only the reactive window focus tracking uses Vue composables correctly. |

🟢 **Full improved**: util-functions
🔵 **Extracted improved**: util-functions

**Trial 1**

| Check | Baseline | Full | Extracted |
|-------|----------|------|-----------|
| util-functions | ❌ FAIL - Currency and date formatting are implemented as both utility functions AND composables, when they should only be utility functions since they're pure formatting operations. | ✅ PASS - formatters are plain utility functions, only reactive window focus tracking uses composable pattern | ✅ PASS - Pure formatting functions are utility functions, only reactive window focus tracking uses composable pattern with refs and lifecycle hooks. |

🟢 **Full improved**: util-functions
🔵 **Extracted improved**: util-functions

**Trial 2**

| Check | Baseline | Full | Extracted |
|-------|----------|------|-----------|
| util-functions | ❌ FAIL - Currency and date functions are provided both as pure utilities AND wrapped as composables, when they should only be pure utilities since they're stateless formatters. | ✅ PASS - Currency and date formatters are plain utility functions while window focus tracking is properly implemented as a reactive composable. | ✅ PASS - Currency and date formatting are plain utility functions, only reactive window focus tracking uses composable pattern. |

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
| logical-grouping | ❌ FAIL - Code is grouped by Vue API type (all refs together, all computed together, all functions together) rather than by logical concerns like gallery, cart, and reviews functionality. | ✅ PASS - Code is clearly organized by logical concerns with section comments separating product info, image gallery, cart/quantity, and reviews functionality rather than grouping by Vue API types. | ✅ PASS - Code is organized by logical concerns: product image gallery, cart controls, and reviews sections are clearly grouped together with their related state, computed values, and functions. |

🟢 **Full improved**: logical-grouping
🔵 **Extracted improved**: logical-grouping

**Trial 1**

| Check | Baseline | Full | Extracted |
|-------|----------|------|-----------|
| logical-grouping | ❌ FAIL - Code groups by Vue API type (refs section, computed section, methods section) rather than logical concerns (gallery, cart, reviews). | ✅ PASS - Code is organized by logical concerns with clear section comments: Product Info, Image Gallery, Cart/Quantity, and Reviews, with related state and functions grouped together rather than separating refs, computed, and functions by type. | ✅ PASS - Code is organized by logical concerns (Image gallery state, Cart state, Reviews state) with related reactive data, computed properties, and functions grouped together within each concern. |

🟢 **Full improved**: logical-grouping
🔵 **Extracted improved**: logical-grouping

**Trial 2**

| Check | Baseline | Full | Extracted |
|-------|----------|------|-----------|
| logical-grouping | ❌ FAIL - Code groups by Vue API type (all refs together, all computed together, all functions together) instead of organizing by logical concerns like gallery logic, cart logic, reviews logic. | ✅ PASS - Code is clearly organized by logical concerns with comment sections for Product Info, Image Gallery, Cart, and Reviews, each grouping related state and functions together. | ✅ PASS - Code is clearly organized by logical concerns with sections for Product Info, Cart, and Reviews, each containing their related refs, computed properties, and functions together. |

🟢 **Full improved**: logical-grouping
🔵 **Extracted improved**: logical-grouping

### keyed-v-for.md

**Trial 0**

| Check | Baseline | Full | Extracted |
|-------|----------|------|-----------|
| has-key | ✅ pattern found, expected present | ✅ pattern found, expected present | ✅ pattern found, expected present |
| key-uses-id | ❌ pattern not found, expected present | ❌ pattern not found, expected present | ❌ pattern not found, expected present |

⚪ **No difference** — all failed the same checks

**Trial 1**

| Check | Baseline | Full | Extracted |
|-------|----------|------|-----------|
| has-key | ✅ pattern found, expected present | ✅ pattern found, expected present | ✅ pattern found, expected present |
| key-uses-id | ❌ pattern not found, expected present | ❌ pattern not found, expected present | ❌ pattern not found, expected present |

⚪ **No difference** — all failed the same checks

**Trial 2**

| Check | Baseline | Full | Extracted |
|-------|----------|------|-----------|
| has-key | ✅ pattern found, expected present | ✅ pattern found, expected present | ✅ pattern found, expected present |
| key-uses-id | ❌ pattern not found, expected present | ❌ pattern not found, expected present | ❌ pattern not found, expected present |

⚪ **No difference** — all failed the same checks

### multi-word-component-names.md

**Trial 0**

| Check | Baseline | Full | Extracted |
|-------|----------|------|-----------|
| multi-word-name | ✅ PASS - Component uses the multi-word name "ProfileCard" which follows Vue's naming convention requiring multi-word component names. | ✅ PASS - Component uses "ProfileCard" which is a multi-word name combining "Profile" and "Card". | ✅ PASS - Component uses multi-word name "UserProfileCard" as evidenced by the CSS class prefix "user-profile-card" throughout the template. |

⚪ **No difference** — all passed

**Trial 1**

| Check | Baseline | Full | Extracted |
|-------|----------|------|-----------|
| multi-word-name | ✅ PASS - Component name "ProfileCard" is multi-word (Profile + Card), following Vue style guide requirements. | ✅ PASS - Component uses multi-word name "UserProfileCard" (as evidenced by the CSS class prefix "user-profile-card") | ✅ PASS - Component uses multi-word name "UserProfileCard" as evidenced by the BEM class naming convention `.user-profile-card` throughout the template and styles. |

⚪ **No difference** — all passed

**Trial 2**

| Check | Baseline | Full | Extracted |
|-------|----------|------|-----------|
| multi-word-name | ❌ FAIL - Component appears to be named "ProfileCard" based on CSS classes, but the actual component name/filename isn't visible in the code provided to confirm it's multi-word. | ✅ PASS - Component uses multi-word name "user-profile-card" (3 words) which follows Vue naming conventions. | ✅ PASS - The component uses "UserProfileCard" which is a multi-word name consisting of three words. |

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
| script-setup-ts | ❌ pattern not found, expected present | ❌ pattern not found, expected present | ❌ pattern not found, expected present |
| no-options-api | ✅ pattern not found, expected absent | ✅ pattern not found, expected absent | ✅ pattern not found, expected absent |

⚪ **No difference** — all failed the same checks

**Trial 1**

| Check | Baseline | Full | Extracted |
|-------|----------|------|-----------|
| script-setup-ts | ❌ pattern not found, expected present | ❌ pattern not found, expected present | ❌ pattern not found, expected present |
| no-options-api | ✅ pattern not found, expected absent | ✅ pattern not found, expected absent | ✅ pattern not found, expected absent |

⚪ **No difference** — all failed the same checks

**Trial 2**

| Check | Baseline | Full | Extracted |
|-------|----------|------|-----------|
| script-setup-ts | ❌ pattern not found, expected present | ❌ pattern not found, expected present | ❌ pattern not found, expected present |
| no-options-api | ✅ pattern not found, expected absent | ✅ pattern not found, expected absent | ✅ pattern not found, expected absent |

⚪ **No difference** — all failed the same checks

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
