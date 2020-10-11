import React from 'react';
import ProductCard from './productCard.jsx'

// llega un array en props, se recorre y se renderiza en cada card
export default function Catalogo(props){
    function example(props) {
        return props.stock == 0 ? 'Producto sin stock'
             : props.stock == 1 ? 'Última unidad disponible'
             : props.stock <= 5 ? props.stock + ' unidades disponibles'
             : '';
    }
   
                    
    return(
        
        <div className="card" >            
           {props.productos.map((p)=> <ProductCard
           key={p.id}
           id={p.id} 
           name ={p.name }
           description={p.description}
           picture={p.picture}
           price={p.price}
           stock={example(p)}
           product={props.product}
           />
          
        )}
        </div>
        
    )
}
