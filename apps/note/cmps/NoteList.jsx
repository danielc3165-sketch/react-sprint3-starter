import { NotePreview } from './NotePreview.jsx'

export function NoteList({
  notes,
  onDeleteNote,
  onEditNote,
  onTogglePin,
  onChangeColor,
  onDuplicateNote,
}) {
  return (
    <ul className="note-list">
      {notes.map((note) => (
        <li key={note.id}>
          <NotePreview
            note={note}
            onDeleteNote={onDeleteNote}
            onEditNote={onEditNote}
            onTogglePin={onTogglePin}
            onChangeColor={onChangeColor}
            onDuplicateNote={onDuplicateNote}
          />
        </li>
      ))}
    </ul>
  )
}
