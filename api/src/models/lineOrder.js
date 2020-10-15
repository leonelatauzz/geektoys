const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const lineOrder = sequelize.define('lineOrder', {
        price: {
            type: DataTypes.FLOAT,
            allowNull: false
          },
          stock: {
            type: DataTypes.INTEGER,
            allowNull: false
          }          
    });
    return lineOrder;
};