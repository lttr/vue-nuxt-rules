# Model Version Comparison

Per-rule eval classification across Claude Opus model versions.

## Methodology

Each row reflects the classification produced by the eval suite when running with that specific model as the generator (Claude Code, no other changes). Baseline = prompt with no rule. With-rule = prompt + concise "Rule for AI agents" block. Sonnet 4.6 acts as the judge.

- ✅ `with-rule-better` — rule measurably improves output
- 💪 `already-known` — baseline already passes every check; rule adds nothing
- ❌ `no-improvement` — rule present but checks still fail
- — not run in that batch

Trials per rule: 1–4. Checks per trial: 1–4. Small-N wobbles around the 100% baseline boundary (💪 ↔ ✅) are noise, not capability shifts.

## Results

| Rule                                     | 4.5 | 4.6 | 4.7 |
| ---------------------------------------- | :-: | :-: | :-: |
| composables-async-patterns               | 💪  | 💪  | ✅  |
| composables-cleanup                      | 💪  | 💪  | ✅  |
| composables-cleanup-refactor             | 💪  | 💪  | ✅  |
| composables-input-flexibility            | 💪  | ✅  | ✅  |
| composables-naming                       | 💪  | 💪  | 💪  |
| composables-organize-by-concern          | ✅  | ✅  | 💪  |
| composables-organize-by-concern-refactor | 💪  |  —  |  —  |
| composables-progressive-extraction       | 💪  | 💪  | 💪  |
| composables-return-refs                  | 💪  | 💪  | 💪  |
| composables-setup-context                | 💪  | 💪  | 💪  |
| composables-single-responsibility        | 💪  | 💪  | 💪  |
| composables-thin-composables             | ✅  | ✅  | ✅  |
| composables-vs-utils                     | 💪  | ✅  | 💪  |
| define-emits-with-typescript             | ✅  | ✅  | ✅  |
| define-props-with-typescript             | ✅  | ✅  | ✅  |
| destructure-props                        | ✅  | ✅  | ✅  |
| group-script-by-logical-concerns         | ✅  | ✅  | ✅  |
| keyed-v-for                              | 💪  | 💪  | 💪  |
| multi-word-component-names               | ✅  | 💪  | 💪  |
| no-mutating-props                        | 💪  | ✅  | ✅  |
| no-side-effects-in-computed              | ❌  | ✅  | ✅  |
| prefer-definemodel                       | 💪  | ✅  | ✅  |
| prefer-ref-over-reactive                 | 💪  | 💪  | 💪  |
| prefer-ref-over-reactive-refactor        | ✅  | ✅  | 💪  |
| prefer-vueuse                            | ✅  | ✅  | ✅  |
| prefer-vueuse-refactor                   | ✅  | ✅  | ✅  |
| same-name-prop-shorthand                 | ✅  | ✅  | ✅  |
| scoped-styles                            | 💪  | 💪  | 💪  |
| script-setup-with-typescript             | ✅  | ✅  | ✅  |
| template-on-the-top                      | 💪  | ✅  | ✅  |
| use-of-instead-of-in-for-v-for           | ✅  | ✅  | ✅  |

## Totals

|                     | 4.5 | 4.6 | 4.7 |
| ------------------- | :-: | :-: | :-: |
| ✅ with-rule-better | 13  | 18  | 18  |
| 💪 already-known    | 17  | 12  | 12  |
| ❌ no-improvement   |  1  |  0  |  0  |

## Observations

**No regression 4.6 → 4.7.** Aggregate totals match. Capability-level progress appears only in isolated rules where 4.5 previously failed even with the rule.

**Monotonic improvement across versions:**

- `no-side-effects-in-computed` — ❌ → ✅ → ✅. The only rule 4.5 couldn't fix even when told.
- `template-on-the-top`, `prefer-definemodel`, `no-mutating-props`, `composables-input-flexibility` — baseline weakened, so the rule became load-bearing.

**4.7 now handles unprompted** (was ✅ before, now 💪):

- `composables-organize-by-concern`
- `prefer-ref-over-reactive-refactor`

These are wins for the model, but reduce the ROI of keeping the rule in a prompt pack.

**Highest-ROI rules on 4.7** (baseline scored 0/N last run): `composables-input-flexibility`, `define-emits-with-typescript`, `prefer-definemodel`, `prefer-vueuse`, `same-name-prop-shorthand`, `use-of-instead-of-in-for-v-for`.

**Candidates for demotion on 4.7** (model applies without instruction):
`composables-setup-context`, `composables-naming`, `composables-return-refs`, `composables-single-responsibility`, `composables-progressive-extraction`, `composables-vs-utils`, `composables-organize-by-concern`, `keyed-v-for`, `multi-word-component-names`, `scoped-styles`, `prefer-ref-over-reactive`, `prefer-ref-over-reactive-refactor`.

## Sources

- 4.5 — `eval/results/2026-02-03T16-43-41/`
- 4.6 — `eval/results/2026-02-09T09-51-53/` (+ Feb 10 for `no-side-effects-in-computed`)
- 4.7 — `eval/results/2026-04-17T15-33-32/`
