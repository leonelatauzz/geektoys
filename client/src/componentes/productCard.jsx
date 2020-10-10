import React from 'react';
import {useHistory} from 'react-router-dom'

import Productos from './Producto.js';

// se crea diseño de productos en una card utilizando bootstrap
export default function ProductCard (props){
    const history = useHistory();

    const funcion = props.product
    

    const handle = ()=> {
        funcion(props)
        history.push(`/products/prod/${props.id}`);
    }

    
    
    return (
        
        <div className="container" >
            
          <div className="row">                 
              <div className="col-sm">
                  <div className="card" >
                      <div>
                          <div className="card mb-3" >
                              <div className="row no-gutters">
                                  <div className="col-md-4">
                                      <img src={props.picture} className="card-img" alt="..." />
                                  </div>
                                  <div className="col-md-8">
                                      <div className="card-body">
                                          <h5 className="card-title" ><a onClick={handle}  >{props.name}</a></h5>
                                            <p className="card-text">${props.price}</p>
                                            <p className="card-text"><small className="text-muted"></small></p>
                                            <p className="card-text"><small className="text-muted">{props.stock}</small></p>
                                        {/*EL componente <Product /> se renderiza solo cuando vamos a la ruta del producto con su id,
                                         a traves de routing, aca no se necesita*/}  
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    )
}
