import LoginPage from '../pages/Login';
import LibrarianPage from '../pages/Librarian';
import LibrarianStudentDataPage from '../pages/LibrarianStudentData';
import LibrarianBookDataPage from '../pages/LibrarianBookData';

const components = {
	login: {
		url: '/login',
		component: LoginPage,
	},
	librarian: {
		url: '/librarian',
		component: LibrarianPage,
	},
	librarianStudentData: {
		url: '/librarian/student-data',
		component: LibrarianStudentDataPage,
	},
	librarianBookData: {
		url: '/librarian/book-data',
		component: LibrarianBookDataPage,
	},
};

export default {
	guest: {
		allowedRoutes: [components.login],
		redirectRoute: '/login',
	},
	librarian: {
		allowedRoutes: [
			components.librarian,
			components.librarianStudentData,
			components.librarianBookData,
		],
		redirectRoute: '/librarian',
	},
};
