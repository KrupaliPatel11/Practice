const Sequelize = require('sequelize');
const sequelize = new Sequelize('krupalip', 'mJ307ySceDhxuJInLr9C', '15.206.7.200', {
    host: 'localhost',
    dialect: 'mysql',
    logging: true
})

sequelize.authenticate().then(()=>{
    console.log("Connected To Database");
}).catch(e=>{
    console.log('error' + e);
})

module.exports = sequelize;