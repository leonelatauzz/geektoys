import React, { useEffect, useState } from 'react';
import './App.css';
import {BrowserRouter as  Router, Route} from 'react-router-dom'
import Catalogo from './componentes/catalogo'
import Producto from './componentes/Producto'
import Navbar from './componentes/navbar'

import axios from 'axios'

 function App(){
   const [dataP, setDataP] = useState([]);
   const [dataC, setDataC] = useState([]);
   const [dataSC, setDataSC] = useState([])
   const [dataR, setDataR] = useState([])

   // debutando en axios xdxd 
  const url = document.location.href.slice(21, document.location.href.length)
  const getStates = (data) => {
    console.log('holaaaaaaaaa')
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
        exact path={`/products/categoria/:nombreCat`}
        render = {()=> <Catalogo productos={Object.values(dataSC)}/>}        
      /> 

        <Route 
        exact path = '/products'
        render = {()=> <Catalogo 
        productos={dataP}
        />}
        
        />
      {/* <Route
      path ='/products/:id'
      render = {()=> <Producto 
        name={objeto.name}
        description={objeto.description}
        picture={objeto.picture}
        price={300}
      />}
      /> */}
      </div>
    </Router>
  );
}

export default App;
