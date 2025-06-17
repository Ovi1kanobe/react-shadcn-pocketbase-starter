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

3. Configure the PocketBase type generation environment variables so the client
   types can be kept in sync with the server:

   ```bash
   export PB_TYPEGEN_URL=https://example.com
   export PB_TYPEGEN_TOKEN=eyJhbGciOiJI...
   ```

These variables are used by the `pocketbase-typegen` tool.
The `npm run dev` and `npm run build` scripts automatically
invoke `npm run types` to refresh `src/lib/pocketbase-types.ts` when these
variables are set. You can run `npm run types` manually at any time.

## Configuration

The PocketBase instance URL is defined in `src/lib/pburl.ts`:

```ts
const PBURL = import.meta.env.VITE_PB_URL;
if (!PBURL) {
  throw new Error("PB_URL environment variable is not set");
}
```

`VITE_PB_URL` must be provided at build time to point to your PocketBase server.
The application throws an error if this variable is missing.

`vite.config.ts` exposes any variable starting with `VITE_` so `VITE_PB_URL` is
available in the client at build time.

## Usage

After installing dependencies you can start a development server with:

```bash
npm run dev
```

The application will be available at the URL printed in the terminal.

## MFA configuration

When enabling multi-factor authentication in PocketBase you may want to avoid
requiring it for OAuth providers. Use the following filter in your collection
rules:

```text
@request.context != oauth2
```

Without this filter the server can return an `mfaId` during OAuth login and the
client will display an internal server error toast.
