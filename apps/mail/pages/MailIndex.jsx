
import { utilService } from "../../../services/util.service.js"
import { mailService } from "../services/mail.service.js"
import { showSuccessMsg } from '../../../services/event-bus.service.js'

import { MailFilter } from "../cmps/MailFilter.jsx"
import { MailList } from "../cmps/MailList.jsx"
import { MailStars } from "../cmps/MailStars.jsx"
import { MailSent } from "../cmps/MailSent.jsx"
import { MailDraft } from "../cmps/MailDraft.jsx"
import { MailTrash } from "../cmps/MailTrash.jsx"
import { SideBar } from "../cmps/SideBar.jsx"
import { SendMessage } from "../cmps/SendMessage.jsx"
import { UserMsg } from "../../../cmps/UserMsg.jsx"

const { useState,useEffect } = React
const { useSearchParams } = ReactRouterDOM


export function MailIndex({mailsData}) {

    const [searchParams, setSearchParams] = useSearchParams()
    

    const [ mails,setMails] = useState(mailsData)
    
    const [ sendMessage,setSendMessage ] = useState(false)
    const [ mssInfo, setMssInfo ] = useState({})
    const [ userMsg,setUserMsg ] = useState(true)
    
    const [ filter,setFilter ] = useState(mailService.getFilterFromSearchParams(searchParams))
    const [ cmpType,setCmpType ] = useState('MailList')

    const [isClose,setIsClose] = useState(true)
    //console.log('sideBar',sideBar)
     
    useEffect(()=>{
        
        loadMail()
        setSearchParams(utilService.trimObj(filter))
        console.log('M',mails)
     },[filter])

    function removeMail(id,ev){
    ev.stopPropagation()

    mailService.remove(id)
    .then(()=>setMails(prev=>prev.filter(mail=>mail.id!==id)))
    
  }

//   function changeIsRead(mail){
//     mail.isRead = true
//     mailService.update(mail)
//     .then(newMail=>console.log('newMail',newMail))
//     // .then(newMail=>setMails(prev=>prev.filter(filterMail=>filterMail.id!==newMail.id)))
//   }

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
        setFilter={setFilter}
        isClose={isClose}
        setIsClose={setIsClose}/>

    <section className="container">
        
        <MailFilter filter={filter} setFilter={setFilter} onMenu={onMenu}/>
    
        <DynamicCmp 
        mails={mails} 
        cmpType={cmpType}
        setMails={setMails} 
        removeMail={removeMail}
        renderDate={renderDate}
        changeIsStared={changeIsStared}
        />

        {userMsg && <UserMsg />}
        
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

