import Sequelize from 'sequelize';
import {client} from '../../config/config.js';

export const sequelize = new Sequelize(client.database, client.user, client.password, {
  host: client.host,
  dialect: "postgresql",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });



//module.exports = sequelize;

//const {Sequelize} = require('sequelize');
//const {client} = require('../../config/config');
//const setUpModels = require('../models/index');