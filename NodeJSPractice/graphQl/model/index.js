const {Sequelize, DataTypes} = require('sequelize');
const sequelize = require('../config/db')

const db = sequelize;
db.sequelize = sequelize;
db.sequelize.sync({force : false})
.then(()=>{
    console.log("yes re-sync");
})
db.users = require('./users')(Sequelize, DataTypes)  ;
module.exports = db;