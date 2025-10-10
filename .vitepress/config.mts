import { defineConfig } from "vitepress";

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
      {
        text: "Rules",
        items: [
          { text: "Rule 1", link: "/rules" },
          { text: "Rule 2", link: "/rules" },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/lttr/vue-nuxt-rules" },
    ],
  },
});
