const server = require('express').Router();
const { User, Product, Order, cart } = require('../db.js');

server.post('/login', (req, res) => {
  console.log(req.body)
  User.findOne({
    where: {
      email: req.body.email,
      password: req.body.password
    }, include: Order
  }).then(user => {
    if(!user) {
      res.status(404).json({ error: 'Usuario no registrado' })
        return;
    }
    res.json(user)
  })
})



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


server.get('/', (req, res) => {
    User.findAll()
      .then(users => {
        res.send(users);
      })
  });

    server.get("/:id/orders", (req,res)=>{
      Order.findAll({
        where: {
          userId: req.params.id
        }
      }).then((orden)=>{
        if(!orden){
          res.status(404).send("orden no encontrada")
        } else {
          res.status(200).send(orden)
        }
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
        res.status(404).json({ error: 'no se pudo crear el usuario' })
      } else {
        res.status(200).send("Usuario creado correctamente")
      }
    })
  }) 
  

server.put("/:idUser/cart", (req, res) => {
  cart.findOne({
    where: {
      orderId: req.body.orderId,
      productId: req.body.productId
    }
  }).then(ca => {
    ca.update({amount: req.body.amount});
    res.json(ca)
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
  User.findOne({
    where:{
      email: req.body.email
  }}).then(user =>{
    if(user){
      res.send("El usuario ya esta registrado")
    }else{
    User.create({
      name: req.body.name,
      lastname: req.body.lastname,
      email: req.body.email,
      password: req.body.password
    }).then((usuario) => {
      if (!usuario) {
        res.status(404).json({ error: 'hola' })
        return;
      }
      return res.status(201).json(usuario);
    })}
  })
})



server.delete('/:idUser/cart/:idProducto/:idOrder', (req, res) => {
  Product.findByPk(req.params.idProducto)
    .then((prod) => {
      if (!prod) {
        res.status(404).json({ error: 'Producto no encontrado' })
        return;
      }
      Order.findByPk(req.params.idOrder).then((orden) => {
        if (!orden) {
          res.status(404).json({ error: 'Orden no encontrada' })
          return;
        }
        orden.removeProduct(prod);
        res.send(`>> Se eliminó la categoría id=${req.params.idOrder} al Producto id=${req.params.idProducto}`);
        return;
      });
    })
})





module.exports = server;


