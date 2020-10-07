import React from 'react';
import ProductCard from './productCard.jsx'

// llega un array en props, se recorre y se renderiza en cada card
export default function Catalogo(props){
    return(
        <div className="card">
           {props.titulo.map((p)=> <ProductCard 
           titulo ={p.titulo}
           descripcion={p.descripcion}
           imagen={p.imagen}
           />
        )}
        </div>
    )
}