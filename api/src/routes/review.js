const server = require('express').Router();
const { Review, Product } = require('../db.js');

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
      Review.create({
          rating: req.body.rating,
          description: req.body.description,
          productId:req.body.productId,
          userId: req.body.userId
        }).then(function (review) {
          res.status(201).json(review);
        })
      .catch((error) => res.status(204).send(error));
  });

  server.delete("/:id/review/:idReview", (req, res) => {          
    Product.findByPk(req.params.id).then(() => {
         Review.findByPk(req.params.idReview).then((review) => {
          review.destroy();
          res.status(200).send("La Review se elimino correctamente")
          return;
         })
 
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