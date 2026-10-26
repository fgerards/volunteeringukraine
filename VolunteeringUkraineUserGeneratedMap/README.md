# VolunteeringUkraine user-generated map

A Vue and Leaflet map backed by Firebase Authentication and Realtime Database.

## Run locally

Use Node.js 24.14.0 and npm 11.9.0. Firebase 13 requires Node.js 24.12 or later.
From this directory, run:

```sh
nvm install
nvm use
npm ci
npm run dev
```

Open the URL printed by Vite. To use a separate port while the other map runs:

```sh
npm run dev -- --port 15174 --strictPort
```

The app connects to the Firebase project configured in `src/firebaseConfig.js`.
Map clicks can write to the live database. Use the **Sign In** button to start Google sign-in.

## Build and preview

```sh
npm run build
npm run preview
```

The build writes the app to `dist`. Firebase Hosting publishes this directory, so build before any separately authorized deployment.
A successful local build does not verify Firebase sign-in or database writes.

Use npm and the committed `package-lock.json` for dependency changes. Run `npm ci` after switching branches or Node.js versions.
The repository-root GitHub Actions workflow installs and builds both map apps.

The scoped `@grpc/grpc-js` override replaces Firebase Firestore's pinned vulnerable release with a patched version.
The app uses Realtime Database, not Firestore.
