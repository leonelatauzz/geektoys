const server = require('express').Router();
const { Product } = require('../db.js');
const {Category} = require('../db.js')

server.get('/', (req, res, next) => {
	Product.findAll()
		.then(products => {
			res.send(products);
		})
		.catch(next);
});
server.get('/category', (req, res, next) => {  //// Get de Prueba, NO BORRAR!!!!
	Category.findAll()
		.then(products => {
			res.send(products);
		})
		.catch(next);
});
server.get("/search", (req, res)=>{
  console.log(req.query.query)
  Product.findAll().then(products =>{
    const result = products.filter(producto => (producto.name.includes(req.query.query)) || (producto.description.includes(req.query.query)))
    if(result.length === 0){
      res.status(404).send("No se encontro el producto")
    }else{
      let obj = Object.assign({}, result);
      res.status(200).json(obj)
      
    }
  })
})
server.post('/category', (req, res) => {
  Category.create({
    name: req.body.name
  }).then(function() {
    res.status(201).send('Categoría creada correctamente');
  })
})

server.post('/', (req,res)=>{
  Product.create({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    stock: req.body.stock
  }).then((pro) => {
    if(!pro){
      res.status(404).json({error: 'Completa los campos requeridos'})
      return;
    }
    return res.status(201).json(pro)
  })
 
})

server.post('/:idProducto/category/:idCategoria', (req, res) => {
	Product.findByPk(req.params.idProducto)
    .then((prod) => {
      if (!prod) {
        res.status(404).json({error: 'Producto no encontrado'})
        return;
      }
      return Category.findByPk(req.params.idCategoria).then((cat) => {
        if (!cat) {
			res.status(404).json({error: 'Categoria no encontrada'})
			return;
        }

        Product.addCategory(cat);
		res.send(`>> Se agrego la categoría id=${req.params.idCategoria} al Producto id=${req.params.idProducto}`);
        return ;
      });
    })
    .catch((err) => {
      res.status(404).send(err);
    });
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
server.put("/:id", (req,res)=>{
  const {name, description, price, stock}=req.body;
  Product.findByPk(req.params.id).then((producto)=>{
    producto.name = name;
    producto.description = description;
    producto.price = price;
    producto.stock = stock;
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
      return Category.findByPk(req.params.idCategoria).then((cat) => {
        if (!cat) {
			res.status(404).json({error: 'Categoria no encontrada'})
			return;
        }

        Product.removeCategory(cat);
		res.send(`>> Se eliminó la categoría id=${req.params.idCategoria} del Producto id=${req.params.idProducto}`);
        return ;
      });
    })
    .catch((err) => {
      res.status(404).send(err);
    });
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
