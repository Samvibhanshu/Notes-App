import { configureStore } from '@reduxjs/toolkit'
import noteReducer, { loadNotes, NOTES_KEY } from './Redux/noteSlice'

type NoteStorage = Pick<Storage, 'getItem' | 'setItem'>

/** Builds the store from saved notes and writes the notes back whenever they change. */
export function createAppStore(storage: NoteStorage | undefined) {
  const store = configureStore({
    reducer: { note: noteReducer },
    preloadedState: { note: { notes: loadNotes(storage) } },
  })
  let last = store.getState().note.notes
  store.subscribe(() => {
    const notes = store.getState().note.notes
    if (notes === last) return            // Redux Toolkit keeps the same array when nothing changed
    last = notes
    try {
      storage?.setItem(NOTES_KEY, JSON.stringify(notes))
    } catch {
      // storage full or blocked (private mode): keep working in memory
    }
  })
  return store
}

export const store = createAppStore(typeof localStorage === 'undefined' ? undefined : localStorage)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
