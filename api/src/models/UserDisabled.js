const { DataTypes, Sequelize } = require('sequelize');

module.exports = (Sequelize) =>{
    const UserDisabled = Sequelize.define('userDisabled',{
        message: {
            type: DataTypes.STRING,
            defaultValue: " sin motivo alguno "
        },
        valoration: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        }
    }) 
    return UserDisabled
}