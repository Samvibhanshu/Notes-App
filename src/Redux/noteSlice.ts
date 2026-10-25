import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export type Note = {
  _id: string
  title: string
  content: string
  createdAt: string
}

export type NotesState = { notes: Note[] }

export const NOTES_KEY = 'notes'

function isNote(x: unknown): x is Note {
  if (typeof x !== 'object' || x === null) return false
  const n = x as Record<string, unknown>
  return typeof n._id === 'string' && typeof n.title === 'string' &&
    typeof n.content === 'string' && typeof n.createdAt === 'string'
}

/**
 * Reads saved notes. Never throws: missing, corrupted or hand-edited storage would otherwise crash the app on
 * start-up with a blank page, so anything unreadable is treated as "no notes" and malformed entries are dropped.
 */
export function loadNotes(storage: Pick<Storage, 'getItem'> | undefined): Note[] {
  try {
    const raw = storage?.getItem(NOTES_KEY)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed.filter(isNote) : []
  } catch {
    return []
  }
}

const initialState: NotesState = { notes: [] }

/**
 * Reducers are pure: no localStorage writes and no toasts in here. Persistence is a store subscriber
 * (see store.ts) and user feedback happens in the components, which is what Redux requires and what makes
 * these reducers testable on their own.
 */
export const noteSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    addToNotes: (state, action: PayloadAction<Note>) => {
      state.notes.push(action.payload)
    },
    updateNotes: (state, action: PayloadAction<Note>) => {
      const index = state.notes.findIndex((n) => n._id === action.payload._id)
      if (index >= 0) state.notes[index] = action.payload
    },
    resetAllNotes: (state) => {
      state.notes = []
    },
    removeFromNotes: (state, action: PayloadAction<string>) => {
      const index = state.notes.findIndex((n) => n._id === action.payload)
      if (index >= 0) state.notes.splice(index, 1)          // unknown id: leave state untouched (no needless save)
    },
  },
})

export const { addToNotes, updateNotes, resetAllNotes, removeFromNotes } = noteSlice.actions

export default noteSlice.reducer
