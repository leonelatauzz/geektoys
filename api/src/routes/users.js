const server = require('express').Router();
const { User, Product, Order, cart } = require('../db.js');


server.post('/:idUser/cart', (req, res) => {
  Order.findByPk(req.body.idOrder)
    .then(order => {
      if (!order) {
        res.status(404).json({ error: 'No se encontro orden con este ID' })
        return;
      } else {
        Product.findByPk(req.body.idProduct)
          .then(producto => {
            if (!producto) {
              res.status(404).json({ error: 'No se encontro un producto con este ID' });
              return;
            } else {
              order.addProduct(producto, { through: { price: req.body.price, amount: req.body.amount } });
              res.send("Exito");
            }
          })
      }
    })
});

server.put("/:idUser/cart", (req, res) => {

  Order.findByPk(req.body.idOrder)
    .then(order => {
      if (!order) {
        res.status(404).json({ error: 'No se encontro orden con este ID' })
        return;
      } else {
        cart.findOne({
          where:{
            productId: req.body.idProduct
          }
        }).then(carrito=>{
          // console.log(carrito.dataValues.amount)
          // console.log(req.body.amount)
          carrito.amount = req.body.amount;
          carrito.save();
          res.json("Cantidad modificada correctamente")
        })
      }
    })
})


server.get('/', (req, res) => {
  User.findAll()
    .then(users => {
      res.send(users);
    })
});
// GET /users/:id/orders
server.get("/:id/orders", (req, res) => {
  User.findAll({
    where: {
      id: req.params.id
    },
    include: Order
  })

})

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
    return res.status(201).json(user);
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
