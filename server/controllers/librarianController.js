const { Sequelize } = require('../models');
const db = require('../models');

const Op = Sequelize.Op;

const getStudentDataController = async (req, res) => {
	const getStudentData = await db.Student.findAll();

	res.status(200).send({ studentData: getStudentData });
};

const getBookDataController = async (req, res) => {
	const getBookData = await db.Book.findAll();

	res.status(200).send({ bookData: getBookData });
};

const searchStudentDataController = async (req, res) => {
	const { studentId } = req.body;
	let getStudentData;

	if (!studentId) {
		getStudentData = await db.Student.findAll();
	} else {
		getStudentData = await db.Student.findAll({
			where: { studentId: { [Op.substring]: studentId } },
		});
	}

	res.status(200).send({ studentData: getStudentData });
};

const searchBookDataController = async (req, res) => {
	const { bookName } = req.body;
	let getBookData;

	if (!bookName) {
		getBookData = await db.Book.findAll();
	} else {
		getBookData = await db.Book.findAll({
			where: { name: { [Op.substring]: bookName } },
		});
	}

	res.status(200).send({ bookData: getBookData });
};

const addBookController = async (req, res) => {
	const { bookName, bookType, bookId } = req.body;
	const targetBook = await db.Book.findOne({ where: { name: bookName } });

	if (targetBook) {
		res.status(400).send({ message: 'หนังสือเล่มนี้มีอยู่ในฐานข้อมูลแล้ว' });
	} else {
		await db.Book.create({
			id: bookId,
			name: bookName,
			typeOfBook: bookType,
			status: 'ปกติ',
		});

		res
			.status(201)
			.send({ message: 'หนังสือเล่มนี้ถูกเพิ่มเข้าไปในฐานข้อมูลแล้ว' });
	}
};

const borrowBookController = async (req, res) => {
	const { studentId, bookId, date } = req.body;
	const targetBook = await db.Book.findOne({ where: { id: bookId } });
	const targetStudent = await db.Student.findOne({
		where: { studentId: studentId },
	});
	const isBorrowingBook = await db.Book.findOne({
		where: { id: bookId, status: 'ปกติ' },
	});

	if (!targetBook)
		return res.status(400).send({ message: 'รหัสหนังสือไม่ถูกต้อง' });

	if (!targetStudent)
		return res.status(400).send({ message: 'รหัสประจำตัวนักเรียนไม่ถูกต้อง' });

	if (!isBorrowingBook)
		return res.status(400).send({ message: 'หนังสือเล่มนี้ถูกยืมอยู่' });

	await isBorrowingBook.update({ status: 'ยืม' });
	await db.Owns.create({
		borrowedDate: date,
		book_id: bookId,
		student_id: studentId,
	});
	await db.Student.increment(
		{ numberOfBorrowingBooks: +1 },
		{ where: { studentId: studentId } }
	);

	return res.status(201).send({ message: 'ยืมหนังสือเสร็จสิ้น' });
};

const returnBookController = async (req, res) => {
	const { bookId } = req.body;
	const targetBook = await db.Book.findOne({ where: { id: bookId } });
	const isBorrowingBook = await db.Book.findOne({
		where: { id: bookId, status: 'ยืม' },
	});

	if (!targetBook)
		return res.status(400).send({ message: 'รหัสหนังสือไม่ถูกต้อง' });

	if (!isBorrowingBook)
		return res.status(400).send({ message: 'หนังสือเล่มนี้ไม่ได้ถูกยืมอยู่' });

	await isBorrowingBook.update({ status: 'ปกติ' });
	await db.Owns.destroy({ where: { book_id: bookId } });

	return res.status(201).send({ message: 'คืนหนังสือเสร็จสิ้น' });
};

module.exports = {
	getStudentDataController,
	getBookDataController,
	searchStudentDataController,
	searchBookDataController,
	addBookController,
	borrowBookController,
	returnBookController,
};
