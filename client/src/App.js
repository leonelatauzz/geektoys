import React, { useEffect, useState } from 'react';
import './App.css';
import {BrowserRouter as  Router, Route,} from 'react-router-dom'
import Catalogo from './componentes/catalogo'
import Producto from './componentes/Producto'
import Navbar from './componentes/navbar'
import Carousel from './componentes/Carusel'
import AddProduct from './componentes/admAgregarProductos';
import AddCategory from './componentes/admAgregarCat';
import Editordelete from './componentes/admEditarOEliminarProd';
import Categoria from './componentes/Categoria'

import axios from 'axios'

 function App(){
   const [dataP, setDataP] = useState([]);
   const [dataC, setDataC] = useState([]);
   const [dataSC, setDataSC] = useState([])
   const [dataR, setDataR] = useState([]);
   const [dataS, setDataS] = useState([]);


   // debutando en axios xdxd 

    const getProduct = (props) => {
      setDataS(props);
      console.log(props)

    }

    const url = document.location.href.slice(21, document.location.href.length)
    const getStates = (data) => {
  
      setDataR(data);
    }



  useEffect(() => {
    async function makeRequests() {
      if(document.location.href.includes('http://localhost:3000/products/categoria')) {
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
      if(Array.isArray(u2.data)) {
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
        />}        
      /> 
        <Route 
        exact path='/'
        render={()=><Carousel/>}
        />
        <Route 
        exact path={`/products/categoria/:nombreCat`}
        render = {()=> <Catalogo productos={Object.values(dataSC)}
        product ={getProduct}
        />}        
      /> 

        <Route 
        exact path = '/products'
        render = {()=> <Catalogo 
        productos={dataP}
        product ={getProduct}
        />}


        
        />

        <Route 
        exact path = '/products/search'
        render = {()=> <Catalogo 
        productos={Object.values(dataR)}
        product ={getProduct}
        />}
        
        />
       <Route
      exact path ='/products/prod/:id'
      render = {()=> <Producto 
        producto ={dataS}
      />}
      />

      <Route
        exact path = '/admin/addproduct'
        render = {()=> <AddProduct 
          categories={dataC}
        />
        }
      />

      <Route
      exact path = '/admin/addcategory'
      render = {()=> <AddCategory
      categories= {dataC}
      />
      }
      />

      <Route
      exact path = '/admin/editordelete/:id'
      render = {()=> <Editordelete 
        producto = {dataS}
      /> 
      }
      
      />

      <Route
      exact path = '/admin/editordelete/cat/:id'
      render = {({match})=> <Categoria 
      id = {match.params.id}
      /> 
      }
      
      />
      </div>
    </Router>
  );
}

export default App;
