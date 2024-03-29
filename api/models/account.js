'use strict';
module.exports = (sequelize, DataTypes) => {
  const Account = sequelize.define('Account', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    timestamps: true,
  });
  Account.associate = function(models) {
    // associations can be defined here
    Account.hasOne(models.User, {
      foreignKey: "email",
      sourceKey: "email"
    });
  };
  return Account;
};
