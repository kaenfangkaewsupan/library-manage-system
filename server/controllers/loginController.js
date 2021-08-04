const jwt = require('jsonwebtoken');

const db = require('../models');
const { Sequelize } = require('../models');

const Op = Sequelize.Op;

const librarianLoginController = async (req, res) => {
	const { username, password } = req.body;
	const targetUser = await db.Librarian.findOne({
		where: { username },
	});

	if (!targetUser) {
		res.status(400).send({ message: 'ชื่อผู้ใช้ไม่ถูกต้อง' });
	} else {
		const isCorrectPassword = password === targetUser.password;

		if (isCorrectPassword) {
			const payload = {
				id: targetUser.id,
			};

			const token = jwt.sign(payload, 'myl1br@ry', { expiresIn: '12h' });

			res.status(200).send({
				token,
				user: targetUser.username,
				message: `Welcome ${targetUser.username}, Login successful`,
			});
		} else {
			res.status(400).send({ message: 'รหัสผ่านไม่ถูกต้อง' });
		}
	}
};

const getStudentDataController = async (req, res) => {
	const { studentId } = req.body;
	let getStudentData;

	if (!studentId) {
		getStudentData = null;
	} else {
		getStudentData = await db.Owns.findAll({
			where: { student_id: { [Op.substring]: studentId } },
		});
	}

	res.status(200).send({ studentData: getStudentData });
};

module.exports = { librarianLoginController, getStudentDataController };
