# VolunteeringUkraine Map

A map of projects where people can volunteer in Ukraine.

## Run locally

Use Node.js 24.14.0 and npm 11.9.0. From this directory, run:

```sh
nvm install
nvm use
npm ci
npm run dev
```

Open the URL printed by Vite. Run `npm run dev:api` in a second terminal to use the administration API on port 3000.
The API reads and writes `src/assets/markers.json`. Saving in the administration form changes that file.

In IntelliJ IDEA, select Node.js 24.14.0 as the project runtime and let npm run configurations use the project runtime.
`nvm use` changes the terminal runtime, not an interpreter pinned in the IDE.

If ports 3000 or 5173 are occupied, start the API and frontend in separate terminals:

```sh
PORT=13000 npm run dev:api
```

```sh
VITE_API_PROXY_TARGET=http://localhost:13000 npm run dev -- --port 15173 --strictPort
```

Set `VITE_BASE_PUBLIC_PATH` when serving under a subdirectory. The default serves from `/`.

## Check the app

```sh
npm run lint
npm run build
npm run serve
```

`npm run lint` checks JavaScript, Vue templates, and styles. ESLint 8, Airbnb, and Tailwind 3 retain the existing configuration.
The scoped Stylelint overrides keep `stylelint-config-recommended-vue` compatible with Stylelint 16 and `postcss-html` 1.
Its unrestricted transitive ranges otherwise select incompatible major versions.

`npm run build` writes the frontend to `dist`. `npm run serve` previews that output without the development API proxy.

Use npm and the committed `package-lock.json` for dependency changes. Run `npm ci` after switching branches or Node.js versions.

## Deployment

Netlify builds with Node.js 24.14.0 and `npm ci && npm run build`, then publishes `dist`.
The local Express API is a separate process and is not deployed by this static build.

- [Live map](https://volunteeringukraine.com/en/map)
- [Embedded Netlify map](https://main--volunteeringukraine.netlify.app/)
- [Netlify project](https://app.netlify.com/projects/volunteeringukraine)

The repository-root GitHub Actions workflow installs and builds both map apps. It also runs this app's lint command.
