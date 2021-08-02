module.exports = (sequelize, DataTypes) => {
	const model = sequelize.define(
		'Owns',
		{
			borrowedDate: {
				type: DataTypes.STRING,
			},
		},
		{
			timestamps: false,
			tableName: 'owns',
		}
	);

	return model;
};
