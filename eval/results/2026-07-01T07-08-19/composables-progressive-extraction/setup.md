# Setup

- **Model**: claude-sonnet-5
- **Effort**: low
- **Rule file**: composables-progressive-extraction.md
- **Rule mode**: with-rule
- **Allowed tools**: Read, Write, Edit

## Prompt

```
Create a Vue 3 component called SearchPage. It has a search
input, fetches results from an API, and displays them. The search
logic is only used in this one component.
Write files to disk.
```

## Rule content

````markdown
PREFER inline composables; extract to shared `composables/` only when a second consumer exists. Ladder: inline → colocated → shared.
````
