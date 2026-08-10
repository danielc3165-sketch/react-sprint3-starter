const { useState, useEffect } = React

import { noteService } from '../services/note.service.js'
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

    if (!notes) return <div>Loading...</div>

    return (
        <section className="note-index container">
            <h2>Notes</h2>
            <NoteList notes={notes} />
        </section>
    )
}