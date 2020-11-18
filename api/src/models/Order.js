const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Order = sequelize.define('order', {
        state:{
            type: DataTypes.ENUM('carrito', 'pagada', 'entregada', 'cancelada'),
            allowNull: false
        },
        deliveryMethod: {
            type: DataTypes.ENUM('sucursal', 'adress')
        }
    })
    return Order;
};