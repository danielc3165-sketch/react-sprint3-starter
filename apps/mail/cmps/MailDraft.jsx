const { useState,useEffect } = React
const { useNavigate } = ReactRouterDOM


export function MailDraft({mails,setMails,removeMail,renderDate,changeIsStared}) {
    
  //const [mailsToEdit,setMailsToEdit] = useState(mails)

  const navigate = useNavigate()

  // useEffect(()=>{
  //   setMails(mailsToEdit)
  //   //console.log(mailsToEdit)
  // },[mailsToEdit])

 
 
  if(!mails) return

  return <div>

    <ul className="mail-list-ul">
      
      {(mails && mails.length>0)&&mails.map(mail=><li key={mail.id} 
      className={mail.isRead ? 'read' : 'unread'}
      onClick={()=>navigate(`/mail/${mail.id}`)}>
       <img onClick={changeIsStared} src="assets/icons/star-off.png" />
       <p className="mail-list-li-subject">{mail.subject}</p>
       <p>{mail.body}</p>
       <span className="date">{renderDate(mail)}</span>
       
       <button className={mail.isRead ? 'read' : 'unread'} onClick={(event)=>removeMail(mail.id,event)}>
        <img className="trash-img" src="assets/icons/trash.png"/>
       </button>


      </li>)}

    </ul>

  </div>
}
