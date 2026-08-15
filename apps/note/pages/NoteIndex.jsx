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
        noteService.query()
            .then(notes => {
                setNotes(notes)
            })
    }

    function onAddNote(note) {
        noteService.save(note)
            .then(savedNote => {
                setNotes(prevNotes => [...prevNotes, savedNote])
            })
    }

    if (!notes) return <div>Loading...</div>

    return (
        <section className="note-index container">
            <h2>Notes</h2>
            <NoteAdd onAddNote={onAddNote} />
            <NoteList notes={notes} />
        </section>
    )
}