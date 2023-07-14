const {Sequelize,DataTypes} = require('sequelize');
const sequelize = new Sequelize('krupalip','krupalip','mJ307ySceDhxuJInLr9C', {
    host: '15.206.7.200',
    port: 3310,
    dialect: 'mysql',
    logging: false
} ); 
sequelize.authenticate().then(()=>{
    console.log("Connected");
})
.catch(err=>{
    console.log('"error ' + err);
});

const db ={};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('./users')(sequelize, DataTypes);
  
db.sequelize.sync().then(()=>{
    console.log("yes");
})
module.exports = db;
