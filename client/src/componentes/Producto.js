import React from 'react';

import ProductCard from './productCard.jsx';

// componente presentacional de producto
export default function Productos(props){ 
  return(
    <div>
      { productosTest.length === 0 ? <div><span>No hay productos</span></div> : productosTest.map( productos => { return <ProductCard props={productos} />}) }
    </div>
       
  )
}
    






