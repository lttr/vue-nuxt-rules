# CLAUDE.md

VitePress docs site with Vue/Nuxt code style rules.

## Commands

- `nr dev` / `nr build` / `nr preview`
- `cd eval && node run.mjs` — run rule evals (see `eval/README.md`)

## Adding Rules

1. Create `content/rules/{kebab-name}.md` (copy existing rule format)
2. Add to sidebar in `.vitepress/config.mts`
3. Add link in `content/rules.md`
4. Update `content/ai-agent-rules.md`
5. Create eval in `eval/evals/{rule-name}.yaml`
