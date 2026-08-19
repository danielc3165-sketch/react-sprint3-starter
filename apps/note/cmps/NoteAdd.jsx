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
    </form>
  )
}
