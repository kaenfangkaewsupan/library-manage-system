const express = require('express');
const router = express.Router();

const {
	getStudentDataController,
	searchStudentDataController,
	addStudentDataController,
	deleteStudentDataController,
	getBookDataController,
	searchBookDataController,
	addBookController,
	borrowBookController,
	returnBookController,
	deleteBookDataController,
} = require('../controllers/librarianController');

router.get('/student-data', getStudentDataController);
router.post('/search/student-data', searchStudentDataController);
router.post('/add/student-data', addStudentDataController);
router.delete('/delete/student-data/:id', deleteStudentDataController);

router.get('/book-data', getBookDataController);
router.post('/search/book-data', searchBookDataController);
router.post('/add-book', addBookController);
router.post('/borrow-book', borrowBookController);
router.put('/return-book/:id', returnBookController);
router.delete('/delete-book/:id', deleteBookDataController);

module.exports = router;
