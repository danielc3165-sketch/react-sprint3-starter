import { MailSent } from "./MailSent.jsx"

const { useState,useEffect,useRef } = React

export function SideBar({mails,sendMessage,setSendMessage,setCmpType,setFilter,filter,isClose,setIsClose}){

    //console.log(filter)

   const [ count,setCount ] = useState(0)
    
    useEffect(()=>{
        
        countNewMail()
    
    },[mails])

    function countNewMail(){
        if(!mails) return
        var count = 0
        mails.map(mail=>{
            if(mail.isRead===false) count++
        })

        //console.log('count',count)
        setCount(count)
    }

    function handelChange(string){
        setCmpType(string)
        setFilter(prev=>({...prev,['status']:string}))
    }

    function closeSideBar(){
        setIsClose(true)
    }
    
    function isBlue(status){
       if(filter.status===status) return 'is-blue'
       else return 'is-white'
    }

    return <section onClick={closeSideBar} className={`side-bar-container ${isClose ? 'close' : ''}`}>
    
    <button className="close-side-bar">X</button>

     <button className="side-bar-btn" onClick={()=>setSendMessage(true)}><img src="assets/icons/compose.png"/><span>Compoce</span></button>

     <div className="side-bar-div">
     
     <button className={`${isBlue('MailList')}`} onClick={()=>handelChange('MailList')}><img src="assets/icons/messages.png"/>
     <span>Inbox</span>
     <span className="count-span">{filter.status==='MailList'? count : ''}</span>
     </button>
     
     <button className={`${isBlue('MailStars')}`} onClick={()=>handelChange('MailStars')}><img src="assets/icons/star-off.png"/>
     <span>Stared</span>
     <span>{filter.status==='MailStars'? count : ''}</span>
     </button>
     
     <button className={`${isBlue('MailSent')}`} onClick={()=>handelChange('MailSent')}><img src="assets/icons/send.png"/>
     <span>Sent</span>
     <span>{filter.status==='MailSent'? count : ''}</span>
     </button>
     
     <button className={`${isBlue('MailDraft')}`} onClick={()=>handelChange('MailDraft')}><img src="assets/icons/file.png"/>
     <span>Draft</span>
     <span>{filter.status==='MailDraft'? count : ''}</span>
     </button>
     
     <button className={`${isBlue('MailTrash')}`} onClick={()=>handelChange('MailTrash')}><img src="assets/icons/trash.png"/>
     <span>Trash</span>
     <span>{filter.status==='MailTrash'? count : ''}</span>
     </button>
     
     </div>

    </section>


}