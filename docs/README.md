# AMPEL Wiki

The AMPEL wiki powered by [VitePress](https://vitepress.dev) using an extended default theme.

## Local development

Requires Node.js 18 or newer and npm.

```bash
cd docs
npm ci
npm run docs:dev
```

## Structure

- `docs/index.md`: minimal branded homepage.
- `docs/.vitepress/config.ts`: site metadata, navigation, search, and deployment base.
- `docs/.vitepress/theme/`: AMPEL layout, footer, colors and responsive styles.
- `docs/public/`: AMPEL logos and background image.

## Adding content

Add Markdown pages under `docs/` and their navigation entries to the `sidebar` array in `docs/.vitepress/config.ts`. Homepage text and feature cards can be added through `docs/index.md`. Add legal pages and their footer links when preparing the site's content.
