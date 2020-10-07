import React from 'react';
import logo from './logo.svg';
import './App.css';
import Productos from './componentes/productos.js';
import ProductCard from './componentes/productCard.jsx';
import AgregarP from './componentes/admAgregarProductos'

function App() {
  return (
    <div>
     <ProductCard />   
     <AgregarP />
    </div>
  );
}

export default App;
