export function SendMessage({sendMessage,setSendMessage}){

    //console.log('sendMessage',sendMessage)

return <form className="send-message" onSubmit={()=>setSendMessage(prev=>!prev)}>

<div id="new-message-div">New Message <button>X</button></div>
<div id="send-to">To <input type="text" /></div>
<div><input type="text" placeholder="Subject" /></div>
<textarea className="text-area" type="text"></textarea>
<div><button id="send-btn">send</button></div>

</form>
}