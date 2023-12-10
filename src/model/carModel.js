// models/CarType.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConn');

const CarType = sequelize.define('CarType', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = CarType;
