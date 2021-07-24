module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define(
    "Book",
    {
      name: {
        type: DataTypes.STRING(50),
      },
    },
    {
      tableName: "books",
      timestamps: false,
    }
  );

  return model;
};
