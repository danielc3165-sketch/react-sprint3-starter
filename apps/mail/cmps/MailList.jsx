const { useState } = React

export function MailList({mails}) {
    
  const [ mailsToEdit,setMailsToEdit ] = useState(mails)
  console.log('mailsTE',mailsToEdit)

  return <div>

    <ul className="mail-list-ul">
      {mailsToEdit.map(mail=><li key={mail.id}>

       <p>{mail.subject}</p>
       <p>{mail.body}</p>


      </li>)}



    </ul>

  </div>
}
