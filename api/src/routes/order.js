const server = require('express').Router();
const { Order, User, Product } = require('../db.js')


server.get('/', (req, res) => {
  Order.findAll()
    .then(orders => {
      res.send(orders);
    })
});

server.get("/search", (req, res) => {
  Order.findAll().then(orders => {
    const result = orders.filter(order => (order.state.includes(req.query)))
    if (result.length === 0) {
      res.status(404).send("No se encontro la orden")
    } else {
      let obj = Object.assign({}, result);
      res.status(200).json(obj)
    };
  });
});

server.get('/:id', (req, res) => {
  Order.findByPk(req.params.id)
    .then(orden => {
      if (!orden) {
        res.status(404).send('Orden no encontrada')
      } else {
        res.json(orden)
      };
    });
});

server.put('/:orderId', (req, res) => {
  const { state } = req.body;
  Order.findByPk(req.params.orderId).then((order) => {
    if (!order) {
      res.status(404).send('Orden no encontrada');
    } else {
      order.state = state;
      order.save();
      res.status(201).send("La orden se modifico correctamente");
    };
  });
});

server.put('/:orderId/payment', (req, res) => {
  Order.findByPk(req.params.orderId).then((order) => {
    if (!order) {
      res.status(404).send('Orden no encontrada');
    } else {
      if (req.body.adressId) {
        order.deliveryMethod = req.body.deliveryMethod;
        order.state = req.body.state;
        order.adressId = req.body.adressId
        order.save();
      } else {
        order.deliveryMethod = req.body.deliveryMethod;
        order.state = req.body.state;
        order.save();
      }
      res.status(201).send("La orden se modifico correctamente");
    };
  });
});


server.post('/:userId', (req, res) => {
  Order.create({
    state: 'carrito',
    userId: req.params.userId
  }
  ).then((order) => {
    if (!order) {
      res.status(404).json({ error: 'No se puede crear la orden' })
      return;
    }
    User.findOne({
      where: {
        id: req.params.userId
      }, include: Order
    }).then(user => {
      if (!user) {
        res.status(404).json({ error: 'Usuario no registrado' })
        return;
      }
      res.json(user)
    })
  })
})

server.get('/cart/:orderId', (req, res) => {
  Order.findOne({
    where: {
      id: req.params.orderId
    },
    include: Product
  })
    .then((order) => {
      if (!order) {
        res.status(400).send('La orden no fue encontrada')
      }
      let resolve = order.dataValues.products;
      let obj = Object.assign({}, resolve)
      res.json(obj);
    })
})


module.exports = server;