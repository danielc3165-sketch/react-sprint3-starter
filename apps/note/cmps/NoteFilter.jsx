const { useState } = React

export function NoteFilter({ onSetFilter }) {
  const [filterBy, setFilterBy] = useState({
    txt: '',
    type: '',
  })

  function handleChange({ target }) {
    const { name, value } = target

    setFilterBy((prevFilterBy) => ({
      ...prevFilterBy,
      [name]: value,
    }))
  }

  function onSubmit(ev) {
    ev.preventDefault()
    onSetFilter(filterBy)
  }

  return (
    <form className="note-filter" onSubmit={onSubmit}>
      <input
        type="text"
        name="txt"
        value={filterBy.txt}
        onChange={handleChange}
        placeholder="Search notes..."
      />

      <select name="type" value={filterBy.type} onChange={handleChange}>
        <option value="">All types</option>
        <option value="NoteTxt">Text</option>
        <option value="NoteImg">Image</option>
        <option value="NoteTodos">Todos</option>
      </select>

      <button>Filter</button>
    </form>
  )
}