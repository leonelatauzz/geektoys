import React from 'react';

import ProductCard from './productCard.jsx';

// componente presentacional de producto
export default function Productos(props){ 
  return(
    <div>
    <h1>PRESENTANDO</h1>
    <h2>{props.titulo}</h2>
    <img src={props.imagen}/>
    <h3>{props.precio}</h3>
    <div>{props.descripcion}</div>

  let productosTest = [{name: "hola", title:"soy titulo", price:"200", stock:"20"}, {name: "soso", title:"titulotitulo", price:"120", stock:"15"}]
   return(
     <div>
     { productosTest.length === 0 ? <div>No hay productos</div> : productosTest.map( productos => { return <ProductCard props={productos} />}) }

</div>
       
  )
}
    






