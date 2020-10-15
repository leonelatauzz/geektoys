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


  module.exports = server;