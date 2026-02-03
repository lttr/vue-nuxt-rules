import { defineConfig } from "vitepress"

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Vue & Nuxt Rules",
  description:
    "A set of opinionated code style rules for Vue and Nuxt based projects.",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Rules", link: "/rules" },
      { text: "AI Agent Rules", link: "/ai-agent-rules" },
    ],

    sidebar: [
      { text: "All Rules", link: "/rules" },
      { text: "AI Agent Rules", link: "/ai-agent-rules" },
      { text: "Rule Evals", link: "/rule-evals" },
      {
        text: "Vue SFC Structure",
        collapsed: false,
        items: [
          { text: "Overview", link: "/rules/sfc-structure" },
          { text: "Template on the top", link: "/rules/template-on-the-top" },
          {
            text: "Script setup with TypeScript",
            link: "/rules/script-setup-with-typescript",
          },
          {
            text: "Group script by logical concerns",
            link: "/rules/group-script-by-logical-concerns",
          },
          {
            text: "Multi-word component names",
            link: "/rules/multi-word-component-names",
          },
        ],
      },
      {
        text: "Props & State",
        collapsed: false,
        items: [
          { text: "Overview", link: "/rules/props-state" },
          {
            text: "Define props with TypeScript",
            link: "/rules/define-props-with-typescript",
          },
          {
            text: "Define emits with TypeScript",
            link: "/rules/define-emits-with-typescript",
          },
          { text: "Destructure props", link: "/rules/destructure-props" },
          {
            text: "Same name prop shorthand",
            link: "/rules/same-name-prop-shorthand",
          },
          { text: "Prefer defineModel", link: "/rules/prefer-definemodel" },
          {
            text: "Prefer ref over reactive",
            link: "/rules/prefer-ref-over-reactive",
          },
          { text: "Prefer VueUse", link: "/rules/prefer-vueuse" },
        ],
      },
      {
        text: "Template Directives",
        collapsed: false,
        items: [
          { text: "Overview", link: "/rules/template-directives" },
          { text: "Keyed v-for", link: "/rules/keyed-v-for" },
          {
            text: "Use of instead of in for v-for",
            link: "/rules/use-of-instead-of-in-for-v-for",
          },
        ],
      },
      {
        text: "Styles",
        collapsed: false,
        items: [
          { text: "Overview", link: "/rules/styles" },
          { text: "Scoped styles", link: "/rules/scoped-styles" },
        ],
      },
      {
        text: "Composables",
        collapsed: false,
        items: [
          { text: "Overview", link: "/rules/composables" },
          {
            text: "Call in setup context",
            link: "/rules/composables-setup-context",
          },
          { text: "Use 'use' prefix", link: "/rules/composables-naming" },
          {
            text: "Return refs in plain object",
            link: "/rules/composables-return-refs",
          },
          { text: "Clean up side effects", link: "/rules/composables-cleanup" },
          { text: "Composables vs utils", link: "/rules/composables-vs-utils" },
          {
            text: "Organize by concern",
            link: "/rules/composables-organize-by-concern",
          },
          {
            text: "Flexible input types",
            link: "/rules/composables-input-flexibility",
          },
          {
            text: "Single responsibility",
            link: "/rules/composables-single-responsibility",
          },
          { text: "Async patterns", link: "/rules/composables-async-patterns" },
          {
            text: "Thin composables",
            link: "/rules/composables-thin-composables",
          },
          {
            text: "Progressive extraction",
            link: "/rules/composables-progressive-extraction",
          },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/lttr/vue-nuxt-rules" },
    ],
  },
  cleanUrls: true,
  srcDir: "./content",
})
