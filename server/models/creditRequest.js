'use strict';
module.exports = (sequelize, DataTypes) => {
  const CreditRequest = sequelize.define('CreditRequest', {
    amount: DataTypes.FLOAT,
    description: DataTypes.STRING,
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
