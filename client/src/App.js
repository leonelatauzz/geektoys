import React, { useEffect, useState } from 'react';
import './App.css';
import {BrowserRouter as  Router, Route} from 'react-router-dom'
import Catalogo from './componentes/catalogo'
import Producto from './componentes/Producto'

import axios from 'axios'

 function App(){
   const [data, setData] = useState([])

   // debutando en axios xdxd 

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(
        'http://localhost:3001/products/',
      );
      setData(result.data);
    };
    fetchData();
  }, []);

  return (
    <Router>
      <div>
        <Route 
        exact path='/products'
        render ={()=> <Catalogo
        productos={data}
        />}
      /> 

      <Route
      path ='/products/:id'
      render = {()=> <Producto 
        name={objeto.name}
        description={objeto.description}
        picture={objeto.picture}
        price={300}
      />}
      />
      </div>
    </Router>
  );
}

export default App;
