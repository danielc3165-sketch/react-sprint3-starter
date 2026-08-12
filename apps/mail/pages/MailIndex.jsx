
import { utilService } from "../../../services/util.service.js"
import { mailService } from "../services/mail.service.js"

import { MailList } from "../cmps/MailList.jsx"

const { useState,useEffect } = React


export function MailIndex({mailsData}) {

    const [ mails,setMails] = useState()
    
    //console.log('mails',mails)
     
    useEffect(()=>{
        mailService.query()
        .then(data=>{
            setMails(data)
            //console.log('data',data)
        })
        
     },[])

     
    function removeMail(id,ev){
    ev.stopPropagation()

    mailService.remove(id)
    .then(()=>setMails(prev=>prev.filter(mail=>mail.id!==id)))
    
  }

     if(!mails) return

    

    return <section className="container">
        <h1>Mail app</h1>

        <MailList mails={mails} removeMail={removeMail}/>
        
        </section>
}

