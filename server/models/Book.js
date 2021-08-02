module.exports = (sequelize, DataTypes) => {
	const model = sequelize.define(
		'Book',
		{
			id: {
				type: DataTypes.STRING,
				primaryKey: true,
			},
			name: {
				type: DataTypes.STRING(100),
			},
			typeOfBook: {
				type: DataTypes.STRING(50),
			},
			status: {
				type: DataTypes.STRING(50),
			},
		},
		{
			tableName: 'books',
			timestamps: false,
		}
	);

	model.associate = models => {
		model.belongsToMany(models.Student, {
			through: models.Owns,
			foreignKey: 'book_id',
		});
	};

	return model;
};
