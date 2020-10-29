const server = require('express').Router();
const { Product, Category, User, Review } = require('../db.js');
const multer = require('multer');
const { json } = require('express');
const upload = multer({ dest: `${__dirname}/uploads` });
const fs = require('fs')
server.delete("/:id/review/:idReview", (req, res) => {          
    Review.findByPk(req.params.id).then((review) => {
          if(!review){
            res.status(404).send("La review no fue encontrada")
          }else{
          review.destroy();
          res.status(200).send("La Review se elimino correctamente")
          }
        })
      })
  server.get('/', (req, res, next) => {  //// Get de Prueba, NO BORRAR!!!!
    Review.findAll()
      .then(calif => {
        res.send(calif);
      })
      .catch(next);
  });
  server.get('/reviews/:productid', (req, res) => {
    Product.findOne({
      where: {
        id: req.params.productid
      },
      include: Review
    })
      .then((prod) => {
        if (!prod) {
          res.status(400).send('El producto no fue encontrado')
        }
        let resolve = prod.dataValues.reviews;
        let obj = Object.assign({}, resolve)
        res.json(obj);
      })
  })
  server.post("/:id/review", (req, res) => {
    Product.findByPk(req.params.id)
    .then((producto) =>{
      if(!producto){
        res.status(404).send("El producto no fue encontrado")
      }else{
        Review.create({
          rating: req.body.rating,
          description: req.body.description,
          productId:producto.id,
          userId: req.body.userId
        }).then(function (review) {
          res.status(201).json(review);
        })
      .catch((error) => res.status(204).send(error));
      }
  
    })
   
  });
  server.put('/:id/review/:idReview', (req ,res) => {     
            Review.findByPk(req.params.idReview)
            .then(review=>{
              if(!review){
                res.status(404).send("La review no existe")
              }else{
                review.description =req.body.description,
                review.rating = req.body.rating,
                review.save()
                res.status(201).json(review)
              }
            })
          })  
  
   
  module.exports = server;