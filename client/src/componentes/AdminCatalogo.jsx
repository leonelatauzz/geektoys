import React from 'react';
import AdminproductCard from './AdminproductCard.jsx';
import { useDispatch, useSelector } from "react-redux";


// llega un array en props, se recorre y se renderiza en cada card
export default function Catalogo() {

    const catalogo = useSelector(state => state.products)

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
            {catalogo.map((p) => <AdminproductCard
                key={p.id}
                id={p.id}
                name={titleCase(p.name)}
                description={capitalizeFirstLetter(p.description)}
                picture={p.picture}
                price={p.price}
                stock={p.stock}
            />

            )}
        </div>

    )
}
