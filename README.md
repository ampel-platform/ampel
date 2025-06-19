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

    remix.config.js

### 🗂️ Project Structure (excerpt)
```bash
ampel-ui/
├── app/                 # Remix routes, logic, and components
│   ├── routes/          # File-based routing (Remix)
│   └── components/      # Reusable React UI components
├── public/              # Static assets
├── styles/              # Tailwind & global CSS
├── vite.config.js       # Vite config including aliasing and SSR support
├── remix.config.js      # Remix-specific configuration
├── tailwind.config.js   # Tailwind CSS configuration
└── tsconfig.json        # TypeScript configuration
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


### 📊 Data & Visualization

This project uses:

    recharts for interactive and responsive charts

    @faker-js/faker to generate mock data for development/testing