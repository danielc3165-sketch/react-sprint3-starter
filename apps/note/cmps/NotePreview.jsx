export function NotePreview({
  note,
  onDeleteNote,
  onEditNote,
  onTogglePin,
  onChangeColor,
  onDuplicateNote,
}) {
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

      case 'NoteVideo':
        return (
          <div>
            <h3>{note.info.title}</h3>
            <iframe
              src={note.info.url}
              title={note.info.title}
              allowFullScreen
            ></iframe>
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

      default:
        return <p>Unknown note type</p>
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

  function onPin() {
    const updatedNote = {
      ...note,
      isPinned: !note.isPinned,
    }

    onTogglePin(updatedNote)
  }

  function onColorChange({ target }) {
    const updatedNote = {
      ...note,
      style: {
        ...note.style,
        backgroundColor: target.value,
      },
    }

    onChangeColor(updatedNote)
  }

  function onSendEmail() {
    let subject = note.info.title || 'My note'
    let body = note.info.txt || note.info.url || ''

    if (note.type === 'NoteTodos') {
      body = note.info.todos.map((todo) => todo.txt).join('\n')
    }

    const mailUrl =
      '/mail?subject=' +
      encodeURIComponent(subject) +
      '&body=' +
      encodeURIComponent(body)

    window.location.hash = mailUrl
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

        <button onClick={() => onDuplicateNote(note)}>Duplicate</button>

        <button onClick={onPin}>{note.isPinned ? 'Unpin' : 'Pin'}</button>

        <label className="color-button">
          Change color
          <input
            type="color"
            value={note.style.backgroundColor}
            onChange={onColorChange}
          />
        </label>

        <button onClick={onSendEmail}>Send as email</button>
      </div>
    </article>
  )
}
