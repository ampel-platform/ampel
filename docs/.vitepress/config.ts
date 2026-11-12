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
    sidebar: [
      {
        text: "Technical manual",
        collapsed: true,
        items: [
          {
            text: "Overview",
            link: "/technical-manual/overview.md",
            collapsed: true,
          },
        ],
      },
      {
        text: "Regulatory manual",
        collapsed: true,
        items: [
            { text: "Overview", link: "/regulatory-manual/overview.md",},
            { text: "Medical devices (MDR)", link: "/regulatory-manual/mdr-medical-devices.md" },
            { text: "AI Act", link: "/regulatory-manual/ai-act.md" },
            { text: "In-house medical device software (MDSW)", link: "/regulatory-manual/in-house-mdsw.md" },
            { text: "Quality management system (QMS)", link: "/regulatory-manual/quality-management-system.md" },
            { text: "Data protection (GDPR)", link: "/regulatory-manual/data-protection.md" },
            { text: "Studies", link: "/regulatory-manual/studies.md" },
            { text: "Open source", link: "/regulatory-manual/open-source.md" },
            { text: "Practical advice", link: "/regulatory-manual/practical-advice.md" },
            { text: "More resources", link: "/regulatory-manual/resources.md" },

            {
              text: "QMS documents",
              base: "/qms-documents/",
              collapsed: true,
              items: [
                { text: "Overview", link: "readme.md" },
                { text: "AKI algorithm", link: "algorithm-aki.md" },
                { text: "Architecture and design", link: "architecture.md" },
                { text: "Architecture and design review", link: "architecture-review.md" },
                { text: "Architecture Git mapping", link: "architecture-git-mapping.md" },
                { text: "Deployment procedure", link: "deployment.md" },
                { text: "Development chart", link: "development-chart.md" },
                { text: "Development plan", link: "development-plan.md" },
                { text: "Instructions for use", link: "instructions-for-use.md" },
                { text: "Intended use", link: "intended-use.md" },
                { text: "Market analysis", link: "market-analysis.md" },
                { text: "MDR classification", link: "mdr-classification.md" },
                { text: "Release checklist", link: "checklist-release.md" },
                { text: "Risk analysis table", link: "risk-table.md" },
                { text: "Risk management plan", link: "risk-management-plan.md" },
                { text: "Risk management report", link: "risk-management-report.md" },
                { text: "Risk management review protocol", link: "risk-management-protocol.md" },
                { text: "SOUP list", link: "soup-list.md" },
                { text: "Stakeholder requirements", link: "stakeholder-requirements.md" },
                { text: "Stakeholder requirements review", link: "stakeholder-requirements-review.md" },
                { text: "System requirements", link: "system-requirements.md" },
                { text: "System requirements review", link: "system-requirements-review.md" },
                { text: "Test plan", link: "test-plan.md" },
                { text: "Test protocol AT_01", link: "test-protocol-AT.md" },
                { text: "Test protocol ST_01", link: "test-protocol-ST.md" },
                { text: "Test protocol UIT_Score_AKI_01", link: "test-protocol-UIT.md" },
                { text: "Test report", link: "test-report.md" },
                { text: "Test specifications", link: "test-specifications.md" },
              ],
            },
        ],
      },
      {
        text: "Evidence repository",
        collapsed: true,
        items: [
          { text: "Overview", link : "/evidence-repository/overview.md"},
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
