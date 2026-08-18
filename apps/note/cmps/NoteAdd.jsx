const { useState } = React

export function NoteAdd({ onAddNote }) {
  const [txt, setTxt] = useState('')

  function handleChange({ target }) {
    setTxt(target.value)
  }

  function onSubmit(ev) {
    ev.preventDefault()

    if (!txt) return

    const note = {
      type: 'NoteTxt',
      isPinned: false,
      createdAt: Date.now(),
      style: {
        backgroundColor: '#ffffff',
      },
      info: {
        txt,
      },
    }

    onAddNote(note)
    setTxt('')
  }

  function onAddVideo() {
    const url = window.prompt('Enter video URL')

    if (!url || !url.trim()) return

    const note = {
      type: 'NoteVideo',
      isPinned: false,
      createdAt: Date.now(),
      style: {
        backgroundColor: '#f8bbd0',
      },
      info: {
        title: 'My video',
        url,
      },
    }

    onAddNote(note)
  }
  function onAddImage() {
    const url = window.prompt('Enter image URL')
    const title = window.prompt('Enter image title')

    if (!url || !url.trim()) return

    const note = {
      type: 'NoteImg',
      isPinned: false,
      createdAt: Date.now(),
      style: {
        backgroundColor: '#d7aefb',
      },
      info: {
        title: title || 'My image',
        url,
      },
    }

    onAddNote(note)
  }

  function onAddTodos() {
    const title = window.prompt('Enter todos title')
    const todosText = window.prompt('Enter todos separated by commas')

    if (!todosText || !todosText.trim()) return

    const todos = todosText
      .split(',')
      .map((txt) => ({
        txt: txt.trim(),
        doneAt: null,
      }))
      .filter((todo) => todo.txt)

    const note = {
      type: 'NoteTodos',
      isPinned: false,
      createdAt: Date.now(),
      style: {
        backgroundColor: '#a7d8f5',
      },
      info: {
        title: title || 'My todos',
        todos,
      },
    }

    onAddNote(note)
  }
  
  return (
    <form className="note-add" onSubmit={onSubmit}>
      <input
        type="text"
        name="txt"
        value={txt}
        onChange={handleChange}
        placeholder="Take a note..."
      />

      <button>Add note</button>

      <button type="button" onClick={onAddVideo}>
        Add video
      </button>
      <button type="button" onClick={onAddImage}>
        Add image
      </button>
      <button type="button" onClick={onAddTodos}>
        Add todos
      </button>
    </form>
  )
}
