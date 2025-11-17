const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.DATABASE_STORAGE || './database.sqlite',
  logging: false
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Tarefa = require('./tarefa')(sequelize, Sequelize);

module.exports = db;
