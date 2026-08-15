const { useState, useEffect } = React

import { noteService } from '../services/note.service.js'
import { NoteAdd } from '../cmps/NoteAdd.jsx'
import { NoteList } from '../cmps/NoteList.jsx'

export function NoteIndex() {
  const [notes, setNotes] = useState(null)

  useEffect(() => {
    loadNotes()
  }, [])

  function loadNotes() {
    noteService.query().then((notes) => {
      setNotes(notes)
    })
  }

  function onAddNote(note) {
    noteService.save(note).then((savedNote) => {
      setNotes((prevNotes) => [...prevNotes, savedNote])
    })
  }

  function onDeleteNote(noteId) {
    noteService.remove(noteId).then(() => {
      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId))
    })
  }

  function onEditNote(updatedNote) {
    noteService.save(updatedNote).then((savedNote) => {
      setNotes((prevNotes) =>
        prevNotes.map((note) => (note.id === savedNote.id ? savedNote : note))
      )
    })
  }

  if (!notes) return <div>Loading...</div>

  return (
    <section className="note-index container">
      <h2>Notes</h2>
      <NoteAdd onAddNote={onAddNote} />
      <NoteList
        notes={notes}
        onDeleteNote={onDeleteNote}
        onEditNote={onEditNote}
      />
    </section>
  )
}
