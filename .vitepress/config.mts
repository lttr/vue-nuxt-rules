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
    ],

    sidebar: [
      { text: "List of all rules", link: "/rules.md" },
      {
        text: "Rules",
        items: [
          {
            text: "defineEmits with TypeScript",
            link: "/rules/define-emits-with-typescript",
          },
          {
            text: "Define Props With TypeScript",
            link: "/rules/define-props-with-typescript",
          },
          {
            text: "Group script by logical concerns",
            link: "/rules/group-by-functionality",
          },
          {
            text: "Multi-word component names",
            link: "/multi-word-component-names.md",
          },
          {
            text: "Prefer defineModel",
            link: "/rules/prefer-definemodel",
          },
          {
            text: "Prefer Ref Over Reactive",
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
            text: "Script Setup with TypeScript",
            link: "/rules/script-setup-with-typescript",
          },
          {
            text: "Use \"of\" instead of \"in\" for v-for",
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
