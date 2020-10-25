const server = require('express').Router();
const { User, Product, Order, cart, Adress } = require('../db.js');
const hash = require('pbkdf2')
const crypto = require('crypto')




server.post('/login', (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    }, include: Order
  }).then(user => {
    if (!user) {
      res.send('Datos incorrectos')
      return;
    }
    let userSalt = user.dataValues.salt
    const contra = req.body.password
    const key = hash.pbkdf2Sync(contra, userSalt, 100000, 64, 'sha512');
    const password = key.toString('hex')
    if (password !== user.dataValues.password) {
      res.send("Datos incorrectos")
      return;
    }
    res.json(user)
  })
})

server.get('/orders/:userId', (req, res) => {
  User.findOne({
    where: {
      id: req.params.userId
    }, include: Order
  }).then(user => {
    if (!user) {
      res.send('Datos incorrectos')
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

server.get("/:id/orders", (req, res) => {
  Order.findAll({
    where: {
      userId: req.params.id
    }
  }).then((orden) => {
    if (!orden) {
      res.status(404).send("orden no encontrada")
    } else {
      res.status(200).send(orden)
    }
  })
})

server.post('/', (req, res) => {
  const salt = crypto.randomBytes(32).toString('hex')
  const contra = req.body.password
  const key = hash.pbkdf2Sync(contra, salt, 100000, 64, 'sha512');
  const password = key.toString('hex')
  console.log(salt)
  User.findOne({
    where: {
      email: req.body.email
    }
  }).then(us => {
    if (us) {
      res.send('Usuario ya existe')
    } else {
      User.create({
        name: req.body.name,
        lastname: req.body.lastname,
        email: req.body.email,
        password: password,
        role: "user",
        salt: salt,
        state: "alta"
      }).then((user) => {
        if (!user) {
          res.status(404).json({ error: 'no se pudo crear el usuario' })
        } else {
          res.status(200).json(user)
        }
      })
    }
  })
})


server.post('/:id/passwordReset', (req, res) => {
  User.findByPk(req.params.id)
    .then(user => {
      if (!user) {
        res.status(404).json({ error: 'no se encontro usuario con este email' })
      } else {
        const contrasena = req.body.password;
        const salt = user.dataValues.salt;
        const key = hash.pbkdf2Sync(contrasena, salt, 100000, 64, 'sha512');
        const passNuevo = key.toString('hex');

        user.update({ password: passNuevo })
        res.status(200).send('Contraseña modificada correctamente')
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
    ca.update({ amount: req.body.amount });
    res.json(ca)
  })

})

server.get('/:idUser',(req,res)=>{
  User.findByPk(req.params.idUser)
  .then(user=>{
    if(!user){
      res.send("usuario no encontrado")
    } else {
      res.status(200).send(user)
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


server.post('/newAdress/:userId', (req, res) => {
  console.log(req.body)
  Adress.create({
    firstLine: req.body.firstLine,
    secondLine: req.body.secondLine,
    province: req.body.province,
    district: req.body.district,
    postalCode: req.body.postalCode,
    userId: req.params.userId
  }).then(user => {
    User.findOne({
      where: {
        id: req.params.userId
      }, include: Adress
    }).then(user => {
      if (!user) {
        res.send('Datos incorrectos')
        return;
      }
      res.json(user)
    })
  })
})

server.get('/adress/:userId', (req, res) => {
  User.findOne({
    where: {
      id: req.params.userId
    }, include: Adress
  }).then(user => {
    if (!user) {
      res.send('Datos incorrectos')
      return;
    }
    res.json(user)
  })
})

server.get('/adress/edit/:adressId', (req, res) => {
  Adress.findOne({
    where: {
      id: req.params.adressId
    }
  }).then(adress => {
    if(!adress) {
      res.status(404).send('Dirección no encontrada')
      return;
    }
    res.json(adress)
  })
})

server.put('/editAdress/:userId/:adressId', (req, res) => {
  Adress.findOne({
    where: {
      id: req.params.adressId
    }
  }).then(adress => {
    adress.firstLine = req.body.firstLine,
      adress.secondLine = req.body.secondLine,
      adress.province = req.body.province,
      adress.district = req.body.district,
      adress.postalCode = req.body.postalCode,
      adress.save();
      res.send('Exito')
  })
})


server.delete('/deleteAdress/:userId/:adressId', (req, res) => {
  Adress.findOne({
    where: {
      id: req.params.adressId
    }
  }).then(adress => {
    if(!adress) {
      res.status(404).send('Dirección no encontrada')
    }
    adress.destroy();
    res.send('Dirección eliminada')
  })
})

server.put('/:userId/Promote', (req, res) => {
  User.findOne({
    where: {
      id: req.params.userId
    }
  }).then (users => {
    if(!users) {
      res.status(404).send('Usuario No Encontrado')
    }
  
    users.role = 'Admin',
    users.save();
    res.send(users)
  })
})

server.put('/:userId/Despromote', (req, res) => {
  User.findOne({
    where: {
      id: req.params.userId
    }
  }).then (users => {
    if(!users) {
      res.status(404).send('Usuario No Encontrado')
    }
  
    users.role = 'User',
    users.save();
    res.send(users)
  })
})


module.exports = server;


