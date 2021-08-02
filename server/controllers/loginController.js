const jwt = require('jsonwebtoken');

const db = require('../models');

const librarianLoginController = async (req, res) => {
	const { username, password } = req.body;
	const targetUser = await db.Librarian.findOne({
		where: { username: username },
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
				token: token,
				user: targetUser.username,
				message: `Welcome ${targetUser.username}, Login successful`,
			});
		} else {
			res.status(400).send({ message: 'รหัสผ่านไม่ถูกต้อง' });
		}
	}
};

module.exports = librarianLoginController;
