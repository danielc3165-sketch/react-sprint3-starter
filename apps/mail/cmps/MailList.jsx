const { useState,useEffect } = React
const { useNavigate } = ReactRouterDOM


export function MailList({mails,setMails,removeMail,changeIsRead}) {
    
  //const [mailsToEdit,setMailsToEdit] = useState(mails)

  const navigate = useNavigate()

  // useEffect(()=>{
  //   setMails(mailsToEdit)
  //   //console.log(mailsToEdit)
  // },[mailsToEdit])

 function renderDate(mail){
    const timestamp = mail.sentAt || mail.createdAt
    if (!timestamp) return 'No date'

    const date = new Date(Number(timestamp))
    if (isNaN(date.getTime())) return 'No date'

    return date.toLocaleDateString(undefined, {
      month: 'numeric',
      day: 'numeric',
      year: 'numeric',
    })
 }

 function changeIsStared(ev){
  ev.stopPropagation()
  console.log(ev.target.src)
  if(ev.target.src==='http://127.0.0.1:5500/assets/icons/star-off.png') ev.target.src='assets/icons/star-on.png'
  else ev.target.src='assets/icons/star-off.png'
 }

 
 
  if(!mails) return

  return <div>

    <ul className="mail-list-ul">
      
      {(mails && mails.length>0)&&mails.map(mail=><li key={mail.id} 
      className={mail.isRead ? 'read' : 'unread'}
      onClick={()=>{navigate(`/mail/${mail.id}`),changeIsRead(mail)}}>
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
