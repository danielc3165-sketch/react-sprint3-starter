const { useState,useEffect } = React
const { useNavigate } = ReactRouterDOM


export function MailSent({mails,setMails,removeMail,changeIsRead,renderDate,changeIsStared}){
  
  if(!mails) return
  const navigate = useNavigate()

  return <div>

    <ul className="mail-list-ul">
      
      {mails.map(mail=><li key={mail.id} 
      className={mail.isRead ? 'read' : 'unread'}
      onClick={()=>{navigate(`/mail/${mail.id}`),changeIsRead(mail)}}>
       <img onClick={changeIsStared} src="assets/icons/star-off.png" />
       <p className="mail-list-li-subject">{mail.subject}</p>
       <p>{mail.body}</p>
       <span className="date">{renderDate(mail)}</span>
       <button className={mail.isRead ? 'read' : 'unread'} onClick={(event)=>removeMail(mail.id,event)}>
        <img className="trash-img" src="assets/icons/trash.png"></img>
       </button>


      </li>)}

    </ul>

  </div>
}