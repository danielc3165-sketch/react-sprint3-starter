
import { utilService } from "../../../services/util.service.js"
import { mailService } from "../services/mail.service.js"

import { MailFilter } from "../cmps/MailFilter.jsx"
import { SideBar } from "../cmps/SideBar.jsx"
import { MailList } from "../cmps/MailList.jsx"
import { SendMessage } from "../cmps/SendMessage.jsx"


const { useState, useEffect } = React

export function MailIndex({mailsData}) {

    const [ mails,setMails] = useState(mailsData)
    const [ sendMessage,setSendMessage ] = useState(false)
    const [ filter,setFilter ] = useState({text:'',onlyNew:false})
    
    //console.log('filter',filter)
     
    useEffect(()=>{
        mailService.query(filter)
        .then(data=>{
            setMails(data)
            //console.log('data',data)
        })
        
     },[filter])

     
  function removeMail(id,ev){
    ev.stopPropagation()

    mailService
      .remove(id)
      .then(() => setMails((prev) => prev.filter((mail) => mail.id !== id)))
  }

  function changeIsRead(mail) {
    mail.isRead = true
    mailService.update(mail).then((newMail) => console.log('newMail', newMail))
    // .then(newMail=>setMails(prev=>prev.filter(filterMail=>filterMail.id!==newMail.id)))
  }

function loadMail(){
    mailService.query(filter)
        .then(data=>{
            setMails(data)
        })
}

   function sendMss(){
      console.log('O.K')
      mailService.send(mssInfo)
      .then(()=>loadMail())
      .then(()=>{
        showSuccessMsg('Your message sent')
        //console.log('newMss',newMss)
    })
   }

   function onMenu(){
       setIsClose(false)
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
  )
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

function DynamicCmp(props) {
  const cmpMap = {
    MailList: <MailList {...props} />,
    MailStars: <MailStars {...props} />,
    MailSent: <MailSent {...props} />,
    MailDraft: <MailDraft {...props} />,
    MailTrash: <MailTrash {...props} />,
  }
  //console.log('props',props.cmpType)
  return cmpMap[props.cmpType]
}
