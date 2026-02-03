# Vue/Nuxt Rules Eval

Measures which AI rules LLMs already know vs which need explicit injection.

## How It Works

For each rule, the tool:

1. **Generates code without the rule** (baseline) — prompts an LLM with a feature description only
2. **Generates code with the rule loaded** — same prompt, but with the rule placed in `.claude/rules/` in an isolated environment
3. **Evaluates both outputs** against checks (regex patterns and/or AI judge)
4. **Classifies** the rule:
   - **Already Known** — baseline passes all checks (rule adds no value)
   - **High Value** — baseline fails, with-rule passes (rule is needed)
   - **No Improvement** — fails both (rule doesn't help, or check needs tuning)

## Usage

```bash
# Run all evals
node run.mjs

# Single eval
node run.mjs --eval prefer-definemodel

# Override trial count (default: 2)
node run.mjs --trials 3

# Pin model (default: claude-opus-4-5-20251101)
node run.mjs --model claude-sonnet-4-20250514

# Include full rule variant (runs baseline + extracted + full)
node run.mjs --full

# Re-evaluate existing generated code (skip generation)
node run.mjs --skip-generation --results-dir results/2026-01-29T08-00-16
```

### Rule Variants

Each eval runs in an isolated temp environment with credentials copied from `~/.claude/`. Rules are delivered via Claude Code's native `.claude/rules/` mechanism.

| Variant     | Description                                           |
| ----------- | ----------------------------------------------------- |
| `baseline`  | No rule injected (control)                            |
| `extracted` | Only the "Rule for AI agents" code block (default)    |
| `full`      | Entire rule `.md` file (opt-in via `--full` flag)     |

## Eval Definition Format

Each `.yaml` in `evals/` defines one eval:

```yaml
rule: prefer-definemodel.md # rule file in content/rules/
category: props # for filtering
trials: 1 # per-eval override

prompt: |
  Create a Vue 3 SFC component called RatingInput.
  It shows 5 star buttons. The parent needs to read
  and control the selected rating (1-5). Use TypeScript.

checks:
  - id: uses-definemodel
    type: regex
    pattern: "defineModel\\s*[<(]"
    expect: present # or "absent"
  - id: overall-quality
    type: ai-judge
    criteria: |
      Does this use defineModel() correctly?
      PASS or FAIL with brief reason.
```

### Prompt Design

Prompts describe **feature/UX requirements only** — never mention technical patterns or APIs. The LLM must choose the approach on its own.

- ✅ "Create a text input component whose value syncs with the parent"
- ❌ "Create a component using defineModel"

### Check Types

| Type       | Description                                                                    |
| ---------- | ------------------------------------------------------------------------------ |
| `regex`    | Tests pattern against generated code. `expect: present` (default) or `absent`. |
| `ai-judge` | Sends code + criteria to an LLM, expects `PASS` or `FAIL` response.            |

## Output

Results are written to `results/<timestamp>/`:

```
results/2026-01-29T08-00-16/
  report.md                       # markdown summary + detailed breakdown
  prefer-definemodel/
    setup.md                      # model, prompt, system prompt
    trial-0-baseline/
      output/                     # generated code files
      checks.md                   # evaluation check results
    trial-0-extracted/
      output/
      checks.md
    trial-0-full/                 # only if --full flag used
      output/
      checks.md
  ...
```

## Structure

```
eval/
  run.mjs                 # CLI entry point
  lib/
    runner.mjs             # orchestration, spawns claude -p
    evaluator.mjs          # regex checks + AI judge
    extract-rule.mjs       # parses "Rule for AI agents" from .md
    reporter.mjs           # markdown + JSON report generation
  evals/                   # one YAML per rule (25 total)
  results/                 # per-run timestamped dirs
```
