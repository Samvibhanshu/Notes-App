import { describe, expect, it } from 'vitest'
import { renderToString } from 'react-dom/server'
import { Provider } from 'react-redux'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import ViewNote from './components/ViewNote'
import { addToNotes } from './Redux/noteSlice'
import { createAppStore } from './store'

function render(path: string) {
  const store = createAppStore(undefined)
  store.dispatch(addToNotes({ _id: '42', title: 'Groceries', content: 'milk, eggs', createdAt: '2026-01-01T00:00:00.000Z' }))
  return renderToString(
    <Provider store={store}>
      <MemoryRouter initialEntries={[path]}>
        <Routes>
          <Route path="/notes/:id" element={<ViewNote />} />
        </Routes>
      </MemoryRouter>
    </Provider>,
  )
}

describe('ViewNote page', () => {
  it('shows the title AND the content of the note', () => {
    const html = render('/notes/42')
    expect(html).toContain('Groceries')
    expect(html).toContain('milk, eggs')      // previously read note.value, which does not exist, so the body was blank
  })

  it('shows a message instead of crashing for an unknown id', () => {
    expect(render('/notes/does-not-exist')).toContain('Note not found')
  })
})
