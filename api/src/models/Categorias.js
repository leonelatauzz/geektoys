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
             type: DataTypes.STRING  //Esto no es necesario para nuestro modelo
         }
        },{});
       
       return Categorias;
     };
  

    

