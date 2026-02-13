const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/db');

const Nft = sequelize.define('Nft', {
  token: {
    type: DataTypes.STRING,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  img: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  owner: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  onSale: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'nfts',
  timestamps: false
});

module.exports = { Nft };
