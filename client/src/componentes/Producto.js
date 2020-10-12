import React from 'react';

export default function Productos(props){
  function titleCase(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
    return splitStr.join(' '); 
 } 

 function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
  
  return(
    <div>
     <h3>{titleCase(props.producto.name)}</h3>
     <img src={`http://localhost:3001/uploads/${props.producto.picture}`} />
     <h4>{props.producto.price}</h4>
     <h5>{capitalizeFirstLetter(props.producto.description)}</h5>
    </div>
       
  )
}
    






