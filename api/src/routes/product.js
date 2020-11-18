const server = require('express').Router();
const { Product, Category, User, Review } = require('../db.js');
const multer = require('multer');
const { json } = require('express');
const upload = multer({ dest: `${__dirname}/uploads` });
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
      if (!cat) {
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

server.get("/search", (req, res) => {
  Product.findAll().then(products => {
    const result = products.filter(producto => (producto.name.includes(req.query.query)) || (producto.description.includes(req.query.query)))
      let obj = Object.assign({}, result);
      res.status(200).json(obj)
    
  })
})

server.post('/category', (req, res) => {
  Category.create({
    name: req.body.name.toLowerCase(),
    description: req.body.description.toLowerCase()
  }).then(function () {
    res.status(201).send('Categoría creada correctamente');
  })
})

server.post('/', upload.single('images'), (req, res) => {
  fs.renameSync(req.file.path, req.file.path + '.' + req.file.mimetype.split('/')[1])
  let pic = req.file.filename + '.' + req.file.mimetype.split('/')[1];
  let product = JSON.parse(req.body.json); 
  Product.create({
    name: product.name.toLowerCase(),
    description: product.description.toLowerCase(),
    price: product.price,
    stock: product.stock,
    picture: pic
  }).then((pro) => {
    if (!pro) {
      res.status(404).json({ error: 'Completa los campos requeridos' })
      return;
    }
    return res.status(201).json(pro.id)
  })
})

server.post('/:idProducto/category/:idCategoria', (req, res) => {
  Product.findByPk(req.params.idProducto)
    .then((prod) => {
      if (!prod) {
        res.status(404).json({ error: 'Producto no encontrado' })
        return;
      } 
      Category.findByPk(req.params.idCategoria).then((cat) => {
        if (!cat) {
          res.status(404).json({ error: 'Categoria no encontrada' })
          return;
        }
        cat.addProduct(prod);
        res.json(cat)
        return;
      });
    })
})

server.get('/categoria/:nombreCat', (req, res) => {
  Category.findOne({
    where: {
      name: req.params.nombreCat
    },
    include: Product
  })
    .then((cat) => {
      if (!cat) {
        res.status(400).send('La categoria no fue encontrada')
      }
      let resolve = cat.dataValues.products;
      let obj = Object.assign({}, resolve)
      res.json(obj);
    }).catch((err)=>{
      res.send(err);
    })
})

server.get('/categoria/prod/:id', (req, res) => {
  Product.findOne({
    where: {
      id: req.params.id
    },
    include: Category
  })
    .then((prod) => {
      if (!prod) {
        res.status(400).send('El producto no fue encontrado')
      }
      let resolve = prod.dataValues.categories;
      let obj = Object.assign({}, resolve)
      res.json(obj);
    })
})

server.put("/category/:id", (req, res) => {
  const { name, description } = req.body;
  Category.findByPk(req.params.id).then((categoria) => {
    categoria.name = name.toLowerCase();
    categoria.description = description.toLowerCase();
    categoria.save();
    res.status(201).send("La categoria se modifico correctamente")
  })
})

server.put("/:id", upload.single('images'), (req, res) => {
  let pic;
  let product;
  if (req.file) {
    fs.renameSync(req.file.path, req.file.path + '.' + req.file.mimetype.split('/')[1])
    pic = req.file.filename + '.' + req.file.mimetype.split('/')[1];
    product = JSON.parse(req.body.json)
  } else if (!req.file) {
    product = JSON.parse(req.body.json)
    pic = product.picture
  }

  const { name, description, price, stock, } = product;
  Product.findByPk(req.params.id).then((producto) => {
    producto.name = name.toLowerCase();
    producto.description = description.toLowerCase();
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
        res.status(404).json({ error: 'Producto no encontrado' })
        return;
      }
      Category.findByPk(req.params.idCategoria).then((cat) => {
        if (!cat) {
          res.status(404).json({ error: 'Categoria no encontrada' })
          return;
        }
        cat.removeProduct(prod);
        res.send(`>> Se eliminó la categoría id=${req.params.idCategoria} al Producto id=${req.params.idProducto}`);
        return;
      });
    })
})

server.delete("/category/:id", (req, res) => {          
  Category.findByPk(req.params.id).then((categoria) => {
    categoria.destroy();
    res.status(201).send("La categoria se elimino correctamente")
    return;
  })
})

server.delete("/:id", (req, res) => {          
  Product.findByPk(req.params.id).then((producto) => {
    producto.destroy();
    res.status(200).send("El producto se elimino correctamente")
    return;
  })
})

server.post('/:idProducto/favorites/:idUsuario', (req, res) => {
  Product.findByPk(req.params.idProducto)
    .then((prod) => {
      if (!prod) {
        res.status(404).json({ error: 'Producto no encontrado' })
        return;
      } 
      User.findByPk(req.params.idUsuario).then((user) => {
        if (!user) {
          res.status(404).json({ error: 'Usuario no encontrado' })
          return;
        }
        user.addProduct(prod);
        res.send('Producto agregado correctamente')
        return;
      });
    })
})

server.get('/favorites/:idUsuario', (req, res) => {
  User.findOne({
    where: {
      id: req.params.idUsuario
    },
    include: Product
  })
    .then((user) => {
      if (!user) {
        res.status(400).send('Usuario no encontrado')
      }
      let resolve = user.dataValues.products;
      let obj = Object.assign({}, resolve)
      res.json(obj);
    })
})

server.delete('/:idProducto/favorites/:idUsuario', (req, res) => {
  Product.findByPk(req.params.idProducto)
    .then((prod) => {
      if (!prod) {
        res.status(404).json({ error: 'Producto no encontrado' })
        return;
      }
      User.findByPk(req.params.idUsuario).then((user) => {
        if (!user) {
          res.status(404).json({ error: 'Usuario no encontrado' })
          return;
        }
        user.removeProduct(prod);
        res.send(`>> Se eliminó el usuario id=${req.params.idUsuario} al Producto id=${req.params.idProducto}`);
        return;
      });
    })
})
      
////// reviews //////

server.delete("/:id/review/:idReview", (req, res) => {          
  Review.findByPk(req.params.idReview).then((review) => {
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
    include: Review,
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
server.get('/:id/review/:idReview', (req,res)=>{
  Review.findByPk(req.params.idReview)
  .then(rev=>{
    if(!rev){
      res.status(404).send("La review no fue encontrada")
    }else{
      res.status(200).json(rev)
    }
  })
})
server.post("/:id/review", (req, res) => {
  Product.findByPk(req.params.id)
  .then((producto) =>{
    if(!producto){
      res.status(404).send("El producto no fue encontrado")
    }else{
      User.findByPk(req.body.userId)
      .then(usuario=>{
        Review.create({
          rating: req.body.rating,
          description: req.body.description,
          productId:producto.id,
          name: `${usuario.dataValues.name} ${usuario.dataValues.lastname}`,
          userId: req.body.userId
        }).then(function (review) {
          res.status(201).json(review);
        })
      })
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
