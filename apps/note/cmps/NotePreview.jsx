export function NotePreview({ note, onDeleteNote, onEditNote }) {
  function getNoteContent() {
    switch (note.type) {
      case 'NoteTxt':
        return <p>{note.info.txt}</p>

      case 'NoteImg':
        return (
          <div>
            <h3>{note.info.title}</h3>
            <img src={note.info.url} alt={note.info.title} />
          </div>
        )

      case 'NoteTodos':
        return (
          <div>
            <h3>{note.info.title}</h3>
            <ul>
              {note.info.todos.map((todo, idx) => (
                <li key={idx}>{todo.txt}</li>
              ))}
            </ul>
          </div>
        )
    }
  }

  function onEdit() {
    const txt = window.prompt('Edit note', note.info.txt)

    if (!txt || !txt.trim()) return

    const updatedNote = {
      ...note,
      info: {
        ...note.info,
        txt,
      },
    }

    onEditNote(updatedNote)
  }

  return (
    <article
      className="note-preview"
      style={{ backgroundColor: note.style.backgroundColor }}
    >
      {getNoteContent()}

      <div className="note-actions">
        {note.type === 'NoteTxt' && <button onClick={onEdit}>Edit</button>}
        <button onClick={() => onDeleteNote(note.id)}>Delete</button>
      </div>
    </article>
  )
}
