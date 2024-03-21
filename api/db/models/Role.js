import {DataTypes} from 'sequelize';
import {sequelize} from '../connect/database.js';
import {User} from "./User.js";

export const Role = sequelize.define(
  'role',
  {
    id: {
      primaryKey: true,
      type: DataTypes.UUID
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING(20),
      field: 'name',
    },
    description: {
      allowNull: true,
      type: DataTypes.STRING,
      field: 'description',
    }
  },
  {
    tableName: 'role',
    timeStamps: true // to get columns of updateAt and createdAt
  }
);

// setting of the relation Role-Table
Role.hasMany(User, {
  sourceKey: 'id'
});

User.belongsTo(Role, {
  targetKey: 'id'
});