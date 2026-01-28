---
created: 2026-01-27
type: plan
status: complete
references:
  - https://michaelnthiessen.com/composable-patterns-in-vue
  - https://michaelnthiessen.com/inline-composables
  - https://alexop.dev/posts/inline-vue-composables-refactoring/
  - https://alexop.dev/posts/mastering-vue-3-composables-a-comprehensive-style-guide/
---

# Add Composable Rules from Article Analysis

## Goal

Enrich existing composable rules with insights from 4 articles (Thiessen, Alex Op). 3 merges into existing rules, 2 new rule files, 1 overview expansion.

## Steps

### 1. Merge into existing rules

**`content/rules/composables-naming.md`** — add file naming + one composable per file

- `useFeatureName.ts` (camelCase with `use` prefix)

**`content/rules/composables-vs-utils.md`** — add no UI side effects

- No toasts, modals, alerts inside composables
- Expose error/status state → components decide presentation

**`content/rules/composables-organize-by-concern.md`** — add internal ordering

- Recommended: state → metadata (loading/error) → methods → return

### 2. Create new rule files

**`content/rules/composables-thin-composables.md`** — Functional core, imperative shell

- Separate pure business logic from reactivity wrapper
- Test pure functions without Vue context

**`content/rules/composables-progressive-extraction.md`** — Don't make reusable until reused

- Ladder: inline → colocated file → shared `composables/`
- Start inline, promote when actually needed

### 3. Expand overview page (`content/rules/composables.md`)

Add "Patterns & Techniques" section (not formal rules):

- Options object pattern (generic JS, not composable-specific)
- Async + sync dual support

### 4. Update navigation & indexes

- `.vitepress/config.mts` sidebar — add 2 new rules
- `content/rules.md` — add links
- `content/ai-agent-rules.md` — update all changes

## Unresolved Questions

None.

## Verification

- `nr build` passes
- New rules visible in sidebar
