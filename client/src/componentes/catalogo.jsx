import React from 'react';
import ProductCard from './productCard.jsx'

// llega un array en props, se recorre y se renderiza en cada card
export default function Catalogo(props) {

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

    return (

        <div class="tarjeta" >
            {props.productos.map((p) => <ProductCard
                key={p.id}
                id={p.id}
                name={titleCase(p.name)}
                description={capitalizeFirstLetter(p.description)}
                picture={p.picture}
                price={p.price}
                stock={p.stock}
                product={props.product}
                callback={props.callback}
            />

            )}
        </div>

    )
}
