
import { utilService } from "../../../services/util.service.js"
import { mailService } from "../services/mail.service.js"

import { MailList } from "../cmps/MailList.jsx"

const { useState,useEffect } = React


export function MailIndex({mailsData}) {

    const [ mails,setMails] = useState(mailsData)
    

    //  useEffect(()=>{
    //     mailService.query()
    //     .then(data=>{
    //         setMails(data)
    //         console.log('data',data)
    //     })
    //  },[])

     if(!mails) return

    return <section className="container">
        <h1>Mail app</h1>

        <MailList mails={mails}/>
        
        </section>
}

