'use strict';
module.exports = (sequelize, DataTypes) => {
  const CreditRequest = sequelize.define('CreditRequest', {
    job: DataTypes.INTEGER,
    credit_amount: DataTypes.INTEGER,
    duration: DataTypes.INTEGER,
    housing: DataTypes.STRING,
    savings_account: DataTypes.STRING,
    checking_account: DataTypes.STRING,
    purpose: DataTypes.STRING,
    creditHistory: DataTypes.STRING,
    completed: DataTypes.BOOLEAN,
    status: DataTypes.STRING
  }, {
    timestamps: true,
  });
  CreditRequest.associate = function(models) {
    // associations can be defined here
    CreditRequest.belongsTo(models.User, {
      foreignKey: "userId",
      targetKey: "id"
    });
  };
  return CreditRequest;
};
