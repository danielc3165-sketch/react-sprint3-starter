import { NotePreview } from './NotePreview.jsx'

export function NoteList({ notes, onDeleteNote, onEditNote }) {
  return (
    <ul className="note-list">
      {notes.map((note) => (
        <li key={note.id}>
          <NotePreview
            note={note}
            onDeleteNote={onDeleteNote}
            onEditNote={onEditNote}
          />
        </li>
      ))}
    </ul>
  )
}
