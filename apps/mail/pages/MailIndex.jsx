import { utilService } from '../../../services/util.service.js'
import { mailService } from '../services/mail.service.js'
import { showSuccessMsg } from '../../../services/event-bus.service.js'

import { MailFilter } from '../cmps/MailFilter.jsx'
import { MailList } from '../cmps/MailList.jsx'
import { MailStars } from '../cmps/MailStars.jsx'
import { MailSent } from '../cmps/MailSent.jsx'
import { MailDraft } from '../cmps/MailDraft.jsx'
import { MailTrash } from '../cmps/MailTrash.jsx'
import { SideBar } from '../cmps/SideBar.jsx'
import { SendMessage } from '../cmps/SendMessage.jsx'

const { useState,useEffect } = React
const { useSearchParams } = ReactRouterDOM



export function MailIndex({ mailsData }) {
  const [mails, setMails] = useState(mailsData)

  const [sendMessage, setSendMessage] = useState(false)
  const [mssInfo, setMssInfo] = useState({})
  const [ currMsg,setCurrMsg ] = useState({})
  

  const [searchParams, setSearchParams] = useSearchParams()
    
  const [ filter,setFilter ] = useState(mailService.getFilterFromSearchParams(searchParams))
  const [ cmpType,setCmpType ] = useState('MailList')

  const [isClose,setIsClose] = useState(true)
    //console.log('sideBar',sideBar)
     
    useEffect(()=>{
  
        loadMail()
        setSearchParams(utilService.trimObj(filter))
        console.log('filter',filter)
     },[filter, mailsData])

  //console.log('sideBar',sideBar)


function removeMail(id, ev) {
    ev.stopPropagation()

    mailService
      .remove(id)
      .then(() => setMails((prev) => prev.filter((mail) => mail.id !== id)))
}

function loadMail(){
    mailService.query(filter)
    .then(data=>{
    setMails(data)
})
}

function changeIsRead(mail) {
    mail.isRead = true
    mailService.update(mail).then((newMail) => console.log('newMail', newMail))
    // .then(newMail=>setMails(prev=>prev.filter(filterMail=>filterMail.id!==newMail.id)))
}

function sendMss() {
    mailService
      .send(mssInfo,currMsg)
      .then(() => {
        loadMail()
        setCurrMsg({})
        setMssInfo({})
        setSendMessage(false)
      })
      .then(() => {
        showSuccessMsg('Your message sent')
        //console.log('newMss',newMss)
      })
}

function onMenu() {
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

function renderStar(mail){
  if(mail.stared===true) return 'assets/icons/star-on.png'
  else  return 'assets/icons/star-off.png'
}

function changeIsStared(ev,mail){
  
  //console.log('target,mail',ev.target,mail)
  
  ev.stopPropagation()
  if(ev.target.src==='http://127.0.0.1:5500/assets/icons/star-off.png') ev.target.src='assets/icons/star-on.png'
  else ev.target.src='assets/icons/star-off.png'

  mail.stared = !mail.stared

  mailService.update(mail)
  .then(()=>loadMail())
  .catch(()=>console.log('update star faild'))
}

function onDelitMsg(ev,mail){
   //console.log('ev,mail',ev,mail)
   ev.stopPropagation()

  mail.removedAt=Date.now()
  mailService.update(mail)
  .then(()=>loadMail())
  .catch(()=>console.log('update trash faild'))
}

function onCompose(){
    setCurrMsg(mailService.createMss())
}

function onExitMsg(){
       console.log('currMsg',currMsg)
  mailService
      .exitMsg(mssInfo,currMsg)
      .then(() => {
        loadMail()
        setCurrMsg({})
        setMssInfo({})
        setSendMessage(false)
      })
      .catch(error=>console.log('draft doesnt save',error))
}

function updateInfo(mail){
  setMssInfo({'adress':mail.to,'subject':mail.subject,'body':mail.body})
  setCurrMsg(mail)
}



 


     if(!mails) return
     //console.log('mails',mails)
    return <section>

    {sendMessage && <SendMessage 
        sendMessage={sendMessage}
        setSendMessage={setSendMessage}
        mssInfo={mssInfo}
        setMssInfo={setMssInfo}
        sendMss={sendMss}
        onExitMsg={onExitMsg}/>}
         
     
    <div className="mail-index">

        <SideBar 

        mails={mails} 
        sendMessage={sendMessage}
        setSendMessage={setSendMessage}
        onCompose={onCompose}
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
        setSendMessage={setSendMessage}
        updateInfo={updateInfo}
        renderDate={renderDate}
        renderStar={renderStar}
        changeIsStared={changeIsStared}
        changeIsRead={changeIsRead}
        onDelitMsg={onDelitMsg}/>
      
    </section>
      
    </div>
    </section>
  
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



