const server = require('express').Router();
const { Review } = require('../db.js');

server.get('/review', (req, res, next) => {  //// Get de Prueba, NO BORRAR!!!!
    Review.findAll()
      .then(calif => {
        res.send(calif);
      })
      .catch(next);
  });
  
  server.post("/:id/review", (req, res) => {
      Review.create({
          rating: req.body.rating,
          description: req.body.description,
        }).then(function () {
          res.status(201).send('Review creada correctamente');
        })
      .catch((error) => res.status(204).send(error));
  });

  module.exports = server;