import { Link, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import type { RootState } from '../store'

const ViewNote = () => {
  const { id } = useParams()
  const note = useSelector((state: RootState) => state.note.notes.find((n) => n._id === id))

  // A deleted note or a mistyped link used to crash the page (note was undefined).
  if (!note) {
    return (
      <div className="m-4">
        <p>Note not found. It may have been deleted.</p>
        <Link to="/notes" className="underline">Back to all notes</Link>
      </div>
    )
  }

  return (
    <div>
      <div className="flex flex-row gap-7">
        <input disabled className="m-4" placeholder="enter title" value={note.title} />
      </div>
      <div>
        <textarea disabled value={note.content} placeholder="likho kuch" />
      </div>
    </div>
  )
}

export default ViewNote
