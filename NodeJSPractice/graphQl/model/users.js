
module.exports = (DataTypes , sequelize) => {
        const users = sequelize.define('users', {
            name : DataTypes.STRING,
            email : DataTypes.STRING,
            gender : DataTypes.STRING,
            status : DataTypes.STRING,
        })
        return users;
    };
       
