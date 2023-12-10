// models/Vehicle.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConn'); 

const Vehicle = sequelize.define('Vehicle', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Vehicle;
