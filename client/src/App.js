import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, } from 'react-router-dom'
import Catalogo from './componentes/catalogo'
import Producto from './componentes/Producto'
import Navbar from './componentes/navbar'
import Carousel from './componentes/Carusel'
import AddProduct from './componentes/admAgregarProductos';
import AddCategory from './componentes/admAgregarCat';
import Editordelete from './componentes/admEditarOEliminarProd';
import Categoria from './componentes/Categoria';
import Admin from './componentes/Admin'
import CartasHome from './componentes/cartasdehome';
import SingIn from './componentes/SingIn';

function App() {


  return (

    <Router>
      <div>

        <Route 
        path='/'
        render = {()=> <Navbar 

        />}        
      /> 
        <Route 
        exact path='/'
        render={()=><Carousel
        
        />}
        />

        <Route 
        exact path='/'
        render={()=><CartasHome 
            
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
            
          />
          }
        />

        <Route
          exact path='/admin/addcategory'
          render={() => <AddCategory
            
          />
          }
        />

        <Route
          exact path='/admin/editordelete/:id'
          render={() => <Editordelete
            
          />
          }
        />

        <Route
          exact path='/admin/editordelete/cat/:id'
          render={() => <Categoria
          />
          }
        />

        <Route
          exact path='/admin'
          render={() => <Admin
          />
          }
        />

        <Route
        exact path='/user/singin'
        render={()=> <SingIn
        />
        }

        exact path='/admin/products'
        render={()=> <Catalogo 
          
        />}
        />
        
      </div>
    </Router>
  );
}

export default App;
