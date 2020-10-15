const server = require('express').Router();
const { User } = require('../db.js')


server.get('/', (req, res) => {
    User.findAll()
      .then(users => {
        res.send(users);
      })
  });

  server.post('/', (req, res) => {
    User.create({
      name: req.body.name,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.password
    }).then((user) => {
      if (!user) {
        res.status(404).json({ error: 'hola' })
        return;
      }
      return res.status(201).json("usuario creado correctamente")
    })
  })
  
  server.delete("/:id", (req, res) => {          
    User.findByPk(req.params.id).then((usuario) => {
      usuario.destroy();
      res.status(200).send("El usuario se elimino correctamente")
      return;
    })
  })

 // Falta por probar :D!

  server.delete("/:idUser/cart", (req, res) => {          
    Product.findByPk(req.params.idUser).then((cart) => {
      cart.destroy();
      res.status(200).send("el carrito se vació correctamente")
      return;
    })
  })
  

  module.exports = server;


  // app.use(bodyParser.urlencoded({extended: false}));
// app.use(bodyParser.json());
// let usuario={
//     nombre: '',
//     apellido: '',
// };
// let respuesta ={
//     error: false,
//     codigo: 200,
//     mensaje:''
// };

// server.get('/', (req,res)=>{
//     respuesta = {
//         error: true,
//         codigo: 200,
//         mensaje: 'Punto de inicio'
//     };
//     res.send(respuesta);
// });
// server.get('/usuario', (req,res)=>{
//     respuesta = {
//         error: false,
//         codigo: 200,
//         mensaje:''
//     };
//     if(usuario.nombre === '' || usuario.apellido === ''){
//         respuesta = {
//             error: true,
//             codigo: 501,
//             mensaje: 'El usuario no ha sido creado'
//         };
//     }
//     else{
//         respuesta = {
//             error: false,
//             codigo: 200,
//             mensaje: 'respuesta del usuario',
//             respuesta: usuario
//         };
//     }
//     res.send(respuesta)
// })

/*CREACION DE USUARIO*/
// server.post('/usuario', (req, res)=>{
//     if(!req.body.nombre || !req.body.apellido){
//         respuesta = {
//             error: true,
//             codigo: 502,
//             mensaje: 'El campo nombre y apellido son requeridos'
//         };
//     }else {
//         if(usuario.nombre !== '' || usuario.apellido !== ''){
//             respuesta ={
//                 error: true,
//                 codigo: 503,
//                 mensaje: 'El usuario fue creado previamente'
//             };
//         } else{
//             usuario = {
//                 nombre: req.body.nombre,
//                 apellido: req.body.apellido
//             };
//             respuesta = {
//                 error: false,
//                 codigo: 200,
//                 mensaje: 'Usuario creado',
//                 respuesta: usuario
//             };
//         }
//     }
//     res.send(respuesta);
// });

/*FLASHADA MIA */
