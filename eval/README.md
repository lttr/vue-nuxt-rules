# Vue/Nuxt Rules Eval

Measures which AI rules LLMs already know vs which need explicit injection.

## How It Works

Uses `claude -p` with an assembled `.claude/` folder to simulate real usage. For each rule:

1. **Baseline** — generate code without the rule
2. **With rule** — same prompt, rule in `.claude/rules/`
3. **Evaluate** both against checks (regex + AI judge)
4. **Classify**:
   - **Already Known** — baseline passes (rule adds no value)
   - **High Value** — baseline fails, with-rule passes
   - **No Improvement** — both fail

## Usage

```bash
node run.mjs                              # all evals
node run.mjs --eval prefer-definemodel    # single eval
node run.mjs --trials 3                   # override trials (default: 2)
node run.mjs --model claude-sonnet-4-20250514
node run.mjs --concurrency 5              # parallel evals (default: 3)
node run.mjs --full                       # also test full rule markdown (3 variants)
node run.mjs --skip-generation --results-dir results/2026-01-29T08-00-16
```

## Eval Definition

Each `.yaml` in `evals/` defines one eval:

```yaml
rule: prefer-definemodel.md
prompt: |
  Create a Vue 3 SFC component called RatingInput.
  It shows 5 star buttons. The parent needs to read
  and control the selected rating (1-5). Use TypeScript.

checks:
  - id: uses-definemodel
    type: regex
    pattern: "defineModel\\s*[<(]"
    expect: present
  - id: overall-quality
    type: ai-judge
    criteria: |
      Does this use defineModel() correctly?
      PASS or FAIL with brief reason.
```

Prompts describe **feature requirements only** — never mention APIs. The LLM chooses.

## Output

```
results/<timestamp>/
  report.md
  prefer-definemodel/
    setup.md
    trial-0-baseline/
      output/
      checks.md
    trial-0-with-rule/
      output/
      checks.md
```

## Optimizations

- Parallel generation (configurable `--concurrency`)
- Adaptive trials: stable rules get 1, flaky get 2
- Baseline skipping for already-known rules
- Batched AI judge calls
- Flakiness tracking (⚠️ if >20% variance)
