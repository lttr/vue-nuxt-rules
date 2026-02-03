---
description: Add a new rule to the Vue/Nuxt documentation with proper structure and navigation updates
allowed-tools: Read, Write, Edit, Glob
argument-hint: <rule-name>
---

## Context

This project is a VitePress documentation site with rules organized in `content/rules/`. Each rule follows a specific structure and must be integrated into multiple locations.

## Your task

Add a new rule to the documentation based on the provided rule name argument.

### Step 1: Parse the Rule Name

The command accepts a required argument: `<rule-name>` (e.g., `my-new-rule`, `composable-naming`)

- Convert to kebab-case if not already
- This will be the filename: `content/rules/<rule-name>.md`

### Step 2: Check if Rule Already Exists

Check if the rule file already exists at `content/rules/<rule-name>.md`. If it exists, inform the user and stop.

### Step 3: Determine Category

Read `.vitepress/config.mts` to see the available categories:

- Vue SFC Structure
- Props & State
- Template Directives
- Styles
- Composables

Ask the user which category this rule belongs to.

### Step 4: Create the Rule File

Create a new markdown file at `content/rules/<rule-name>.md` with the following structure:

```markdown
# <Human-readable title>

<Description of the rule and why it's important. Include any context about when this applies and any exceptions.>

## Rule for AI agents
```

- <Concise rule statement for AI agents to follow>

```

## Eslint rule

- <Link to official ESLint rule if available, or state "No ESLint rule available">

## Source

- <Link to official Vue/Nuxt documentation or other authoritative source>
```

**For each content section, follow this workflow:**

1. Generate a suggested version based on the rule name and common Vue/Nuxt patterns
2. Present the suggestion to the user
3. Ask: "Would you like to use this content, or provide your own?"
4. If user wants to provide their own, use their version instead

**Content sections to generate and confirm:**

1. **Human-readable title**: Convert rule-name to title case (e.g., `composable-naming` → `Composable Naming`)
2. **Description**: Infer from rule name and Vue/Nuxt best practices, explain why it matters and any exceptions
   - **IMPORTANT**: Use "Vue" and "Nuxt" generically without version numbers (e.g., "Vue" not "Vue 3", "Nuxt" not "Nuxt 3")
   - Avoid version-specific language to keep rules evergreen
3. **Concise rule for AI agents**: Create a brief, actionable statement starting with a verb (e.g., "ALWAYS...", "NEVER...", "USE...")
4. **ESLint rule link**: Search for related ESLint Vue rules at https://eslint.vuejs.org/rules/ or state "No ESLint rule available"
5. **Source documentation link**: Look for official Vue.js style guide or Nuxt documentation links

Present all suggestions together, then ask the user to confirm or provide alternatives for each section.

### Step 5: Update Sidebar Navigation

Update `.vitepress/config.mts` to add the new rule to the sidebar:

1. Read the config file
2. Find the `items` array under the chosen category section
3. Add a new entry at the end of that category's items:
   ```typescript
   { text: '<Human-readable Title>', link: '/rules/<rule-name>' }
   ```
4. Use the Edit tool to add the entry

### Step 6: Update Rules Index

Update `content/rules.md` to add a link to the new rule:

1. Read the file
2. Add a new list item under the appropriate category section
3. Format: `- [<Human-readable Title>](/rules/<rule-name>)`

### Step 7: Update AI Agent Rules (if applicable)

The file `content/ai-agent-rules.md` contains a curated set of rules inside a code block. Rules are grouped by section (Vue Components, Composables, Styling).

**Only add to ai-agent-rules.md if:**

- The rule provides meaningful guidance for AI code generation
- The rule is not already covered by an existing entry

If adding:

1. Read the file
2. Find the appropriate section inside the code block
3. Add the concise rule statement in the same format as existing entries

### Step 8: Create Eval File

Create an eval file at `eval/evals/<rule-name>.yaml`:

```yaml
rule: <rule-name>.md
category: <category-slug>
trials: 1

prompt: |
  <A realistic prompt that would test whether the AI follows this rule>

checks:
  - id: <check-id>
    type: regex
    pattern: "<regex pattern to verify rule compliance>"
    expect: present # or absent
```

**Category slugs:** `sfc-structure`, `props-state`, `template-directives`, `styles`, `composables`

Ask the user for:

1. A test prompt that would naturally invoke this rule
2. Regex patterns to verify compliance

### Step 9: Confirm Creation

Report success to the user:

```
SUCCESS: Created new rule: <rule-name>

Files updated:
- content/rules/<rule-name>.md (created)
- .vitepress/config.mts (updated sidebar)
- content/rules.md (updated index)
- content/ai-agent-rules.md (updated AI rules) [if applicable]
- eval/evals/<rule-name>.yaml (created)

Next steps:
- Review the generated content
- Run `nr dev` to preview changes
- Run `cd eval && node run.mjs` to test the eval
- Commit the changes when ready
```

### Error Handling

- If rule name is missing: Ask user to provide it
- If rule already exists: Report error and stop
- If sidebar update fails: Report which file needs manual update
- Validate all required sections are present in the rule file

### Usage Examples

```bash
/add-rule composable-naming
/add-rule use-explicit-exports
/add-rule avoid-v-html
```
