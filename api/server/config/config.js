require('dotenv').config();


module.exports = {

  development: {
    database: 'rest',
    username: 'postgres',
    password: 'postgres',
    host: 'localhost',
    dialect: 'postgres',
    port: '35432'
  }
}