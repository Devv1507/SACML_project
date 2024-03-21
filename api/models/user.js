'use strict';

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

/* 
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.

    static associate({Role}) {
      // define association here
      this.belongsTo(Role, {
        foreignKey: 'roleId',
        targetKey: 'id'
    });
    }
  }
  User.init({
    name: DataTypes.STRING,
    surname: DataTypes.STRING,
    address: DataTypes.STRING,
    email: DataTypes.STRING,
    roleId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
    freezeTableName: true
  });
  return User;
};
 */