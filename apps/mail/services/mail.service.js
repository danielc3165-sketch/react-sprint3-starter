// mail service
import { utilService } from "../../../services/util.service.js"
import { storageService } from "../../../services/async-storage.service.js"

export const mailService={
	query,
	get,
}

const MAILS_KEY = 'mails'
const USER_KEY = 'user'


function query(){
	return storageService.query(MAILS_KEY)
}

function get(id){
	return storageService.get(MAILS_KEY,id)
}