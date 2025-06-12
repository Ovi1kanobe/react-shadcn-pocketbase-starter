# AGENTS Instructions

This repository uses Prettier and ESLint. It is intended to be a static web application built with React 19 and React Router DOM v7. It is a frontend for a pocketbase application. The purpose of this application is to provide a foundation for building other projects off of.

## Programmatic checks

Run the following commands after modifying code:

1. `npm run lint` – check for lint issues.
2. `npm run format:fix` – automatically fix formatting.
3. `npm run build` – ensure the project builds with no issues.

`npm run dev` and `npm run build` automatically run `npm run types` when
`PB_TYPEGEN_URL` and `PB_TYPEGEN_TOKEN` environment variables are set. Run
`npm run types` manually if you need to refresh `src/lib/pocketbase-types.ts`.

These commands should succeed before committing.
