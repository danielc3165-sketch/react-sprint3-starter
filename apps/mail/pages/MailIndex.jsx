
import { utilService } from "../../../services/util.service.js"
import { mailService } from "../services/mail.service.js"

import { MailFilter } from "../cmps/MailFilter.jsx"
import { SideBar } from "../cmps/SideBar.jsx"
import { MailList } from "../cmps/MailList.jsx"
import { SendMessage } from "../cmps/SendMessage.jsx"


const { useState,useEffect } = React


export function MailIndex({mailsData}) {

    const [ mails,setMails] = useState(mailsData)
    const [ sendMessage,setSendMessage ] = useState(false)
    const [ filter,setFilter ] = useState({text:'',onlyNew:false})
    
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

  function changeIsRead(mail){
    mail.isRead = true
    mailService.update(mail)
    .then(newMail=>console.log('newMail',newMail))
    // .then(newMail=>setMails(prev=>prev.filter(filterMail=>filterMail.id!==newMail.id)))
  }

     if(!mails) return

    return <section>

    {sendMessage && <SendMessage 
        sendMessage={sendMessage}
        setSendMessage={setSendMessage} />}
     
    <div className="mail-index">

        <SideBar 
        mails={mails} 
        sendMessage={sendMessage}
        setSendMessage={setSendMessage}/>

    <section className="container">
        
        <MailFilter filter={filter} setFilter={setFilter} />
    
        <MailList 
        mails={mails} 
        setMails={setMails} 
        removeMail={removeMail}
        changeIsRead={changeIsRead} 
        />
        
    </section>
    </div>

    </section>
}

