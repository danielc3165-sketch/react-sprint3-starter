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
        </form>
    )
}