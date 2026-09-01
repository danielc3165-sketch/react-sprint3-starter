// mail service
import { utilService } from "../../../services/util.service.js"
import { storageService } from "../../../services/async-storage.service.js"
import { MailList } from "../cmps/MailList.jsx"

_initMails()

function _initMails() {
	const storedMails = utilService.loadFromStorage('mails')
	if (!storedMails || storedMails.length === 0) {
		const defaultMails = [
			{
				id: 'e101',
				createdAt: 1551133930500,
				subject: 'Miss you!',
				body: 'Would love to catch up sometimes',
				isRead: false,
				sentAt: 1551133930500,
				removedAt: null,
				from: 'momo@momo.com',
				to: 'user@appsus.com',
				stared: false
			},
			{
				id: 'e102',
				createdAt: 1652133930500,
				subject: 'Meeting tomorrow',
				body: 'Reminder: Project meeting at 10am in conference room B.',
				isRead: true,
				sentAt: 1652133930594,
				removedAt: null,
				from: 'team@work.com',
				to: 'user@appsus.com',
				stared: false
			},
			{
				id: 'e103',
				createdAt: 1663133930500,
				subject: 'Sale this weekend',
				body: 'Don\'t miss our weekend sale — up to 50% off!',
				isRead: false,
				sentAt: 1663133930500,
				removedAt: null,
				from: 'store@shop.com',
				to: 'user@appsus.com',
				stared: false
			},
			{
				id: 'e104',
				createdAt: 1674133930500,
				subject: 'Invitation: Birthday Party',
				body: 'You are invited to my birthday party next Saturday.',
				isRead: true,
				sentAt: 1674133930594,
				removedAt: null,
				from: 'friend@social.com',
				to: 'user@appsus.com',
				stared: false
			},
			{
				id: 'e105',
				createdAt: 1685133930500,
				subject: 'Invoice #3421',
				body: 'Attached is your invoice for the recent order.',
				isRead: false,
				sentAt: 1685133930594,
				removedAt: null,
				from: 'billing@services.com',
				to: 'user@appsus.com',
				stared: false
			},
			{
				id: 'e106',
				createdAt: 1696133930500,
				subject: 'Flight Confirmation',
				body: 'Your flight is confirmed. See details inside.',
				isRead: true,
				sentAt: 1696133930500,
				removedAt: null,
				from: 'travel@airline.com',
				to: 'user@appsus.com',
				stared: false
			},
			{
				id: 'e107',
				createdAt: 1707133930500,
				subject: 'Weekly Newsletter',
				body: 'Here are the highlights from this week.',
				isRead: false,
				sentAt: 1707133930594,
				removedAt: null,
				from: 'news@newsletter.com',
				to: 'user@appsus.com',
				stared: false
			},
			{
				id: 'e108',
				createdAt: 1718133930500,
				subject: 'Password Reset',
				body: 'Click here to reset your password for your account.',
				isRead: true,
				sentAt: 1718133930500,
				removedAt: null,
				from: 'security@services.com',
				to: 'user@appsus.com',
				stared: false
			},
			{
				id: 'e109',
				createdAt: 1729133930500,
				subject: 'Event RSVP',
				body: 'Thanks for RSVPing — we look forward to seeing you.',
				isRead: false,
				sentAt: 1729133930594,
				removedAt: null,
				from: 'events@club.com',
				to: 'user@appsus.com',
				stared: false
			},
			{
				id: 'e110',
				createdAt: 1730133930500,
				subject: 'Welcome aboard',
				body: 'Welcome to the team! Here are some resources to get started.',
				isRead: true,
				sentAt: 1730133930594,
				removedAt: null,
				from: 'hr@company.com',
				to: 'user@appsus.com',
				stared: false
			}
		]
		utilService.saveToStorage('mails', defaultMails)
	}
}

export const mailService={
	query,
	get,
	remove,
	update,
	send,
	exitMsg,
	createMss,
	getFilterFromSearchParams,
}

const MAILS_KEY = 'mails'
const USER_KEY = 'user'


function query(filter={}){
	//console.log('Sfilter',filter)
	return storageService.query(MAILS_KEY)
	.then(mails=>{
		if(filter.txt){ 
		const regExp=new RegExp(filter.txt,'i')
		mails=mails.filter(mail=>regExp.test(mail.subject)||regExp.test(mail.body))
		}
        
		if(filter.onlyNew){
		mails=mails.filter(mail=>mail.isRead===false)
		}
        
        if(filter.status==='MailDraft'){
		mails=mails.filter(mail=>mail.sentAt===null && mail.removedAt===null)
		}else if(filter.status==='MailList'){
		mails=mails.filter(mail=>mail.sentAt!==null && !mail.from.includes('@service.com') && mail.removedAt===null)
		}
		else if(filter.status==='MailStars'){
        mails=mails.filter(mail=>mail.stared===true && mail.removedAt===null)
		}
		else if(filter.status==='MailTrash'){
		mails=mails.filter(mail=>mail.removedAt!==null)	
		}else if(filter.status==='MailSent'){
		mails=mails.filter(mail=>mail.sentAt!==null && mail.from.includes('@service.com') && mail.removedAt===null)
		}
		mails=mails.sort((a,b)=>b.sentAt-a.sentAt||b.createdAt-a.createdAt)
		
		return mails
	})
	}

function get(id){
	return storageService.get(MAILS_KEY,id)
}

function send(info={},msg){
	msg.sentAt= Date.now()
	msg.to=info.adress
	msg.subject=info.subject
	msg.body=info.body

	//console.log('msg',msg)


    if(msg.id)  return storageService.put(MAILS_KEY,msg)
	 return storageService.post(MAILS_KEY,msg)
	//  .then(newMss=>console.log('newMss',newMss))
}

function exitMsg(info={},msg){
    msg.to=info.adress
	msg.subject=info.subject
	msg.body=info.body
	console.log('ex-msg',msg)
    if(msg.id) return storageService.put(MAILS_KEY,msg)
	else return storageService.post(MAILS_KEY,msg)
}

function remove(id){
		return storageService.remove(MAILS_KEY,id)
}

function update(mail){
	return storageService.put(MAILS_KEY,mail)
}


function getFilterFromSearchParams(searchParams) {
    const defaultFilter = _getDefaultFilter()
	//console.log('Dfilter',defaultFilter)
    const filter = {}

    for (const field in defaultFilter) {
        filter[field] = searchParams.get(field) || defaultFilter[field]
    }
	
    
    return filter

}


function createMss(){
	const newMss={
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

function _getDefaultFilter(filter = { txt: '', onlyNew: false ,status:'MailList'}) {
    return { txt:filter.txt,onlyNew:filter.onlyNew, status:filter.status }
}