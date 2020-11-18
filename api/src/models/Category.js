 const { DataTypes } = require('sequelize');
 
 // se crea el modelo de categorias y se hace 
 // la relacion belongsToMany(productos)
 module.exports = (sequelize) => {

     const Category = sequelize.define('category', {
         id:{
             type: DataTypes.INTEGER,
             autoIncrement: true,
             primaryKey: true  
         },
         name: {
           type: DataTypes.STRING,
           allowNull: false,
         },
         description: {
             type: DataTypes.STRING  
         }
        },{});
       
       return Category;
     };
  

    

