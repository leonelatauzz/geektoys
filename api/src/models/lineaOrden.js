const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const lineaOrden = sequelize.define('lineaOrden', {
        price: {
            type: DataTypes.FLOAT,
            allowNull: false
          },
          stock: {
            type: DataTypes.INTEGER,
            allowNull: false
          }          
    });
    return lineaOrden;
};