import React from 'react';

  
export default function Productos(props){ 
  return(
    <div>
      <h2>{props.titulo}</h2>
      <img>{props.imagen}</img>
      <h3>{props.precio}</h3>
      <div>{props.descripcion}</div>
    </div>
   )
}
