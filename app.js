// index.js or app.js
const express = require('express');
const app = express();
const routes = require('./src/routes');
const sequelize = require('./src/config/dbConn');
const PORT = process.env.PORT || 3000;

// Use the routes
app.use('/', routes);

sequelize.sync().then(() => {
    console.log('All models were synchronized successfully.');
});


app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`);
});
