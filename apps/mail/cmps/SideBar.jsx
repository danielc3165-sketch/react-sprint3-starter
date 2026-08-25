
const { useState,useEffect} = React

export function SideBar({
    mails,setSendMessage,
    setCmpType,setFilter,
    filter,isClose,
    setIsClose,onCompose}){

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

     <button className="side-bar-btn" onClick={()=>{setSendMessage(true),onCompose()}}><img src="assets/icons/compose.png"/><span>Compoce</span></button>

     <div className="side-bar-div">
     <button className={`${isBlue('MailList')}`} onClick={()=>handelChange('MailList')}>
     <div className="count-div">
     <img src="assets/icons/messages.png"/>
     <span>Inbox</span>
     </div>
     <span className="count-span">{filter.status==='MailList'? '| '+count : ''}</span>
     </button>
     
     <button className={`${isBlue('MailStars')}`} onClick={()=>handelChange('MailStars')}>
     <div className="count-div">
     <img src="assets/icons/star-off.png"/>
     <span>Stared</span>
     </div>
     <span>{filter.status==='MailStars'? '| '+count : ''}</span>
     </button>
     
     <button className={`${isBlue('MailSent')}`} onClick={()=>handelChange('MailSent')}>
     <div className="count-div">
     <img src="assets/icons/send.png"/>
     <span>Sent</span>
     </div>
     <span>{filter.status==='MailSent'? '| '+count : ''}</span>
     </button>
     
     <button className={`${isBlue('MailDraft')}`} onClick={()=>handelChange('MailDraft')}>
     <div className="count-div">
     <img src="assets/icons/file.png"/>
     <span>Draft</span>
     </div>
     <span>{filter.status==='MailDraft'? '| '+count : ''}</span>
     </button>
     
     <button className={`count-btn ${isBlue('MailTrash')}`} onClick={()=>handelChange('MailTrash')}>
     <div className="count-div">
     <img src="assets/icons/trash.png"/>
     <span>Trash</span>
     </div>
     <span className="count-span">{filter.status==='MailTrash'? '| '+count : ''}</span>
     </button>
     
     </div>

    </section>


}