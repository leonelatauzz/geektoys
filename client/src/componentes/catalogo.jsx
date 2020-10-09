import React from 'react';
import ProductCard from './productCard.jsx'

// llega un array en props, se recorre y se renderiza en cada card
export default function Catalogo(props){
    return(
        <div className="card">
           {props.productos.map((p)=> <ProductCard
           key={p.id} 
           name ={p.name}
           description={p.description}
           picture={p.picture}
           />
        )}
        </div>
        
    )
}
