import React from 'react';
import './App.css';
import {BrowserRouter as  Router, Route} from 'react-router-dom'
import Catalogo from './componentes/catalogo'
import pikachu from './componentes/imagen/pikachu.png'
import Producto from './componentes/Producto'

// esto es para probar la funcionalidad de catalogo routes

let array = [{id:1,titulo:"pikachu",descripcion:"muñeco pikachu bonito",imagen:pikachu}]
let objeto = {id:1,titulo:"pikachu",descripcion:"muñeco pikachu bonito",imagen:pikachu}

function App() {
  return (
    <Router>
      <div>
      <Route 
        exact path='/products'
        render ={()=> <Catalogo productos={array}/> }
      />

      <Route
      path ='/products/:id'
      render = {()=> <Producto 
        titulo={objeto.titulo}
        descripcion={objeto.descripcion}
        imagen={objeto.imagen}
        precio={300}
      />}
      />
      </div>
    </Router>
  );
}

export default App;
