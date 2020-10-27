require('dotenv').config()
const server = require('express').Router();
const { User, Product, Order, cart, Adress, UserDisabled } = require('../db.js');
const hash = require('pbkdf2')
const crypto = require('crypto');
const jwt = require('jsonwebtoken')

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    res.sendStatus(401)
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      res.sendStatus(403)
    }
    req.user = user;
    next()
  })
}


server.post('/login', (req, res) => {
  const userName = req.body.email;
  const user = { name: userName }
  User.findOne({
    where: {
      email: req.body.email,
    }
  }).then(usera => {
    if (!usera) {
      res.send('Datos incorrectos')
      return;
    }
    let userSalt = usera.dataValues.salt
    const contra = req.body.password
    const key = hash.pbkdf2Sync(contra, userSalt, 100000, 64, 'sha512');
    const password = key.toString('hex')
    if (password !== usera.dataValues.password) {
      res.send("Datos incorrectos")
      return;
    }
    const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    res.json({ accessToken: accessToken })
  }).catch(err => {
    console.log(err)
  })
})

server.get('/orders/getOrders', authenticateToken, (req, res) => {
  User.findOne({
    where: {
      email: req.user.name
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
  const userName = req.body.email;
  const user = { name: userName }
  const salt = crypto.randomBytes(32).toString('hex')
  const contra = req.body.password
  const key = hash.pbkdf2Sync(contra, salt, 100000, 64, 'sha512');
  const password = key.toString('hex')
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
      }).then((usero) => {
        if (!usero) {
          res.status(404).json({ error: 'no se pudo crear el usuario' })
        } else {
          const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
          res.json({ accessToken: accessToken })
        }
      }).catch(err => {
        console.log(err)
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
    if (!adress) {
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
    if (!adress) {
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
  }).then(users => {
    if (!users) {
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
  }).then(users => {
    if (!users) {
      res.status(404).send('Usuario No Encontrado')
    }

    users.role = 'User',
      users.save();
    res.send(users)
  })
})


server.put('/:iduser/baja', (req, res) => {
  User.findByPk(req.params.iduser)
    .then(user => {
      if (!user) {
        res.status(404).send("no se encontro usuario")
      } else {
        user.state = "Baja"
        user.save()
        res.status(201).send(user)
      }
    })
})

server.put('/:idAdress/adress/baja', (req, res) => {
  Adress.findByPk(req.params.idAdress)
    .then(adress => {
      if (!adress) {
        res.status(404).send("no se encontro la direccion")
      } else {
        adress.state = "Baja"
        adress.save()
        res.status(201).send(adress)
      }
    })
})

server.get('/baja', (req, res) => {
  UserDisabled.findAll()
    .then(user => {
      res.status(200).send(user)
    })
})

server.post('/:userId/motivo/baja', (req, res) => {
  UserDisabled.create({
    message: req.body.message,
    valoration: req.body.valoration,
    userId: req.params.userId
  }).then(user => {
    User.findOne({
      where: {
        id: req.params.userId
      }, include: UserDisabled
    }).then(user => {
      if (!user) {
        res.send('Datos incorrectos')
        return;
      }
      res.json(user)
    })
  })
})






module.exports = server;


