const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('template1', 'postgres', '1234', {
  host: 'localhost',
  dialect: 'postgres',
  define: {
    timestamps: false, 
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
