const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Adress = sequelize.define('adress', {
        firstLine:{
            type: DataTypes.STRING,
            allowNull: false
        },
        secondLine:{
            type: DataTypes.STRING
        },
        province:{
            type: DataTypes.STRING,
            allowNull: false
        },
        district:{
            type: DataTypes.STRING,
            allowNull: false
        },
        postalCode:{
            type: DataTypes.STRING,
            allowNull: false
        },
        state:{
            type: DataTypes.STRING,
            defaultValue: "alta" 
        }
    })
    return Adress;
};