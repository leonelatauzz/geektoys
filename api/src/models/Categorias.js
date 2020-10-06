const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('categorias', {
        id:{
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true  
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        descripcion: {
            type: DataTypes.STRING  
        }
      });
    };
    