# Notes App

[![ci](https://github.com/Samvibhanshu/Notes-App/actions/workflows/ci.yml/badge.svg)](https://github.com/Samvibhanshu/Notes-App/actions/workflows/ci.yml)

A notes app built with React 19, TypeScript, Redux Toolkit and Vite. Create, edit, view, search, copy and delete notes; everything is saved in the browser, so it works without a backend or sign-in.

## Features

- **Create and edit** from one form: opening a note for editing (`/?noteId=...`) switches the button from *Create* to *Update*.
- **Search** notes by title as you type.
- **View** a note on its own page (`/notes/:id`), and **copy** its content to the clipboard in one click.
- **Delete** a note, with a toast confirming each action.
- **Persistence:** the Redux store is initialised from `localStorage` and written back only when the notes actually change. Corrupted or blocked storage cannot crash the app: unreadable data is ignored and the app keeps working in memory.

## Run it

```bash
npm install
npm run dev       # http://localhost:5173
npm test          # 13 tests (Vitest): reducers, safe loading, persistence, the note page
npm run lint
npm run build     # type-check and production build into dist/
```

## Structure

```
src/
  main.tsx            app entry, Redux provider
  App.tsx             routes: /, /notes, /notes/:id
  store.ts            Redux store; a subscriber saves notes to localStorage
  Redux/noteSlice.ts  pure add / update / remove / reset reducers, safe loading of saved notes
  components/         Navbar, Home (create/edit form), Note (list + search), ViewNote
```

## Design notes

- **Reducers are pure.** Saving to `localStorage` and showing toasts used to happen inside the reducers. Redux requires reducers to be side-effect free, so saving is now a store subscriber and toasts are shown by the components. That also made the reducers testable on their own.
- **Defensive views.** Opening a deleted note's link (or an edit link for one) shows a message instead of crashing.

## Deployment

Deployed on Vercel from this repository. `vercel.json` sends every path to `index.html`, so links to a single note (`/notes/:id`) keep working on refresh instead of returning 404.
