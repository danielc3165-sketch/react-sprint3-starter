const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { AppHeader } from './cmps/AppHeader.jsx'
import { UserMsg } from './cmps/UserMsg.jsx'
import { About } from './pages/About.jsx'
import { Home } from './pages/Home.jsx'
import { MailIndex } from './apps/mail/pages/MailIndex.jsx'
import { NoteIndex } from './apps/note/pages/NoteIndex.jsx'
import { MailPreview } from './apps/mail/pages/MailPreview.jsx'

export function RootCmp() {

const loggedinUser = {
	email: 'user@appsus.com',
	fullname: 'Mahatma Appsus'
}

const mails = [
	{
	    id: 'e101',
	    createdAt: 1551133930500,
	    subject: 'Miss you!',
	    body: 'Would love to catch up sometimes',
	    isRead: false,
	    sentAt: 1551133930594,
	    removedAt: null,
	    from: 'momo@momo.com',
	    to: 'user@appsus.com'
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
		to: 'user@appsus.com'
	},
	{
		id: 'e103',
		createdAt: 1663133930500,
		subject: 'Sale this weekend',
		body: 'Don\'t miss our weekend sale — up to 50% off!',
		isRead: false,
		sentAt: 1663133930594,
		removedAt: null,
		from: 'store@shop.com',
		to: 'user@appsus.com'
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
		to: 'user@appsus.com'
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
		to: 'user@appsus.com'
	},
	{
		id: 'e106',
		createdAt: 1696133930500,
		subject: 'Flight Confirmation',
		body: 'Your flight is confirmed. See details inside.',
		isRead: true,
		sentAt: 1696133930594,
		removedAt: null,
		from: 'travel@airline.com',
		to: 'user@appsus.com'
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
		to: 'user@appsus.com'
	},
	{
		id: 'e108',
		createdAt: 1718133930500,
		subject: 'Password Reset',
		body: 'Click here to reset your password for your account.',
		isRead: true,
		sentAt: 1718133930594,
		removedAt: null,
		from: 'security@service.com',
		to: 'user@appsus.com'
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
		to: 'user@appsus.com'
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
		to: 'user@appsus.com'
	}
]


    return <Router>
        <section className="root-cmp">
            <AppHeader />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/mail" element={<MailIndex mailsData={mails}/>} />
                <Route path="/note" element={<NoteIndex />} />
                <Route path="/mail/:id" element={<MailPreview />} />
            </Routes>
            <UserMsg />
        </section>
    </Router>
}
