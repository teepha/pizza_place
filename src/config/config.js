/* eslint-disable no-var */
var dotenv = require('dotenv');

dotenv.config();

// required environment variables
["DB_PORT", "DB_USER", "DB_PASSWORD", "DB_HOST"].forEach((name) => {
  if (!process.env[name]) {
    throw new Error(`Environment variable ${name} is missing`);
  }
});

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    operatorsAliases: false,
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    operatorsAliases: false,
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    operatorsAliases: false,
  },
};
