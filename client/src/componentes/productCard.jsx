import React from 'react';

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
                                          <h5 className="card-title">{props.name}</h5>
                                            <p className="card-text">{props.description}</p>
                                          <p className="card-text"><small className="text-muted">precio: 6000</small></p>
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
