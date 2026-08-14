const { useState,useEffect } = React
const { useNavigate } = ReactRouterDOM


export function MailList({mails,setMails,removeMail,changeIsRead}) {
    
  // const [mailsToEdit,setMailsToEdit] = useState(mails)

  const navigate = useNavigate()

  // useEffect(()=>{
  //   setMails(mailsToEdit)
  //   //console.log(mailsToEdit)
  // },[mailsToEdit])

 

  if(!mails) return

  return <div>

    <ul className="mail-list-ul">
      
      {mails.map(mail=><li key={mail.id} 
      className={mail.isRead ? 'read' : 'unread'}
      onClick={()=>{navigate(`/mail/${mail.id}`),changeIsRead(mail)}}>
       <img src="assets/icons/star-off.png" />
       <p>{mail.subject}</p>
       <p>{mail.body}</p>
       <button onClick={(event)=>removeMail(mail.id,event)}>x</button>


      </li>)}

    </ul>

  </div>
}
