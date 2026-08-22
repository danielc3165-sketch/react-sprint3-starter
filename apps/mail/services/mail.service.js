// mail service
import { utilService } from "../../../services/util.service.js"
import { storageService } from "../../../services/async-storage.service.js"

export const mailService={
	query,
	get,
	remove,
	update,
	send,
}

const MAILS_KEY = 'mails'
const USER_KEY = 'user'


function query(filter={}){
	//console.log('Sfilter',filter)
	return storageService.query(MAILS_KEY)
	.then(mails=>{
		if(filter.text){ 
		const regExp=new RegExp(filter.text,'i')
		mails=mails.filter(mail=>regExp.test(mail.subject)||regExp.test(mail.body))
		}
        
		if(filter.onlyNew){
		mails=mails.filter(mail=>mail.isRead===false)
		}
        
        if(filter.status==='MailSent'){
		mails=mails.filter(mail=>mail.sentAt!==null)
		}else if(filter.status==='MailList'){
		mails=mails.filter(mail=>mail.sentAt===null)
		}

		mails=mails.sort((a,b)=>b.sentAt-a.sentAt||b.createdAt-a.createdAt)
		
		return mails
		})
}

function get(id){
	return storageService.get(MAILS_KEY,id)
}

function send(info={}){
	var mss=_createMss()
	mss.sentAt= Date.now()
	mss.to=info.adress
	mss.subject=info.subject
	mss.body=info.body

	//console.log('mss',mss)


    
	 return storageService.post(MAILS_KEY,mss)
	//  .then(newMss=>console.log('newMss',newMss))
}

function remove(id){
		return storageService.remove(MAILS_KEY,id)
}

function update(mail){
	return storageService.put(MAILS_KEY,mail)
}

function _createMss(){
	var newMss={
	    createdAt: Date.now(),
	    subject: '',
	    body:'',
	    isRead: false,
	    sentAt: null,
	    removedAt: null,
	    from: `${utilService.makeLorem(1)}@service.com`.split(' ').join(''),
	    to: '',
		}

		return newMss
}