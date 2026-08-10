export function NotePreview({ note }) {
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

  return (
    <article
      className="note-preview"
      style={{ backgroundColor: note.style.backgroundColor }}
    >
      {getNoteContent()}
    </article>
  )
}