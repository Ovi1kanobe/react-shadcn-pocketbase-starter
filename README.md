# React shadcn PocketBase Starter

This project is a small React 19 starter template that integrates [PocketBase](https://pocketbase.io) on the backend and the [shadcn/ui](https://ui.shadcn.com/) component library on the frontend. It can be used as a starting point for building a fully featured application with authentication, UI components and a preconfigured build pipeline.

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Run the standard quality checks and make sure the project builds:

   ```bash
   npm run lint
   npm run format:fix
   npm run build
   ```

## Configuration

The PocketBase instance URL is defined in `src/lib/pburl.ts`:

```ts
const PBURL = import.meta.env.PB_URL;
if (!PBURL) {
  throw new Error("PB_URL environment variable is not set");
}
```

`PB_URL` must be provided at build time to point to your PocketBase server.
The application throws an error if this variable is missing.

`vite.config.ts` exposes any variable starting with `PB_` so `PB_URL` is
available in the client at build time.

## Usage

After installing dependencies you can start a development server with:

```bash
npm run dev
```

The application will be available at the URL printed in the terminal.

## Routing

This template does not include client side routing by default. To add
navigation between pages you can install [React Router](https://reactrouter.com):

```bash
npm install react-router-dom
```

Wrap the providers in `src/main.tsx` with `BrowserRouter` and define your routes
inside `src/App.tsx` using the `Routes` and `Route` components.
