import React, { useState } from 'react';
import ProductCard from './productCard.jsx';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import Nat from './navbar'
import Footer from './Footer'



// llega un array en props, se recorre y se renderiza en cada card
export default function Catalogo() {
 
    const catalogo = useSelector(state => state.products)
    const categoria = useSelector(state => state.categories)

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

  const parametro = useParams()
  let description;
  
  categoria.forEach(element => {
      if(element.name === parametro.nombreCat ){
          description = element.description
      }
      if(parametro.nombreCat === undefined){
          description = "aqui estan todos nuestros productos"
      }    
  });

    return (
        <div>   

            <Nat/>

           {description ? <h1 className="titulo_catalogo" style={{color:"black", maxWidth:"40%",margin:"auto",backgroundColor:"white",textAlign:"center",border:"white solid 1px",borderRadius:"20px",marginTop:"15px"}}>{description}</h1> : <div></div>}
        <div class="tarjeta" >
            {catalogo.map((p) => <ProductCard
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
        <Footer/>
        </div>

    )
}