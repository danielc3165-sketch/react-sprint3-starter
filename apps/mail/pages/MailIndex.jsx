
import { utilService } from "../../../services/util.service.js"
import { mailService } from "../services/mail.service.js"

import { MailFilter } from "../cmps/MailFilter.jsx"
import { MailList } from "../cmps/MailList.jsx"
import { MailStars } from "../cmps/MailStars.jsx"
import { MailSent } from "../cmps/MailSent.jsx"
import { MailDraft } from "../cmps/MailDraft.jsx"
import { MailTrash } from "../cmps/MailTrash.jsx"
import { SideBar } from "../cmps/SideBar.jsx"
import { SendMessage } from "../cmps/SendMessage.jsx"


const { useState,useEffect } = React


export function MailIndex({mailsData}) {

    const [ mails,setMails] = useState(mailsData)
    const [ sendMessage,setSendMessage ] = useState(false)
    const [ mssInfo, setMssInfo ] = useState({})
    
    const [ filter,setFilter ] = useState({text:'',onlyNew:false,status:'MailList'})
    const [ cmpType,setCmpType ] = useState('MailList')
    
    //console.log('filter',filter)
     
    useEffect(()=>{
        mailService.query(filter)
        .then(data=>{
            setMails(data)
            //console.log('data',data)
        })
        
     },[filter])

    //  useEffect(()=>{
    //     //sendMss()
    //         //console.log('data',data) 
    //  },[mssInfo])
  
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

   function sendMss(){
      mailService.send(mssInfo)
      .then(newMss=>{
        setMails(prev=>prev.push(newMss))
        //console.log('newMss',newMss)
    })
   }

     if(!mails) return
     //console.log('mails',mails)
    return <section>

    {sendMessage && <SendMessage 
        sendMessage={sendMessage}
        setSendMessage={setSendMessage}
        setMssInfo={setMssInfo}
        sendMss={sendMss}/>}
         
     
    <div className="mail-index">

        <SideBar 
        mails={mails} 
        sendMessage={sendMessage}
        setSendMessage={setSendMessage}
        setCmpType={setCmpType}
        filter={filter}
        setFilter={setFilter}/>

    <section className="container">
        
        <MailFilter filter={filter} setFilter={setFilter} />
    
        <DynamicCmp 
        mails={mails} 
        cmpType={cmpType}
        setMails={setMails} 
        removeMail={removeMail}
        changeIsRead={changeIsRead} 
        />
        
    </section>
    </div>

    </section>
}

function DynamicCmp(props) {
    const cmpMap = {
    MailList: <MailList { ...props } />,
    MailStars: <MailStars { ...props } />,
    MailSent: <MailSent { ...props } />,
    MailDraft: <MailDraft { ...props } />,
    MailTrash: <MailTrash { ...props } />
}
    //console.log('props',props.cmpType)
    return cmpMap[props.cmpType]
}

