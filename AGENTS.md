# AGENTS Instructions

This repository uses Prettier and ESLint. It is intended to be a static web application built with React 19 and React Router DOM v7. It is a frontend for a PocketBase application. The purpose of this application is to provide a foundation for building other projects off of.

## Repository overview

* **Build tooling:** The project uses Vite and TypeScript to compile the React code. Tailwind CSS and the `shadcn/ui` component library are preconfigured.
* **PocketBase integration:** The client communicates with a PocketBase backend via the official JavaScript SDK. `src/lib/pburl.ts` expects `VITE_PB_URL` to be provided at build time.
* **Generated types:** When `PB_TYPEGEN_URL` and `PB_TYPEGEN_TOKEN` environment variables are set the `pocketbase-typegen` tool generates `src/lib/pocketbase-types.ts`.
* **Scripts:** `npm run dev` starts a development server. `npm run build` creates a production build. `npm run preview` serves the built application for testing.
* **Node version:** Node.js 18 or later is recommended.

## Programmatic checks

Run the following commands after modifying code:

1. `npm run lint` – check for lint issues.
2. `npm run format:fix` – automatically fix formatting.
3. `npm run build` – ensure the project builds with no issues.

`npm run dev` and `npm run build` automatically run `npm run types` when
`PB_TYPEGEN_URL` and `PB_TYPEGEN_TOKEN` environment variables are set. Run
`npm run types` manually if you need to refresh `src/lib/pocketbase-types.ts`.

These commands should succeed before committing.
