const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { mailService } from './apps/mail/services/mail.service.js'
import { utilService } from './services/util.service.js'

import { AppHeader } from './cmps/AppHeader.jsx'
import { UserMsg } from './cmps/UserMsg.jsx'
import { About } from './pages/About.jsx'
import { Home } from './pages/Home.jsx'
import { MailIndex } from './apps/mail/pages/MailIndex.jsx'
import { NoteIndex } from './apps/note/pages/NoteIndex.jsx'
import { MailPreview } from './apps/mail/pages/MailPreview.jsx'
import { BookIndex } from './apps/miss-books - Menachem Farkash/pages/BookIndex.jsx'
import { BookDetails } from './apps/miss-books - Menachem Farkash/cmps/BookDetails.jsx'
import { BookEdit } from './apps/miss-books - Menachem Farkash/pages/BookEdit.jsx'
import { BookAdd } from './apps/miss-books - Menachem Farkash/pages/BookAdd.jsx'
import { BookStatistics } from './apps/miss-books - Menachem Farkash/pages/BookStatistics.jsx'

export function RootCmp() {

	const loggedinUser = {
		email: 'user@appsus.com',
		fullname: 'Mahatma Appsus'
	}

	return <Router>
		<section className="root-cmp">
			<AppHeader />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/about" element={<About />} />
				<Route path="/mail" element={<MailIndex />} />
				<Route path="/note" element={<NoteIndex />} />
				<Route path="/mail/:id" element={<MailPreview />} />

				<Route path="/book" element={<BookIndex />} />
				<Route path="/book/add" element={<BookAdd />} />
				<Route path="/book/edit" element={<BookEdit />} />
				<Route path="/book/edit/:id" element={<BookEdit />} />
				<Route path="/book/statistics" element={<BookStatistics />} />
				<Route path="/book/:id" element={<BookDetails />} />

			</Routes>
			<UserMsg />
		</section>
	</Router>
}
