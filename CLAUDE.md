# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a VitePress documentation site that provides opinionated code style rules for Vue and Nuxt projects. The rules are designed to be automated via ESLint, TypeScript, or AI-based tools.

## Commands

- `nr dev` - Start VitePress development server
- `nr build` - Build the documentation site
- `nr preview` - Preview the built site

## Architecture

### Content Structure

- **Content directory**: All markdown content lives in `./content/`
- **Rules organization**: Individual rules are in `./content/rules/` with each rule in its own markdown file
- **Rule format**: Each rule file contains:
  - Rule description and rationale
  - "Rule for AI agents" section with code block containing concise rule
  - "Eslint rule" section with link to official ESLint rule
  - "Source" section with link to official Vue/Nuxt documentation

### VitePress Configuration

- **Config file**: `.vitepress/config.mts`
- **Source directory**: `srcDir` is set to `./content`
- **Clean URLs**: Enabled (`cleanUrls: true`)
- **Navigation**: Configured in `themeConfig.nav` and `themeConfig.sidebar`

### Adding New Rules

When adding a new rule:

1. Create a new markdown file in `content/rules/` with a descriptive kebab-case name
2. Follow the existing rule format with sections: description, "Rule for AI agents", "Eslint rule", "Source"
3. Update `.vitepress/config.mts` sidebar to include the new rule in the navigation
4. Update `content/rules.md` to add a link to the new rule

### AI Agent Rules

The `content/ai-agent-rules.md` file contains a consolidated list of all rules in a format optimized for AI agents. When adding rules, update this file to keep it synchronized with individual rule files.
