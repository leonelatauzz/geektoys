import React from 'react';

// import ProductCard from './productCard.jsx';

// componente presentacional de producto
export default function Productos(props){ 
  return(
    <div>
     <h3>{props.titulo}</h3>
     <img>{props.imagen}</img>
     <h4>{props.precio}</h4>
     <h5>{props.descripcion}</h5>
    </div>
       
  )
}
    
//NO BORRAR NI SILENCIAR, CUALQUIER COSA PREGUNTAR A LEONELA (si rompe, agregar el tag PRODUCTOS al finalizar el div de PRODUCT CARD como lo tenia antes y EXPORTARLO)






