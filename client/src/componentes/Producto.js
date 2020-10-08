import React from 'react';

import ProductCard from './productCard.jsx';

// componente presentacional de producto
export default function Productos(props){ 
  let productosTest = [{name: "hola", title:"soy titulo", price:"200", stock:"20"}, {name: "soso", title:"titulotitulo", price:"120", stock:"15"}]
   return(
     <div>
     { productosTest.length === 0 ? <div>No hay productos</div> : productosTest.map( productos => { return <ProductCard props={producto} />}) }
   
</div>
       
  )
}
    






