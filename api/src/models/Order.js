const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Order = sequelize.define('order', {
        status:{
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    return Order;
};