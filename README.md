# Notes App

A notes app built with React 19, TypeScript, Redux Toolkit and Vite. Create, edit, view, search, copy and delete notes; everything is saved in the browser, so it works without a backend or sign-in.

## Features

- **Create and edit** from one form: opening a note for editing (`/?noteId=...`) switches the button from *Create* to *Update*.
- **Search** notes by title as you type.
- **View** a note on its own page (`/notes/:id`), and **copy** its content to the clipboard in one click.
- **Delete** a note, with a toast confirming each action.
- **Persistence:** the Redux store is initialised from `localStorage` and written back on every change.

## Run it

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # type-check and production build into dist/
```

## Structure

```
src/
  main.tsx            app entry, Redux provider
  App.tsx             routes: /, /notes, /notes/:id
  store.ts            Redux store
  Redux/noteSlice.ts  add / update / remove reducers, localStorage sync, toasts
  components/         Navbar, Home (create/edit form), Note (list + search), ViewNote
```

## Deployment

Deployed on Vercel from this repository. `vercel.json` sends every path to `index.html`, so links to a single note (`/notes/:id`) keep working on refresh instead of returning 404.
