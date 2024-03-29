'use strict';
module.exports = (sequelize, DataTypes) => {
  const Department = sequelize.define('Department', {
    name: DataTypes.STRING,
/*     email: DataTypes.STRING */
  }, {
    timestamps: true,
  });
  Department.associate = function(models) {
    // associations can be defined here
    Department.hasMany(models.City, {
      foreignKey: "departmentId",
      sourceKey: "id"
    });
  };
  return Department;
};
