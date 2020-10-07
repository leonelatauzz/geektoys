 const { DataTypes } = require('sequelize');
 //const db = require('../db');
 //const producto = db.model('product')
 //let categorias;

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


//   //categorias.belongsToMany(producto, { through: 'ProductoCategoria' });
//   producto.belongsToMany(categorias, { through: 'ProductoCategoria' });

    

