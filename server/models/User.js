module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define(
    "User",
    {
      username: {
        type: DataTypes.STRING(50),
        unique: true,
      },
      password: {
        type: DataTypes.STRING(200),
      },
      email: {
        type: DataTypes.STRING(50),
        unique: true,
      },
    },
    {
      tableName: "users",
      timestamps: false,
    }
  );

  return model;
};
