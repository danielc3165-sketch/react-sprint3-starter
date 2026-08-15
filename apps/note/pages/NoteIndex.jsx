const { useState, useEffect } = React

import { noteService } from '../services/note.service.js'
import { NoteAdd } from '../cmps/NoteAdd.jsx'
import { NoteFilter } from '../cmps/NoteFilter.jsx'
import { NoteList } from '../cmps/NoteList.jsx'

export function NoteIndex() {
  const [notes, setNotes] = useState(null)
  const [filterBy, setFilterBy] = useState({
    txt: '',
    type: '',
  })

  useEffect(() => {
    loadNotes()
  }, [filterBy])

  function loadNotes() {
    noteService.query(filterBy).then((notes) => {
      setNotes(sortNotes(notes))
    })
  }

  function onSetFilter(newFilterBy) {
    setFilterBy(newFilterBy)
  }

  function onAddNote(note) {
    noteService.save(note).then(() => {
      loadNotes()
    })
  }

  function onDeleteNote(noteId) {
    noteService.remove(noteId).then(() => {
      loadNotes()
    })
  }

  function onEditNote(updatedNote) {
    saveUpdatedNote(updatedNote)
  }

  function onTogglePin(updatedNote) {
    saveUpdatedNote(updatedNote)
  }

  function onChangeColor(updatedNote) {
    saveUpdatedNote(updatedNote)
  }

  function saveUpdatedNote(updatedNote) {
    noteService.save(updatedNote).then(() => {
      loadNotes()
    })
  }

  function sortNotes(notes) {
    return notes.sort((noteA, noteB) => {
      return Number(noteB.isPinned) - Number(noteA.isPinned)
    })
  }

  if (!notes) return <div>Loading...</div>

  return (
    <section className="note-index container">
      <h2>Notes</h2>

      <NoteAdd onAddNote={onAddNote} />

      <NoteFilter onSetFilter={onSetFilter} />

      <NoteList
        notes={notes}
        onDeleteNote={onDeleteNote}
        onEditNote={onEditNote}
        onTogglePin={onTogglePin}
        onChangeColor={onChangeColor}
      />
    </section>
  )
}