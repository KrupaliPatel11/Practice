module.exports = (sequelize, DataTypes)=> {
    const Users = sequelize.define("users", {
        name: {
            type: DataTypes.STRING,
            // setter method
            set(value) {
                this.setDataValue('name', value+ ' zignuts')
            },
            // Get method
            get(){
               return  this.getDataValue('name')+ 'XYZ';
            }
        },
        email: {
            type: DataTypes.STRING,
            // defaultValue: 'test@gmail.com'
            // allowNull: false,
            // unique: false
        },
        gender: {
            type: DataTypes.STRING,
            validate: {
                // equals: {
                //     args: 'female',
                //     msg: 'Please Enter Only Female'
                // },
                isIn: {
                    args: [['male', 'female']] ,
                    msg: 'Please Select From Male/Female'
                }
            }
        },
    }, { 
        // to delete default column createdAt and updatedAt
        timestamps: false
    });
    return Users;
}