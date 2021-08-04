const express = require('express');
const router = express.Router();

const {
	librarianLoginController,
	getStudentDataController,
} = require('../controllers/loginController');

router.post('/librarian', librarianLoginController);
router.post('/get/student-data', getStudentDataController);

module.exports = router;
