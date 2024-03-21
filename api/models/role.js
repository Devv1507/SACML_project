'use strict';

module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    name: DataTypes.STRING,
    description: DataTypes.STRING
  }, {
    timestamps: true,
  });
  Role.associate = function(models) {
    // associations can be defined here
    Role.hasMany(models.User, {
      foreignKey: "roleId",
      sourceKey: "id"
    });
  };
  return Role;
};
