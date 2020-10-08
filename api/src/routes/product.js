const server = require('express').Router();
const { Product } = require('../db.js');
const {Categorias} = require('../db.js')

server.get('/', (req, res, next) => {
	Product.findAll()
		.then(products => {
			res.send(products);
		})
		.catch(next);
});

server.post('/category', (req, res) => {
  Categorias.create({
    name: req.body.name
  }).then(function() {
    res.status(201).send('Categoría creada correctamente');
  })
})



server.post('/:idProducto/category/:idCategoria', (req, res) => {
	Product.findByPk(req.params.idProducto)
    .then((prod) => {
      if (!prod) {
        res.status(404).json({error: 'Producto no encontrado'})
        return;
      }
      return Categorias.findByPk(req.params.idCategoria).then((cat) => {
        if (!cat) {
			res.status(404).json({error: 'Categoria no encontrada'})
			return;
        }

        Product.addCategoria(cat);
		res.send(`>> Se agrego la categoría id=${req.params.idCategoria} al Producto id=${req.params.idProducto}`);
        return ;
      });
    })
    .catch((err) => {
      res.status(404).send(err);
    });
})

server.delete('/:idProducto/category/:idCategoria', (req, res) => {
	Product.findByPk(req.params.idProducto)
    .then((prod) => {
      if (!prod) {
        res.status(404).json({error: 'Producto no encontrado'})
        return;
      }
      return Categorias.findByPk(req.params.idCategoria).then((cat) => {
        if (!cat) {
			res.status(404).json({error: 'Categoria no encontrada'})
			return;
        }

        Product.removeCategoria(cat);
		res.send(`>> Se eliminó la categoría id=${req.params.idCategoria} del Producto id=${req.params.idProducto}`);
        return ;
      });
    })
    .catch((err) => {
      res.status(404).send(err);
    });
}) 

module.exports = server;
