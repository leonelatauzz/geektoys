const server = require('express').Router();
const { Product } = require('../db.js');
const {Category} = require('../db.js')
const multer = require('multer');
const { json } = require('express');
const upload = multer({ dest: `${__dirname}/uploads`});
const fs = require('fs')

server.get('/', (req, res, next) => {
	Product.findAll()
		.then(products => {
			res.send(products);
		})
    .catch(next);
    
});

server.get('/category/cat/:id', (req, res) => {
  Category.findByPk(req.params.id)
  .then(cat => {
    if(!cat) {
      res.status(404).send('Categoría no encontrada')
    } else {
      res.json(cat)
    }
  })
})

server.get('/category', (req, res, next) => {  //// Get de Prueba, NO BORRAR!!!!
	Category.findAll()
		.then(products => {
			res.send(products);
		})
		.catch(next);
});

server.get("/search", (req, res)=>{
  Product.findAll().then(products =>{
    const result = products.filter(producto => (producto.name.includes(req.query.query)) || (producto.description.includes(req.query.query)))
    if(result.length === 0){
      res.status(404).send("No se encontro el producto")
    } else {
      let obj = Object.assign({}, result);
      res.status(200).json(obj)
    }
  })
})
server.post('/category', (req, res) => {
  Category.create({
    name: req.body.name,
    description: req.body.description

  }).then(function() {
    res.status(201).send('Categoría creada correctamente');
  })
})

server.post('/',upload.single('images'), (req,res)=>{
  fs.renameSync(req.file.path, req.file.path + '.' + req.file.mimetype.split('/')[1])
  let pic = req.file.filename + '.' + req.file.mimetype.split('/')[1];
 let product = JSON.parse(req.body.json)
  Product.create({
    name: product.name,
    description: product.description,
    price: product.price,
    stock: product.stock,
    picture: pic
  }).then((pro) => {
    if(!pro){
      res.status(404).json({error: 'Completa los campos requeridos'})
      return;
    }
    return res.status(201).json(pro.id)
  })
 
})

server.post('/:idProducto/category/:idCategoria', (req, res) => {
	Product.findByPk(req.params.idProducto)
    .then((prod) => {
      if (!prod) {
        res.status(404).json({error: 'Producto no encontrado'})
        return;
      }
      Category.findByPk(req.params.idCategoria).then((cat) => {
        if (!cat) {
          res.status(404).json({error: 'Categoria no encontrada'})
          return;
        }
        
        cat.addProduct(prod);
		    res.send(`>> Se agrego la categoría id=${req.params.idCategoria} al Producto id=${req.params.idProducto}`);
        return ;
      });
    })
})

// FILTRANDO X CATEGORIAS

server.get('/categoria/:nombreCat', (req, res)=>{
  Category.findOne({
    where: {
      name: req.params.nombreCat
    },
    include: Product
  })
  .then((cat) => {
    if(!cat){
      res.status(400).send('La categoria no fue encontrada')
    }
   let resolve = cat.dataValues.products;
   let obj = Object.assign({}, resolve)
   res.json(obj);
  }) 
})

server.put("/category/:id", (req,res)=>{
  const {name, description}=req.body;
  Category.findByPk(req.params.id).then((categoria)=>{
    categoria.name = name;
    categoria.description = description;
    categoria.save();
    res.status(201).send("La categoria se modifico correctamente")
  })
})

server.put("/:id", upload.single('images'), (req,res)=>{
  fs.renameSync(req.file.path, req.file.path + '.' + req.file.mimetype.split('/')[1])
  let pic = req.file.filename + '.' + req.file.mimetype.split('/')[1];
  let product = JSON.parse(req.body.json)
  const {name, description, price, stock,}=product;
  Product.findByPk(req.params.id).then((producto)=>{
    producto.name = name;
    producto.description = description;
    producto.price = price;
    producto.stock = stock;
    producto.picture = pic
    producto.save();
    res.status(201).send("El producto se modifico correctamente")
  })
})

server.delete('/:idProducto/category/:idCategoria', (req, res) => {
	Product.findByPk(req.params.idProducto)
    .then((prod) => {
      if (!prod) {
        res.status(404).json({error: 'Producto no encontrado'})
        return;
      }
      Category.findByPk(req.params.idCategoria).then((cat) => {
        if (!cat) {
          res.status(404).json({error: 'Categoria no encontrada'})
          return;
        }
        
        cat.removeProduct(prod);
		    res.send(`>> Se eliminó la categoría id=${req.params.idCategoria} al Producto id=${req.params.idProducto}`);
        return ;
      });
    })
})

server.delete("/category/:id", (req,res)=>{           //Verificar Id, para que se resetee
  Category.findByPk(req.params.id).then((categoria)=>{
    categoria.destroy();
    res.status(201).send("La categoria se elimino correctamente")
    return;
  })
})

server.delete("/:id", (req,res)=>{           //Verificar Id, para que se resetee
  Product.findByPk(req.params.id).then((producto)=>{
    producto.destroy();
    res.status(200).send("El producto se elimino correctamente")
    return;
  })
})

module.exports = server;
