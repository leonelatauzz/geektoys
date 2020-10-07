import React from 'react';
import logo from './logo.svg';
import './App.css';
import Productos from './componentes/productos.js';
import ProductCard from './componentes/productCard.jsx';
import AgregarP from './componentes/admAgregarProductos'


function App() {
  return (
    <div>
      <Productos titulo={"lavadora"} descripcion={"lavadora dreams capacidad 50kg"}/>
     <AgregarP />
    </div>
  );
}

export default App;
