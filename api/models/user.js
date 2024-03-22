'use strict';
// This is another way to set the models, besides '...extends Model'
// I prefer to use this sequelize.define() for less code lines
// and the ease of establishing the associations
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    surname: DataTypes.STRING,
    address: DataTypes.STRING,
    email: DataTypes.STRING
  }, {
    timestamps: true,
  });
  User.associate = function(models) {
    // associations can be defined here
    User.belongsTo(models.Role, {
      foreignKey: "roleId",
      targetKey: "id"
    });
  };
  return User;
};
