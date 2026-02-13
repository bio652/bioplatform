const { Sequelize } = require('sequelize');
const { dbOptions } = require('../../config');

const sequelize = new Sequelize(
  dbOptions.db_name,
  dbOptions.db_user,
  dbOptions.db_pass,
  {
    host: dbOptions.db_host,
    port: dbOptions.db_port,
    dialect: 'postgres',
    logging: false
  }
);

async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log('Database was connected');
  } catch (error) {
    console.error('Database connection error:', error.message);
  }
}

async function syncDB() {
  try {
    await sequelize.sync();
    console.log('Database synchronized');
  } catch (error) {
    console.error('Error synchronizing database:', error.message);
  }
}

module.exports = { sequelize, connectDB, syncDB };

