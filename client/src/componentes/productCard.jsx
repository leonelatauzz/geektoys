import React from 'react';

import Productos from './Producto.js';

// se crea diseño de productos en una card utilizando bootstrap
export default function ProductCard (props){
    
    
    return (
        <div className="container">
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
                                          <h5 className="card-title"><a href= {`http://localhost:3000/products/prod/${props.id}`} >{props.name}</a></h5>
                                            <p className="card-text">{props.description}</p>
                                            <p className="card-text"><small className="text-muted">${props.price}</small></p>
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
