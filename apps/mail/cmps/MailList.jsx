const { useState,useEffect } = React
const { useNavigate } = ReactRouterDOM

export function MailList({mails}) {
    
  const [ mailsToEdit,setMailsToEdit ] = useState(mails)
  //console.log('mailsTE',mailsToEdit)
  
  const navigate = useNavigate()
 
  

  return <div>

    <ul className="mail-list-ul">
      
      {mailsToEdit.map(mail=><li key={mail.id} onClick={()=>navigate(`/mail/${mail.id}`)}>

       <p>{mail.subject}</p>
       <p>{mail.body}</p>


      </li>)}

    </ul>

  </div>
}
