import { MailSent } from "./MailSent.jsx"

const { useState,useEffect } = React

export function SideBar({mails,sendMessage,setSendMessage,setCmpType,setFilter,filter}){


    const [ count,setCount ] = useState(0)
    
   

    useEffect(()=>{countNewMail()},[mails])

    function countNewMail(){
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

    

    return <section className="side-bar-container">

     <button className="side-bar-btn" onClick={()=>setSendMessage(true)}><img src="assets/icons/compose.png"/><span>Compoce</span></button>

     <div className="side-bar-div">
     
     <button onClick={()=>handelChange('MailList')}><img src="assets/icons/messages.png"/>
     <span>Inbox</span>
     <span>{filter.status==='MailList'? '| '+count : ''}</span>
     </button>
     
     <button onClick={()=>handelChange('MailStars')}><img src="assets/icons/star-off.png"/><span>Stared</span></button>
     
     <button onClick={()=>handelChange('MailSent')}><img src="assets/icons/send.png"/>
     <span>Sent</span>
     <span>{filter.status==='MailSent'? '| '+count : ''}</span>
     </button>
     
     <button onClick={()=>handelChange('MailDraft')}><img src="assets/icons/file.png"/><span>Draft</span></button>
     <button onClick={()=>handelChange('MailTrash')}><img src="assets/icons/trash.png"/><span>Trash</span></button>
     </div>

    </section>


}