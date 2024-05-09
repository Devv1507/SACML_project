'use strict';
module.exports = (sequelize, DataTypes) => {
  const City = sequelize.define('City', {
    name: DataTypes.STRING,
/*     email: DataTypes.STRING */
  }, {
    timestamps: true,
  });
  City.associate = function(models) {
    // associations can be defined here
    City.belongsTo(models.Department, {
      foreignKey: "departmentId",
      targetKey: "id"
    });
  };
  return City;
};
