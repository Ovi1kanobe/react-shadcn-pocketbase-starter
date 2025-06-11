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
const PBURL = "https://befthcc2024.firetailhosting.com";
```

Replace the value with the URL of your PocketBase server if you host your own instance.

## Usage

After installing dependencies you can start a development server with:

```bash
npm run dev
```

The application will be available at the URL printed in the terminal.
