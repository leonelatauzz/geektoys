import React from 'react';
import logo from './logo.svg';
import './App.css';
import Productos from './componentes/productos.js';
import Categorias from './componentes/catalogos'

function App() {
  return (
    <div>
      <Productos />
      <Categorias />
    </div>
  );
}

export default App;
