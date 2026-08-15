// mail service
import { utilService } from "../../../services/util.service.js"
import { storageService } from "../../../services/async-storage.service.js"

export const mailService={
	query,
	get,
	remove,
	update,
}

const MAILS_KEY = 'mails'
const USER_KEY = 'user'


function query(){
	return storageService.query(MAILS_KEY)
}

function get(id){
	return storageService.get(MAILS_KEY,id)
}

function remove(id){
	    // var newObj={
	    // createdAt: Date.now(),
	    // subject: utilService.makeLorem(3),
	    // body: utilService.makeLorem(15),
	    // isRead: false,
	    // sentAt: 0,
	    // removedAt: null,
	    // from: `${utilService.makeLorem(1)}@${utilService.makeLorem(1)}.com`.split(' ').join(''),
	    // to: `${utilService.makeLorem(1)}@${utilService.makeLorem(1)}.com`.split(' ').join(''),
		// }

		return storageService.remove(MAILS_KEY,id)
}

function update(mail){
	return storageService.put(MAILS_KEY,mail)
}