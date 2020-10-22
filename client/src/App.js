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



function App() {


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
        render={() => <AddProduct
        />}
      />

      <Route
        exact path='/admin/addcategory'
        render={() => <AddCategory
        />}
      />

      <Route
        exact path='/admin/editordelete/:id'
        render={() => <Editordelete
        />}
      />

      <Route
        exact path='/admin/editordelete/cat/:id'
        render={() => <Categoria
        />}
      />

      <Route
        exact path='/admin'
        render={() => <Admin
        />}
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
        render={() => <AdminProducto
        />}
      />

      <Route
        exact path='/admin/products'
        render={() => <AdminCatalogo
        />}
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
        render={() => <TablaOrder
        />}
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
          exact path='/products/prod/:id'
          render={() => <Review
          />}
        />
    </Router>


  );
}

export default App;