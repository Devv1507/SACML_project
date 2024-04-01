// This file sets the configuration for database connection
const dotenv = require('dotenv'); // required module to use environment variables
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

module.exports = { development: config, test: config, production: config };