import React from 'react';

import ProductCard from './productCard.jsx';

// componente presentacional de producto
export default function Productos(props){ 
  return(
    <div>
    <h1>PRESENTANDO</h1>
    <h2>{props.name}</h2>
    <img src={props.picture}/>
    <h3>{props.price}</h3>
    <div>{props.description}</div> 
    </div>
       
  )
}
    






