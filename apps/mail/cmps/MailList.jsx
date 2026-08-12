const { useState,useEffect } = React
const { useNavigate } = ReactRouterDOM


export function MailList({mails,removeMail}) {
    
  const navigate = useNavigate()
 
  if(!mails) return

  return <div>

    <ul className="mail-list-ul">
      
      {mails.map(mail=><li key={mail.id} 
      className={mail.isRead ? 'read' : 'unread'}
      onClick={()=>navigate(`/mail/${mail.id}`,mail.isRead=true)}>

       <p>{mail.subject}</p>
       <p>{mail.body}</p>
       <button onClick={(event)=>removeMail(mail.id,event)}>x</button>


      </li>)}

    </ul>

  </div>
}
