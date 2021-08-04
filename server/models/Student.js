module.exports = (sequelize, DataTypes) => {
	const model = sequelize.define(
		'Student',
		{
			studentId: {
				type: DataTypes.STRING(10),
				primaryKey: true,
			},
			firstName: {
				type: DataTypes.STRING(50),
			},
			lastName: {
				type: DataTypes.STRING(50),
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
