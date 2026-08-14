const { useState,useEffect } = React

export function SideBar({mails,sendMessage,setSendMessage}){

    const [ count,setCount ] = useState(0)

    useEffect(()=>countNewMail(),[mails])

    function countNewMail(){

        var count = 0
        mails.map(mail=>{
            if(mail.isRead===false) count++
        })

        //console.log('count',count)
        setCount(count)
    }

    return <section className="side-bar-container">

     <button className="side-bar-btn" onClick={()=>setSendMessage(true)}><img src="assets/icons/compose.png"/></button>

     <div className="side-bar-div">
     <a href=""><img src="assets/icons/messages.png"/><span>{count}</span></a>
     <a href=""><img src="assets/icons/star-off.png"/></a>
     <a href=""><img src="assets/icons/send.png"/></a>
     <a href=""><img src="assets/icons/file.png"/></a>
     <a href=""><img src="assets/icons/trash.png"/></a>
     </div>
    
    </section>


}