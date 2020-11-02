require('dotenv').config()
const server = require('express').Router();
const { User, Product, Order, cart, Adress, UserDisabled } = require('../db.js');
const hash = require('pbkdf2')
const crypto = require('crypto');
const _ = require('lodash')
const {OAuth2Client} = require ('google-auth-library')

const client = new OAuth2Client('689080969961-k4i4ccctckdvf369ln044ar325rfd1km.apps.googleusercontent.com')

const nodemailer = require("nodemailer")
const jwt = require('jsonwebtoken');
const multer = require('multer');
const upload = multer({ dest: `${__dirname}/uploads` });
const fs = require('fs')



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

server.post('/send-mail',(req,res)=>{
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,         
      pass: process.env.PASSWORD      
    },
    tls: {
      rejectUnauthorized: false
    }
  })

 

  let mailOptions = {
    from: process.env.EMAIL,
    to: req.body.email,
    cc: process.env.EMAIL,
    bcc: process.env.EMAIL,
    subject: `Confirmación de compra #${req.body.order}`,
    text: `Estimado cliente ${req.body.user.name} ${req.body.user.lastname}: ` + 
    `El pago de tu orden #${req.body.order} se ha realizado con éxito, el total de tu compra fue $${req.body.total}. ` +
    `Este mail cuenta como recibo de compra. Todos nuestros productos cuentan con garantía, en el caso de que el paquete llegue dañado u ocurra el extravío del mismo, la compañía se hará cargo de todos los gastos correspondientes. ` +
    "En caso de querer realizar la cancelación de la compra, enviar un correo electrónico a devoluciones_geektoys@gmail.com. " +
    "En nombre del equipo de GekkToys le agradecemos por su confianza."
    

    
  }

  transporter.sendMail(mailOptions,(err,data)=>{
    if(err){
      res.status(500).send(err)
    } else {
      res.status(200).send("email correcto")
    }
  })
})


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
  })
})

server.put("/info/:userId", upload.single('images'), (req, res) => {
  let pic;
  let product;
  if (req.file) {
    fs.renameSync(req.file.path, req.file.path + '.' + req.file.mimetype.split('/')[1])
    pic = req.file.filename + '.' + req.file.mimetype.split('/')[1];
    product = JSON.parse(req.body.json)
  } else if (!req.file) {
    product = JSON.parse(req.body.json)
    pic = product.picture
  }

  const { name, lastname} = product;
  User.findByPk(req.params.userId).then((us) => {
    us.name = name;
    us.lastname = lastname;
    us.picture = pic
    us.save();
    res.status(201).send("El usuario se modifico correctamente")
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
        role: "User",
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
      })
    }
  })
})


server.post('/:id/passwordReset', (req, res) => {
  const {oldPassword,password} = req.body
  console.log(oldPassword)
  console.log(password)

  User.findByPk(req.params.id)
    .then(user => {
      const key = hash.pbkdf2Sync(oldPassword, user.salt, 100000, 64, 'sha512');
      const hashOldPassword = key.toString('hex')
      const keyPass = hash.pbkdf2Sync(password, user.salt, 100000, 64, 'sha512');
      const newPassword = keyPass.toString('hex')
      if(hashOldPassword !== user.dataValues.password) {
        res.status(201).send('contraseña incorrecta')
        return
      }
      if( hashOldPassword === newPassword ) {
        res.status(201).send('la nueva contraseña no puede ser igual a la anterior')
        return
      }
        user.update({ password: newPassword })
        res.status(200).send('Contraseña modificada correctamente')
        return
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
        res.status(201).send('usuario dado de baja correctamente')
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


server.get('/:userId', (req,res)=>{
  User.findByPk(req.params.userId)
  .then(idUser=>{
    if(!idUser){
      res.status(404).send("El id que buscas no existe")
    }else{
      res.status(201).json(idUser)
    }
  })
})




module.exports = server;



server.post('/login/google', (req, res) => {
  const { tokenId } = req.body;
   client.verifyIdToken({idToken: tokenId, audience:'689080969961-k4i4ccctckdvf369ln044ar325rfd1km.apps.googleusercontent.com'}).then(response => {
     const {email_verified, name, email} = response.payload
     if(email_verified){ 
      const userName = response.payload.email;
      const user = { name: userName }
      User.findOne({
        where: {
          email: response.payload.email
        }
    }).then((usera) => {
      if(!usera){
      User.create({
        name: response.payload.given_name,
        lastname: response.payload.family_name,
        email: response.payload.email,
        password: response.payload.at_hash,
        role: "User",
        salt: 0,
        state: "alta"
      }).then((usercin) => {
          const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
          res.json({ accessToken: accessToken })
      })
      }else{
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
        res.json({ accessToken: accessToken })
        }
      })
    }
    })
  console.log()
})

module.exports = server;

