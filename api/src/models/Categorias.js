 const { DataTypes } = require('sequelize');
 //const db = require('../db');
 //const producto = db.model('product')
 //let categorias;

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
    //   module.exports = (sequelize, DataTypes) => {
    //    var Usuario = sequelize.define('Usuario', {
    //      nombre: DataTypes.STRING,
    //      apellidoP: DataTypes.STRING,
    //      apellidoM: DataTypes.STRING,
    //      email: DataTypes.STRING
    //    }, {});
    //    Usuario.associate = function(models) {
    //      // associations can be defined here
    //      Usuario.belongsToMany(models.LenguajeP, {
    //        through: 'Usuario_LenguajeP',
    //        as: 'lenguajesProgramacion',
    //        foreignKey: 'UsuarioId',
    //      })
    //    };
    //    return Usuario;
    //  };


//   //categorias.belongsToMany(producto, { through: 'ProductoCategoria' });
//   producto.belongsToMany(categorias, { through: 'ProductoCategoria' });

    

