# Model Comparison

Per-rule eval classification across Claude model versions.

## Methodology

Each row reflects the classification produced by the eval suite when running with that specific model as the generator (Claude Code, no other changes). Baseline = prompt with no rule. With-rule = prompt + concise "Rule for AI agents" block. Sonnet 4.6 acts as the judge. Runs use each model's **default** reasoning effort, **except Sonnet 5**, which was run at **low** effort (`--effort low`) — so that column is not a clean effort-for-effort comparison against the others.

- ✅ `with-rule-better` — rule measurably improves output
- 💪 `already-known` — baseline already passes every check; rule adds nothing
- ❌ `no-improvement` — rule present but checks still fail
- — not run in that batch

Trials per rule: 1–4. Checks per trial: 1–4. Small-N wobbles around the 100% baseline boundary (💪 ↔ ✅) are noise, not capability shifts.

## Results

| Rule                                     | Opus 4.5 | Opus 4.6 | Opus 4.7 | Opus 4.8 | Sonnet 4.6 | Sonnet 5 (low) |
| ---------------------------------------- | :------: | :------: | :------: | :------: | :--------: | :------------: |
| composables-async-patterns               |    💪    |    💪    |    ✅    |    💪    |     💪     |       💪       |
| composables-cleanup                      |    💪    |    💪    |    ✅    |    💪    |     💪     |       💪       |
| composables-cleanup-refactor             |    💪    |    💪    |    ✅    |    ✅    |     ✅     |       ✅       |
| composables-input-flexibility            |    💪    |    ✅    |    ✅    |    💪    |     ✅     |       ✅       |
| composables-naming                       |    💪    |    💪    |    💪    |    💪    |     💪     |       💪       |
| composables-organize-by-concern          |    ✅    |    ✅    |    💪    |    ✅    |     💪     |       💪       |
| composables-organize-by-concern-refactor |    💪    |    —     |    —     |    —     |     —      |       —        |
| composables-progressive-extraction       |    💪    |    💪    |    💪    |    💪    |     💪     |       💪       |
| composables-return-refs                  |    💪    |    💪    |    💪    |    💪    |     💪     |       💪       |
| composables-setup-context                |    💪    |    💪    |    💪    |    💪    |     💪     |       💪       |
| composables-single-responsibility        |    💪    |    💪    |    💪    |    💪    |     💪     |       💪       |
| composables-thin-composables             |    ✅    |    ✅    |    ✅    |    ✅    |     ✅     |       ✅       |
| composables-vs-utils                     |    💪    |    ✅    |    💪    |    💪    |     ✅     |       💪       |
| define-emits-with-typescript             |    ✅    |    ✅    |    ✅    |    ✅    |     ✅     |       ✅       |
| define-props-with-typescript             |    ✅    |    ✅    |    ✅    |    ✅    |     ✅     |       ✅       |
| destructure-props                        |    ✅    |    ✅    |    ✅    |    ✅    |     ✅     |       ✅       |
| group-script-by-logical-concerns         |    ✅    |    ✅    |    ✅    |    ✅    |     ✅     |       ✅       |
| keyed-v-for                              |    💪    |    💪    |    💪    |    💪    |     💪     |       💪       |
| multi-word-component-names               |    ✅    |    💪    |    💪    |    💪    |     💪     |       💪       |
| no-mutating-props                        |    💪    |    ✅    |    ✅    |    ✅    |     ✅     |       ✅       |
| no-side-effects-in-computed              |    ❌    |    ✅    |    ✅    |    ✅    |     ✅     |       ✅       |
| prefer-definemodel                       |    💪    |    ✅    |    ✅    |    💪    |     ✅     |       ✅       |
| prefer-ref-over-reactive                 |    💪    |    💪    |    💪    |    💪    |     💪     |       💪       |
| prefer-ref-over-reactive-refactor        |    ✅    |    ✅    |    💪    |    ✅    |     💪     |       ✅       |
| prefer-vueuse                            |    ✅    |    ✅    |    ✅    |    ✅    |     ✅     |       ✅       |
| prefer-vueuse-refactor                   |    ✅    |    ✅    |    ✅    |    ✅    |     ✅     |       ✅       |
| same-name-prop-shorthand                 |    ✅    |    ✅    |    ✅    |    ✅    |     ✅     |       ✅       |
| scoped-styles                            |    💪    |    💪    |    💪    |    💪    |     💪     |       💪       |
| script-setup-with-typescript             |    ✅    |    ✅    |    ✅    |    ✅    |     ✅     |       ✅       |
| template-on-the-top                      |    💪    |    ✅    |    ✅    |    ✅    |     💪     |       💪       |
| use-of-instead-of-in-for-v-for           |    ✅    |    ✅    |    ✅    |    ✅    |     ✅     |       ✅       |

## Totals

