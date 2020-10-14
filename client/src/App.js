import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
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
import axios from 'axios'

function App() {
  
  const [dataP, setDataP] = useState([]);
  const [dataC, setDataC] = useState([]);
  const [dataSC, setDataSC] = useState([])
  const [dataR, setDataR] = useState([]);
  const [dataS, setDataS] = useState([]);

  const getProduct = (props) => {
    setDataS(props);
  }
  const getCategories = async(props) => {
    const res = await axios.get(`http://localhost:3001${props}`)
    .then(res => {
      setDataSC(res.data)
    })
  }

  const url = document.location.href.slice(21, document.location.href.length)

  const getStates = (data) => {
    setDataR(data);
  }
  
  const setCatalog = (products) => {
    setDataP(products)
  }

  useEffect(() => {
    async function makeRequests() {
      if (document.location.href.includes('http://localhost:3000/products/categoria')) {
        let [u3] = await Promise.all([
          axios.get(`http://localhost:3001${url}`),
        ]);
        setDataSC(u3.data)
      }

      let [u1, u2,] = await Promise.all([
        axios.get('http://localhost:3001/products/'),
        axios.get('http://localhost:3001/products/category'),
      ]);

      setDataP(u1.data);
      if (Array.isArray(u2.data)) {
        setDataC(u2.data)
      }
    }
    
    makeRequests();
  }, []);

  return (

    <Router>
      <div>

        <Route 
        path='/'
        render = {()=> <Navbar 
        categories={dataC}
        getState={getStates}
        categoryCb={getCategories}
        />}        
      /> 
        <Route 
        exact path='/'
        render={()=><Carousel
        categoryCb={getCategories}
        />}
        />

        <Route 
        exact path='/'
        render={()=><CartasHome productos={Object.values(dataSC)}
            product={getProduct}
            callback={setCatalog}
            categoryCb={getCategories}
            />}
        />

        <Route
          exact path={`/products/categoria/:nombreCat`}
          render={() => <Catalogo productos={Object.values(dataSC)}
            product={getProduct}
            callback={setCatalog}
          />}
        />

        <Route
          exact path='/products'
          render={() => <Catalogo
            productos={dataP}
            product={getProduct}
            callback={setCatalog}
          />}
        />


        <Route
          exact path='/products/search'
          render={() => <Catalogo
            productos={Object.values(dataR)}
            product={getProduct}
            callback={setCatalog}
            
          />}
        />

        <Route
          exact path='/products/prod/:id'
          render={() => <Producto
            producto={dataS}
          />}
        />

        <Route
          exact path='/admin/addproduct'
          render={() => <AddProduct
            categories={dataC}
            callback={setCatalog}
          />
          }
        />

        <Route
          exact path='/admin/addcategory'
          render={() => <AddCategory
            categories={dataC}
          />
          }
        />

        <Route
          exact path='/admin/editordelete/:id'
          render={() => <Editordelete
            producto={dataS}
            categorias={dataC}
            callback={setCatalog}
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
        />
        
      </div>
    </Router>
  );
}

export default App;
