const express = require('express');
const router = express.Router();

const {
	getStudentDataController,
	getBookDataController,
	searchStudentDataController,
	searchBookDataController,
	addBookController,
	borrowBookController,
	returnBookController,
} = require('../controllers/librarianController');

router.get('/student-data', getStudentDataController);
router.get('/book-data', getBookDataController);
router.post('/search/student-data', searchStudentDataController);
router.post('/search/book-data', searchBookDataController);

router.post('/add-book', addBookController);
router.post('/borrow-book', borrowBookController);
router.post('/return-book', returnBookController);

module.exports = router;