|                     | Opus 4.5 | Opus 4.6 | Opus 4.7 | Opus 4.8 | Sonnet 4.6 | Sonnet 5 (low) |
| ------------------- | :------: | :------: | :------: | :------: | :--------: | :------------: |
| ✅ with-rule-better |    13    |    18    |    18    |    16    |     16     |       16       |
| 💪 already-known    |    17    |    12    |    12    |    14    |     14     |       14       |
| ❌ no-improvement   |    1     |    0     |    0     |    0     |     0      |       0        |

## Observations

**Opus 4.8 absorbs four rules unprompted** (was ✅ on 4.7, now 💪): `composables-async-patterns`, `composables-cleanup`, `composables-input-flexibility`, `prefer-definemodel`. The 4.8 baseline now scores full marks on prompts that needed the rule on 4.7 — capability moved up, so these rules add nothing in a 4.8 prompt pack.

**Opus 4.8 baseline weakened on two rules** (was 💪 on 4.7, now ✅): `composables-organize-by-concern`, `prefer-ref-over-reactive-refactor`. These flips sit on the small-N 💪 ↔ ✅ boundary (baselines of 1/2 and 2/4); treat as noise rather than a real regression. Net effect is a wash on totals (16✅/14💪, identical to Sonnet 4.6).

**Sonnet 5 (low effort) matches the 16✅/14💪 totals** of Opus 4.8 and Sonnet 4.6, but at low reasoning effort, so read it as a floor rather than a like-for-like point. Two rules where it differs from Sonnet 4.6: `composables-vs-utils` flips 💪 (Sonnet 5's baseline stops wrapping pure formatters in a composable) and `prefer-ref-over-reactive-refactor` flips ✅ (baseline no longer refactors `reactive` to `ref` on its own). Net totals unchanged. A default-effort Sonnet 5 run would likely absorb more rules into 💪 — worth a follow-up before drawing conclusions.

**No regression Opus 4.6 → 4.7.** Aggregate totals match. Capability-level progress appears only in isolated rules where 4.5 previously failed even with the rule.

**Monotonic improvement across Opus versions:**

- `no-side-effects-in-computed` — ❌ → ✅ → ✅. The only rule 4.5 couldn't fix even when told.
- `template-on-the-top`, `prefer-definemodel`, `no-mutating-props`, `composables-input-flexibility` — baseline weakened, so the rule became load-bearing.

**Opus 4.7 handles unprompted** (was ✅ before, now 💪):

- `composables-organize-by-concern`
- `prefer-ref-over-reactive-refactor`

These are wins for the model, but reduce the ROI of keeping the rule in a prompt pack.

**Sonnet 4.6 vs Opus 4.7.** Totals close (16✅/14💪 vs 18✅/12💪). Same core pattern: props/template-directive rules remain high-ROI on both; composable shape rules are already-known on both.

Rules Opus 4.7 needed but Sonnet 4.6 already knows (💪 instead of ✅):

- `composables-async-patterns`, `composables-cleanup`, `template-on-the-top` — Sonnet's baseline scored full marks on the last Opus run's failing trials.

Rule where Opus 4.7 is unprompted but Sonnet needs it:

- `composables-vs-utils` — Sonnet occasionally wraps pure formatters in a composable; rule corrects it.

**Caveat for Sonnet 4.6** on `composables-input-flexibility`: rule flips classification to ✅ but the `flexible-input` check (requires `MaybeRefOrGetter` typing) still fails in both trials. Sonnet applies `toValue` but does not type the params. Rule wording may need tightening.

**Highest-ROI rules on Opus 4.7** (baseline scored 0/N last run): `composables-input-flexibility`, `define-emits-with-typescript`, `prefer-definemodel`, `prefer-vueuse`, `same-name-prop-shorthand`, `use-of-instead-of-in-for-v-for`.

**Candidates for demotion on Opus 4.7** (model applies without instruction):
`composables-setup-context`, `composables-naming`, `composables-return-refs`, `composables-single-responsibility`, `composables-progressive-extraction`, `composables-vs-utils`, `composables-organize-by-concern`, `keyed-v-for`, `multi-word-component-names`, `scoped-styles`, `prefer-ref-over-reactive`, `prefer-ref-over-reactive-refactor`.

## Sources

- Opus 4.5 — `eval/results/2026-02-03T16-43-41/`
- Opus 4.6 — `eval/results/2026-02-09T09-51-53/` (+ Feb 10 for `no-side-effects-in-computed`)
- Opus 4.7 — `eval/results/2026-04-17T15-33-32/`
- Opus 4.8 — `eval/results/2026-06-15T13-53-16/`
- Sonnet 4.6 — `eval/results/2026-04-20T08-34-45/`
- Sonnet 5 (low effort) — `eval/results/2026-07-01T07-08-19/`
