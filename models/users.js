'use strict'
const Sequelize = require('sequelize');
const db = require('../bin/index');
var bcrypt = require('bcrypt');
const User = db.define('m_user', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  username: {
    type: Sequelize.STRING,
    // unique: true,
  },
  phone: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
  },
  role: {
    type: Sequelize.STRING,
  },
  createdAt: Sequelize.DATE,
  updatedAt: Sequelize.DATE,
  isDeleted: Sequelize.TINYINT,
});

User.sync();


module.exports = User;