//const dotenv = (require('dotenv').config()).parsed;
//import dotenv from 'dotenv';
//(dotenv.config()).parsed;
const dotenv = require('dotenv');
(dotenv.config()).parsed;

const config = {
    "username": process.env.DB_USER,
    "host": process.env.DB_HOST,
    "database": process.env.DB_DATABASE,
    "password": process.env.DB_PASSWORD,
    "port": process.env.DB_PORT,
    "dialect": "postgresql",
    "dialectOptions": {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      }
    }
};

/* export default {
  development: config,
  test: config,
  production: config,
}; */

module.exports = { development: config, test: config, production: config };