const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Order = sequelize.define('order', {
        state:{
            type: DataTypes.STRING,
            allowNull: false
        }
    })
    return Order;
};