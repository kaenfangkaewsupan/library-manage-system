module.exports = (sequelize, DataTypes) => {
	const model = sequelize.define(
		'Student',
		{
			studentId: {
				type: DataTypes.STRING(10),
				primaryKey: true,
			},
			idCardNumber: {
				type: DataTypes.STRING(13),
				unique: true,
			},
			firstName: {
				type: DataTypes.STRING(50),
			},
			lastName: {
				type: DataTypes.STRING(50),
			},
			numberOfAccessLibrary: {
				type: DataTypes.INTEGER,
			},
			numberOfBorrowingBooks: {
				type: DataTypes.INTEGER,
			},
		},
		{
			tableName: 'students',
			timestamps: false,
		}
	);

	model.associate = models => {
		model.belongsToMany(models.Book, {
			through: models.Owns,
			foreignKey: 'student_id',
		});
	};

	return model;
};
