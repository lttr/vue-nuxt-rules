---
status: draft
---

# Plan: Conventional Commits + Tagged Releases

## Goal

Match setup from `puleo` and `nuxt-config-*` projects — changelogen, no commitlint, manual discipline.

## Steps

1. **Install changelogen**

   ```bash
   pnpm add -D changelogen
   ```

2. **Add release script to package.json**

   ```json
   "release": "nr verify && changelogen --release --push"
   ```

   - No `pnpm publish` (docs site, not npm package)
   - `--push` auto-pushes tags + changelog commit

3. **Create empty CHANGELOG.md**
   - Changelogen will populate on first release

4. **Optionally create initial tag v1.0.0**
   - Or let first `nr release` create it

## Files to Modify

- `package.json` — add changelogen dep + release script
- `CHANGELOG.md` — create (empty or minimal header)

## Verification

1. Run `nr release` (dry-run first with `changelogen --dry`)
2. Check CHANGELOG.md generated correctly
3. Check git tag created

## Unresolved Questions

1. Start from v1.0.0 or v0.x? Current package.json says 1.0.0
2. Want commitlint + husky for enforcement, or stay consistent with your other projects (no enforcement)?
