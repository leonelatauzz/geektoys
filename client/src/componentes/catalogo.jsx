import React from 'react';
import ProductCard from './productCard.jsx'

// llega un array en props, se recorre y se renderiza en cada card
export default function Catalogo(props){
    
    return(
        <div className="card">
           {props.productos.map((p)=> <ProductCard 
           titulo ={p.titulo}
           descripcion={p.descripcion}
           imagen={p.imagen}
           />
        )}

       {/*FILTRADO PARA EL CATALOGO POR CATEGORIA*/}
        <div className = 'Category' {...ProductCard.filter(producto =>
        producto.includes(props.titulo, props.descripcion).map(productoFilter =>(<ProductCard {...productoFilter}/>)))} 
        ></div>
        </div>
        
    )
}
