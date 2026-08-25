const { useState,useEffect } = React
const { useNavigate } = ReactRouterDOM


export function MailList({mails,
                          renderDate,
                          changeIsStared,
                          renderStar,
                          changeIsRead,
                          onDelitMsg}) {
    
  

  const navigate = useNavigate()


 
  if(!mails) return

  return <div>

    <ul className="mail-list-ul">
      
      {(mails && mails.length>0)&&mails.map(mail=><li key={mail.id} 
      className={mail.isRead ? 'read' : 'unread'}
      onClick={()=>{navigate(`/mail/${mail.id}`),changeIsRead(mail)}}>
       <img onClick={(event)=>changeIsStared(event,mail)} src={renderStar(mail)} />
       <p className="mail-list-li-subject">{mail.subject}</p>
       <p>{mail.body}</p>
       <span className="date">{renderDate(mail)}</span>
       
       <button className={mail.isRead ? 'read' : 'unread'} onClick={(event)=>onDelitMsg(event,mail)}>
        <img className="trash-img" src="assets/icons/trash.png" />
       </button>


      </li>)}

    </ul>

  </div>
}
