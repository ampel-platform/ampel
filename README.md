# ⚡ AMPEL UI

**AMPEL UI** is the frontend for the AMPEL system, built with [Remix](https://remix.run/), [React](https://react.dev/), [Vite](https://vitejs.dev/), and [Tailwind CSS](https://tailwindcss.com/). It combines modern SSR capabilities with a modular and performant UI architecture, optimized for developer productivity and fast rendering.

## 🚀 Getting Started

### Prerequisites

- Node.js ≥ 18
- npm ≥ 9

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) with your browser to see the result.

You can start editing the pages found in `app/**`. The pages auto-updates as you edit the files.

### 🔁 Routing

Routing is managed by Remix using file-based routes under app/routes/.

For Vite-specific configurations like module aliasing or SSR behavior, check:

    vite.config.js

We use Remix v2+ with Vite & Flat Routes Mode so we need no remix.config.js file.

### 🗂️ Project Structure (excerpt)

```bash
ampel-ui/
├── app/                          # Remix routes, logic, and components
│   ├── routes/                   # File-based routing utilities (Remix)
│   │   └── root-redirect.tsx     # Redirects and similar logic
│   ├── components/               # Reusable React UI components
│   │   └── alerts/               # Alert-specific pages and components
│   │       ├── components/       # Components specifically for alerts
│   │       ├── PatientAlerts.tsx # Alerts page for patients
│   │       └── types.ts          # Type definitions for alerts
│   └── pages/                    # For pages structured in subfolders, like the alerts page
├── public/                       # Static assets
├── styles/                       # Tailwind & global CSS
├── vite.config.js                # Vite config including aliasing and SSR support
├── tailwind.config.js            # Tailwind CSS configuration
├── eslint.config.js              # ESLint configuration
├── postcss.config.mjs            # Tailwind/PostCSS setup
├── .prettierrc                   # Prettier configuration
└── tsconfig.json                 # TypeScript configuration
```

### 🧪 Linting

```bash
npm run lint
```

This uses .gitignore as ignore path to skip common development artifacts.

### ⚙️ Build & Production

Create a production build

```bash
npm run build
```

Start the production server

```bash
npm run start
```

---

## 🐳 Docker Setup

This project uses a separate Docker configuration for development and production. All relevant Compose files are located in:

- Add/Create the required env files `.env.dev` and `.env.prod`
- `docker/dev/docker-compose.yml` – for local development
- `docker/prod/docker-compose.yml` –  for production-like builds

---

### 📊 Data & Visualization

This project uses:

    recharts for interactive and responsive charts

    @faker-js/faker to generate mock data for development/testing

### 🧹 Code-Qualität & Formatierung

This project uses the following tools to ensure consistent and clean code:

- **Prettier** for automatic code formatting
- **ESLint** for static code analysis
- **lint-staged** to check and format changed files before commits

The configuration is already set up – affected files are automatically formatted and linted during each commit.

👉 See [`.eslint.config.ts`](./eslint.config.ts), [`.prettierrc`](./.prettierrc).
