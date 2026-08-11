const { useState,useEffect } = React
const { useParams } = ReactRouter

import { mailService } from "../services/mail.service.js"

export function MailPreview(){
    const [ mail,setMail ] = useState([])
    const { id:mailId } = useParams()

    useEffect(()=>{
         mailService.get(mailId)
         .then(setMail)
    },[mailId])

    if(!mail) return

    return <div className="mail-preview-div"> 

       <h2>{mail.subject}</h2>
       <p>{mail.body}</p>

    </div>
}