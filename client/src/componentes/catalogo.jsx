import React from 'react';
import ProductCard from './productCard.jsx'

// llega un array en props, se recorre y se renderiza en cada card
export default function Catalogo(props){
    
    return(
        <div className="card">
           {props.productos.map((p)=> <ProductCard 
           name ={p.name}
           description={p.description}
           picture={p.picture}
           />
        )}

       {/*FILTRADO PARA EL CATALOGO POR CATEGORIA*/}
        <div className = 'Category' {...ProductCard.filter(producto =>
        producto.includes(props.name, props.description).map(productoFilter =>(<ProductCard {...productoFilter}/>)))} 
        ></div>
        </div>
        
    )
}
