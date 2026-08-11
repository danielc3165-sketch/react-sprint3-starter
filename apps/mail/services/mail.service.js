// mail service
import { utilService } from "../../../services/util.service.js"
import { storageService } from "../../../services/async-storage.service.js"

export const mailService={
	query,
}

const MAILS_KEY = 'mails'
const USER_KEY = 'user'


function query(){
	return storageService.query(MAILS_KEY)
}