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

Check if the rule file already exists:

```bash
if [[ -f "content/rules/<rule-name>.md" ]]; then
  echo "ERROR: Rule already exists: content/rules/<rule-name>.md"
  exit 1
fi
```

If it exists, inform the user and stop.

### Step 3: Create the Rule File

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

**Example structure** (from `content/rules/multi-word-component-names.md`):

```markdown
# Multi-word component names

This rule require component names to be always multi-word, except for root App components, and built-in components provided by Vue, such as `<transition>` or `<component>`. This prevents conflicts with existing and future HTML elements, since all HTML elements are single words.

For Nuxt, there has to be some exceptions:

- `app.vue`
- `error.vue`
- `pages/*.vue`
- `layouts/*.vue`

## Rule for AI agents
```

- ALWAYS use multi-word component names except for Nuxt pages and layouts

```

## Eslint rule

- https://eslint.vuejs.org/rules/multi-word-component-names.html#related-rules

## Source

- https://vuejs.org/style-guide/rules-essential.html#use-multi-word-component-names
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

### Step 4: Update Sidebar Navigation

Update `.vitepress/config.mts` to add the new rule to the sidebar:

1. Read the config file
2. Find the `items` array under the `/rules/` section
3. Add a new entry in alphabetical order:
   ```typescript
   { text: '<Human-readable Title>', link: '/rules/<rule-name>' }
   ```
4. Use the Edit tool to add the entry

### Step 5: Update Rules Index

Update `content/rules.md` to add a link to the new rule:

1. Read the file
2. Add a new list item in the appropriate location (alphabetically or by category)
3. Format: `- [<Human-readable Title>](/rules/<rule-name>)`

### Step 6: Update AI Agent Rules

Update `content/ai-agent-rules.md` to include the new rule:

1. Read the file
2. Add the concise rule statement to the list
3. Keep consistent formatting with existing entries

### Step 7: Confirm Creation

Report success to the user:

```
SUCCESS: Created new rule: <rule-name>

Files updated:
- content/rules/<rule-name>.md (created)
- .vitepress/config.mts (updated sidebar)
- content/rules.md (updated index)
- content/ai-agent-rules.md (updated AI rules)

Next steps:
- Review the generated content
- Run `nr dev` to preview changes
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
