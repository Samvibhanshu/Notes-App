import { describe, expect, it } from 'vitest'
import reducer, { addToNotes, loadNotes, NOTES_KEY, removeFromNotes, resetAllNotes, updateNotes, type Note } from './Redux/noteSlice'
import { createAppStore } from './store'

const note = (id: string, title = `t${id}`, content = `c${id}`): Note =>
  ({ _id: id, title, content, createdAt: '2026-01-01T00:00:00.000Z' })

class MemoryStorage {
  data = new Map<string, string>()
  writes = 0
  getItem(k: string) { return this.data.get(k) ?? null }
  setItem(k: string, v: string) { this.writes++; this.data.set(k, v) }
}

describe('note reducers', () => {
  it('adds, updates and removes by id', () => {
    let s = reducer(undefined, addToNotes(note('1')))
    s = reducer(s, addToNotes(note('2')))
    s = reducer(s, updateNotes(note('1', 'renamed', 'new body')))
    expect(s.notes.map((n) => [n._id, n.title, n.content])).toEqual([['1', 'renamed', 'new body'], ['2', 't2', 'c2']])
    s = reducer(s, removeFromNotes('1'))
    expect(s.notes.map((n) => n._id)).toEqual(['2'])
  })

  it('ignores updates and deletes for ids that do not exist', () => {
    const s = reducer(undefined, addToNotes(note('1')))
    expect(reducer(s, updateNotes(note('nope')))).toEqual(s)
    expect(reducer(s, removeFromNotes('nope')).notes).toEqual(s.notes)
  })

  it('reset empties the list', () => {
    const s = reducer(reducer(undefined, addToNotes(note('1'))), resetAllNotes())
    expect(s.notes).toEqual([])
  })

  it('does not mutate the previous state', () => {
    const before = reducer(undefined, addToNotes(note('1')))
    const snapshot = JSON.stringify(before)
    reducer(before, removeFromNotes('1'))
    reducer(before, updateNotes(note('1', 'x')))
    expect(JSON.stringify(before)).toBe(snapshot)
  })
})

describe('loading saved notes', () => {
  const storageWith = (raw: string | null) => ({ getItem: () => raw })

  it('returns nothing when storage is empty or unavailable', () => {
    expect(loadNotes(storageWith(null))).toEqual([])
    expect(loadNotes(undefined)).toEqual([])
  })

  it('survives corrupted JSON instead of crashing the app on start-up', () => {
    expect(loadNotes(storageWith('{not json'))).toEqual([])
    expect(loadNotes(storageWith('{"a":1}'))).toEqual([])          // valid JSON, but not a list
  })

  it('drops malformed entries and keeps good ones', () => {
    const raw = JSON.stringify([note('1'), { _id: 2, title: 'bad id' }, null, 'text', note('3')])
    expect(loadNotes(storageWith(raw)).map((n) => n._id)).toEqual(['1', '3'])
  })

  it('throwing storage (blocked in private mode) is treated as empty', () => {
    expect(loadNotes({ getItem: () => { throw new Error('SecurityError') } })).toEqual([])
  })
})

describe('persistence', () => {
  it('starts from saved notes and writes back after each change', () => {
    const storage = new MemoryStorage()
    storage.setItem(NOTES_KEY, JSON.stringify([note('1')]))
    storage.writes = 0
    const store = createAppStore(storage)
    expect(store.getState().note.notes.map((n) => n._id)).toEqual(['1'])
    store.dispatch(addToNotes(note('2')))
    expect(JSON.parse(storage.getItem(NOTES_KEY)!).map((n: Note) => n._id)).toEqual(['1', '2'])
    store.dispatch(removeFromNotes('1'))
    expect(JSON.parse(storage.getItem(NOTES_KEY)!).map((n: Note) => n._id)).toEqual(['2'])
    expect(storage.writes).toBe(2)
  })

  it('does not rewrite storage when an action changes nothing', () => {
    const storage = new MemoryStorage()
    const store = createAppStore(storage)
    store.dispatch(removeFromNotes('missing'))
    store.dispatch(updateNotes(note('missing')))
    expect(storage.writes).toBe(0)
  })

  it('keeps working in memory when storage refuses writes', () => {
    const store = createAppStore({ getItem: () => null, setItem: () => { throw new Error('QuotaExceeded') } })
    store.dispatch(addToNotes(note('1')))
    expect(store.getState().note.notes).toHaveLength(1)
  })
})
