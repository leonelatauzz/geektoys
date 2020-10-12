import React from 'react';

export default function Productos(props){ 
  
  return(
    <div>
     <h3>{props.producto.name}</h3>
     <img src={`http://localhost:3001/uploads/${props.producto.picture}`} />
     <h4>{props.producto.price}</h4>
     <h5>{props.producto.description}</h5>
    </div>
       
  )
}
    






