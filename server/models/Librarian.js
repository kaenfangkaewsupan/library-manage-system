module.exports = (sequelize, DataTypes) => {
	const model = sequelize.define(
		'Librarian',
		{
			username: {
				type: DataTypes.STRING(50),
				unique: true,
			},
			password: {
				type: DataTypes.STRING(50),
			},
		},
		{
			tableName: 'librarians',
			timestamps: false,
		}
	);

	return model;
};
