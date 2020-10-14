const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Orden = sequelize.define('orden', {
        estado:{
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    return Orden;
};