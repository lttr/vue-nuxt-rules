---
status: complete
---

# Plan: Add Composables Best Practices Rules

## Goal

Create individual atomic rules + overview page for composables best practices.

## Structure

### Overview Page

`content/rules/composables.md` - high-level intro + links to individual rules

### Individual Rules (9 files)

1. **composables-setup-context.md** - Only call in setup
2. **composables-naming.md** - use prefix convention
3. **composables-return-refs.md** - Return object with refs
4. **composables-cleanup.md** - Side effects & cleanup
5. **composables-vs-utils.md** - When to use each
6. **composables-organize-by-concern.md** - Group by logic
7. **composables-input-flexibility.md** - Accept multiple input types
8. **composables-single-responsibility.md** - Focused composables
9. **composables-async-patterns.md** - Async handling

## Files Created

- `content/rules/composables.md`
- `content/rules/composables-setup-context.md`
- `content/rules/composables-naming.md`
- `content/rules/composables-return-refs.md`
- `content/rules/composables-cleanup.md`
- `content/rules/composables-vs-utils.md`
- `content/rules/composables-organize-by-concern.md`
- `content/rules/composables-input-flexibility.md`
- `content/rules/composables-single-responsibility.md`
- `content/rules/composables-async-patterns.md`

## Files Modified

- `content/rules.md` - added Composables section
- `.vitepress/config.mts` - added sidebar section
- `content/ai-agent-rules.md` - added composables rules

## Sources

1. https://vuejs.org/guide/reusability/composables.html
2. https://dev.to/jacobandrewsky/good-practices-and-design-patterns-for-vue-composables-24lk
