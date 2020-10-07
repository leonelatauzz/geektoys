 const { DataTypes } = require('sequelize');
 
 // se crea el modelo de categorias y se hace 
 // la relacion belongsToMany(productos)
 module.exports = (sequelize) => {

     var Categorias = sequelize.define('categorias', {
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
        },{});
       Categorias.associate = function(models) {
         Categorias.belongsToMany(models.product,{
           through: 'ProductoCategoria'
         })
       }
       return Categorias;
     };
  

    

