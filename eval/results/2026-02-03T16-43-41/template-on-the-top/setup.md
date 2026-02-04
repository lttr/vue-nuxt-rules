# Setup

- **Model**: claude-opus-4-5-20251101
- **Rule file**: template-on-the-top.md
- **Rule mode**: with-rule
- **Allowed tools**: Read, Write, Edit

## Prompt

```
Create a Vue 3 component called NotificationBell.
It displays a bell icon with a badge showing the number of unread
notifications. Clicking the bell toggles a dropdown list of
recent notifications. Use simple styles.

```

## Rule content

````markdown
- ALWAYS place the <template> section at the top of Vue SFC files, before <script> and <style> sections
````
