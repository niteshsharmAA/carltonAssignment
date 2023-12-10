// models/Booking.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/dbConn'); 

const Booking = sequelize.define('Booking', {
  startTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  endTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

module.exports = Booking;
