import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import Catalogo from './componentes/catalogo'
import Producto from './componentes/Producto'
import Review from './componentes/Review'
import OrderUser from './componentes/OrderUser';
import AddProduct from './componentes/admAgregarProductos';
import AddCategory from './componentes/admAgregarCat';
import Editordelete from './componentes/admEditarOEliminarProd';
import Categoria from './componentes/Categoria';
import Admin from './componentes/Admin'
import SingIn from './componentes/SingIn';
import AdminProducto from './componentes/AdminProducto.js';
import AdminCatalogo from './componentes/AdminCatalogo.jsx';
import NotFound from './componentes/NotFound'
import Home from './componentes/Home'
import Carrito from './componentes/Carrito.js';
import Login from './componentes/Login';
import ResetPass from './componentes/ResetPass'
import TablaOrder from './componentes/tablaOrden.js';
import CarritoGuest from './componentes/CarritoGuest'
import Order from './componentes/Order.jsx'
import DetalleOrder from './componentes/DetalleOrder';
import Colaboradores from './componentes/colaboradores';
import ResumenCompra from './componentes/ResumenCompra';
import AgregarDireccion from './componentes/AgregarDireccion';
import EditarDireccion from './componentes/EditarDireccion';
import AprovedPurchase from './componentes/AprovedPurchase'
import SeguridadUser from './componentes/SeguridadUser'
import StarRating from './componentes/rating.js'
import AdminDetalleOrder from './componentes/AdminDetalleOrder'
import UseraAdmin from './componentes/useraAdmin';
import SuperSimpleNavbarAd from './componentes/SuperSimpleNavbarAdmin';
import ProductReviews from './componentes/ProductReviews';
import Favorites from './componentes/favorite'
import PutReview from './componentes/modificarReview'

function App() {

// const guardado = window.localStorage

  const user = useSelector(state=> state.userId.role)
  const login = useSelector(state=> state.loggedIn)

  const protection = (component) => {
   return !login ? <Redirect to='/user/login'/> : user !== 'Admin' ? <Redirect to='/' /> : component
  }


// guardado.setItem("hola", "chau")
//   console.log(hola)

  return (
    <Router>
      <Route
        exact path='/'
        render={() => <Home

        />}
      />

      <Route
        exact path='/products/search/notFound'
        render={() => <NotFound
        />}
      />

      <Route
        exact path={`/products/categoria/:nombreCat`}
        render={() => <Catalogo
        />}
      />

      <Route
        exact path='/products'
        render={() => <Catalogo
        />}
      />

      <Route
        exact path='/products/search'
        render={() => <Catalogo
        />}
      />

      <Route
        exact path='/products/prod/:id'
        render={() => <Producto
        />}
      />

      <Route
        exact path='/admin/addproduct'
        render={() => protection(<AddProduct/>)}
      />

      <Route
        exact path='/admin/addcategory'
        render={() => protection(<AddCategory/>)}
      />

      <Route
        exact path='/admin/editordelete/:id'
        render={() => protection(<Editordelete/>)}
      />

      <Route
        exact path='/admin/editordelete/cat/:id'
        render={() => protection(<Categoria/>)}
      />

      <Route
        exact path='/admin'
        render={() => protection(<Admin/>)}
      />

      <Route
        exact path='/user/singin'
        render={() => <SingIn
        />}
      />

      <Route
        exact path='/user/:id/passwordReset'
        render={() => <ResetPass
        />}
      />

      <Route
        exact path='/products/prod/admin/:id'
        render={() => protection(<AdminProducto/>)}
      />

      <Route
        exact path='/admin/products'
        render={() => protection(<SuperSimpleNavbarAd/>)}
      />

      <Route
        exact path='/admin/products'
        render={() => protection(<AdminCatalogo/>)}
      />

      <Route
        exact path='/guest/carrito'
        render={() => <CarritoGuest
        />}
      />

      <Route
        exat path='/user/login'
        render={() => <Login
        />}
      />

      <Route
        exact path='/admin/orderlist'
        render={() => protection(<TablaOrder/>)}
      />

      <Route
        exact path='/user/:id/carrito'
        render={() => <Carrito
        />}
      />

      <Route
        exact path='/user/:id/order'
        render={() => <Order
        />}
      />

      <Route
        exact path='/user/:idUser/selectedOrder/:idOrder'
        render={() => <DetalleOrder
        />}
      />
      <Route
        exact path='/user/:id/order/:nombre/orderUser'
        render={() => <OrderUser
        />}
      />

      <Route
        exact path='/checkout/:idOrden/:idUsuario'
        render={() => <ResumenCompra
        />}
      />

      <Route
        exact path='/checkout/:idOrden/:idUsuario/newAdress'
        render={() => <AgregarDireccion
        />}
      />

      <Route
        exact path='/checkout/:idOrden/:idUsuario/editAdress'
        render={() => <EditarDireccion
        />}
      />

      <Route
        exact path='/aproved/:idOrden/:idUsuario'
        render={() => <AprovedPurchase
        />}
      />

      <Route
        exact path='/colaboradores'
        render={() => <Colaboradores
        />}
      />
      <Route
        exact path='/user/:id/order/:nombre/segurity'
        render={() => <SeguridadUser
        />}
      />


      <Route
        exact path='/review'
        render={() => <Review
        />}
      />

      <Route
        exact path='/admin/selectedOrder/:idOrden'
        render={() => protection(<AdminDetalleOrder/>)}

      />


      <Route
        exact path='/admin/promote'
        render={() => protection(<UseraAdmin
        />)}
      />

      <Route
        exact path='/products/prod/:id'
        render={() => <ProductReviews
        />}
      />

      <Route
        exact path='/favorites/:idUser'
        render={() => <Favorites
        />}
      />

      <Route
        exact path='/products/prod/:id/review/:idReview'
        render={() => <PutReview
        />}
      />

    </Router>


  );
}

export default App;