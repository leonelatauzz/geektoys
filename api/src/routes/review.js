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

  server.delete("/:id/review", (req, res) => {          
    Product.findByPk(req.params.id).then((producto) => {
          producto.destroy();
          res.status(200).send("La Review se elimino correctamente")
          return;
        })
      })
      server.put('/:id/review/:idReview', (req,res) => {
        const {rating,description} = req.body;
          Product.findByPk(req.params.id)
          .then(product =>{
            if(!product){
              res.status(404).send('Producto no encontrado');
            }else{
              Review.findByPk(req.params.idReview)
              .then(review => {
                if(!review){
                  res.status(404).send('Review no encontrada');
                }else{        
                review.rating = rating;
                review.description = description;
                review.save();
                res.status(201).send('La review fue modificada correctamente');
                }
              })
            }
          })
      })

  module.exports = server;