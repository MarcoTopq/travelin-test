var Sequelize = require('sequelize');

var db = new Sequelize({
  database: 'sql12315055', 
  username: 'sql12315055', 
  password: 'CBwTBSPfdk',
  host: 'sql12.freemysqlhosting.net',
  port: 3306,
  dialect: 'mysql',
  operatorsAliases: false,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

db
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = db;