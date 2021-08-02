const express = require('express');
const router = express.Router();

const librarianLoginController = require('../controllers/loginController');

router.post('/librarian', librarianLoginController);

module.exports = router;
