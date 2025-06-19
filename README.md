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
│   ├── routes/                   # File-based routing utils (Remix)
│   │   └── root-redirect.tsx     # Weiterleitungen o.ä.
│   ├── components/               # Reusable React UI components
│   │   └── alerts/               # Alerts-spezifische Seiten und Komponenten
│   │       ├── components/       # Komponenten speziell für Alerts
│   │       ├── PatientAlerts.tsx # Alerts-Seite für Patienten
│   │       └── types.ts          # Typdefinitionen für Alerts
│   └── pages/                    # For the pages structured in more sub foulders like the alerts page
├── public/                       # Static assets
├── styles/                       # Tailwind & global CSS
├── vite.config.js                # Vite config including aliasing and SSR support
├── tailwind.config.js            # Tailwind CSS configuration
├── eslint.config.js              # ESLint-Konfiguration
├── postcss.config.mjs            # Tailwind/PostCSS Setup
├── .prettierrc                   # Prettier-Konfiguration
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

This will run remix-serve using the built server entry in build/server/index.js.

frontend (use chrome): http://10.101.188.93:3000/alerts/patients/123/cases/456
backend: http://localhost:3000

### 📊 Data & Visualization

This project uses:

    recharts for interactive and responsive charts

    @faker-js/faker to generate mock data for development/testing
