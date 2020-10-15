const server = require('express').Router();
const { Order } = require('../db.js')


server.get('/', (req, res) => {
    Order.findAll()
      .then(orders => {
        res.send(orders);
      })

  });

  server.get("/search", (req, res) => {
    Order.findAll().then(orders => {
      const result = orders.filter(order => (order.name.includes(req.query)))
      if (result.length === 0) {
        res.status(404).send("No se encontro la orden")
      } else {
        let obj = Object.assign({}, result);
        res.status(200).json(obj)
      }
    })
  })



  server.get('/:id', (req, res) => {
    Order.findByPk(req.params.id)
      .then(orden => {
        if (!orden) {
          res.status(404).send('Orden no encontrada')
        } else {
          res.json(orden)
        }
      })
  })
// Falta por probar :D!
  server.put('/:id', (req,res) => {
    const { state } = req.body;
    Order.findByPk(req.params.id).then((order) => {
      if (!orden) {
        res.status(404).send('Orden no encontrada');
      } else {
        order.status = state;
        order.save();
        res.status(201).send("La orden se modifico correctamente");
      };
    });
  });


  ///orders/:id


/*   server.put("/category/:id", (req, res) => {
    const { name, description } = req.body;
    Category.findByPk(req.params.id).then((categoria) => {
      categoria.name = name.toLowerCase();
      categoria.description = description.toLowerCase();
      categoria.save();
      res.status(201).send("La categoria se modifico correctamente")
    })
  }) */

  module.exports = server;