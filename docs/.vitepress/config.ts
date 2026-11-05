import { defineConfig } from "vitepress";

const coveredVersion = process.env.VITE_LATEST_RELEASE | "dev";
const base = process.env.DOCS_BASE || "";

export default defineConfig({
  title: "AMPEL Wiki",
  titleTemplate: ":title | AMPEL Wiki",
  description: "AMPEL Wiki",
  base: base,
  lastUpdated: true,
  head: [
    [
      "script",
      {},
      "if (!localStorage.getItem('vitepress-theme-appearance')) localStorage.setItem('vitepress-theme-appearance', 'light')",
    ],
    ["link", { rel: "icon", type: "image/svg+xml", href: base + "/favicon.svg" }],
  ],
  themeConfig: {
    logo: {
      light: "/ampel-wiki-logo.svg",
      dark: "/ampel-wiki-logo-dark.svg",
      alt: "AMPEL logo",
    },
    siteTitle: false,
    nav: [
      {
        text: `${coveredVersion}`,
        items: [
          { text: "Changelog", link: "https://github.com/AMPEL-CDSS-ORG/ampel/commits/main/" },
          { text: "Source code", link: "https://github.com/AMPEL-CDSS-ORG/ampel/tree/main/" },
        ],
      },
    ],
    search: {
      provider: "local",
      options: {
        translations: {
          button: {
            buttonText: "Search",
            buttonAriaLabel: "Search the wiki",
          },
          modal: {
            noResultsText: "No results for",
            resetButtonTitle: "Reset search",
            footer: {
              selectText: "Select",
              navigateText: "Navigate",
              closeText: "Close",
            },
          },
        },
      },
    },
    outline: {
      level: [2, 3],
      label: "On this page",
    },
    editLink: {
      pattern: "https://github.com/AMPEL-CDSS-ORG/ampel/edit/main/docs/:path",
      text: "Edit this page on GitHub",
    },
    lastUpdated: {
      text: "Last updated",
      formatOptions: {
        dateStyle: "medium",
      },
    },
    docFooter: {
      prev: "Previous page",
      next: "Next page",
    },
    socialLinks: [
      { icon: "github", link: "https://github.com/AMPEL-CDSS-ORG/ampel" },
    ],
    sidebarMenuLabel: "Sidebar menu",
    returnToTopLabel: "Return to top",
    darkModeSwitchLabel: "Appearance",
    lightModeSwitchTitle: "Use light theme",
    darkModeSwitchTitle: "Use dark theme",
  },
});
