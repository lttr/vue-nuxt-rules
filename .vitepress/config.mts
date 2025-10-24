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
      { text: "List of all rules", link: "/rules" },
      { text: "AI Agent Rules", link: "/ai-agent-rules" },
      {
        text: "Rules",
        items: [
          {
            text: "Define emits with TypeScript",
            link: "/rules/define-emits-with-typescript",
          },
          {
            text: "Define props with TypeScript",
            link: "/rules/define-props-with-typescript",
          },
          {
            text: "Destructure props",
            link: "/rules/destructure-props",
          },
          {
            text: "Group script by logical concerns",
            link: "/rules/group-script-by-logical-concerns",
          },
          {
            text: "Multi-word component names",
            link: "/rules/multi-word-component-names",
          },
          {
            text: "Keyed v-for",
            link: "/rules/keyed-v-for",
          },
          {
            text: "Prefer defineModel",
            link: "/rules/prefer-definemodel",
          },
          {
            text: "Prefer ref over reactive",
            link: "/rules/prefer-ref-over-reactive",
          },
          {
            text: "Prefer VueUse",
            link: "/rules/prefer-vueuse",
          },
          {
            text: "Same name prop shorthand",
            link: "/rules/same-name-prop-shorthand",
          },
          {
            text: "Script setup with TypeScript",
            link: "/rules/script-setup-with-typescript",
          },
          {
            text: "Template on the top",
            link: "/rules/template-on-the-top",
          },
          {
            text: "Use of instead of in for v-for",
            link: "/rules/use-of-instead-of-in-for-v-for",
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
