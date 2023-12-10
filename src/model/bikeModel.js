const { DataTypes } = require('sequelize');
const  sequelize  = require('../config/dbConn');

const Bike = sequelize.define('Bike', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Bike;
