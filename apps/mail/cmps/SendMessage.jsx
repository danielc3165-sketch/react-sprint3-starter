const { useRef } = React

export function SendMessage({
  setSendMessage,
  setMssInfo,
  sendMss,mssInfo,
  onExitMsg
}) {
  function handleSubmit(event) {
    event.preventDefault()
    sendMss()
  }

  function handelCange({ target }) {
    var { value, name } = target
    //console.log('value',value)
    setMssInfo((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <form
      className="send-message"
      onSubmit={handleSubmit}
    >
      <div id="new-message-div">
        New Message
        <button type="button" onClick={() => {setSendMessage(false),onExitMsg()}}>
          X
        </button>
      </div>

      <div id="send-to">
        To
        <input
          required
          type="email"
          name="adress"
          value={mssInfo.adress || ''}
          onChange={handelCange}
        />
      </div>

      <div>
        <input
          required
          type="text"
          name="subject"
          value={mssInfo.subject || ''}
          onChange={handelCange}
          placeholder="Subject"
        />
      </div>

      <textarea
        required
        className="text-area"
        name="body"
        value={mssInfo.body || ''}
        onChange={handelCange}
      ></textarea>

      <div>
        <button id="send-btn" type="submit">
          send
        </button>
      </div>
    </form>
  )
}
