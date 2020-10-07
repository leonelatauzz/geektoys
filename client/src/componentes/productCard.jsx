import React from 'react';
import ReactDom from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Producto from './Producto'




export default function ProductCard (){
    return (
        <div class="container">
          <div class="row">
              <div class="col-sm">
                  <div class="card" >
                      <div>
                          <div class="card mb-3" >
                              <div class="row no-gutters">
                                  <div class="col-md-4">
                                      <img src={imagen} class="card-img" alt="..." />
                                  </div>
                                  <div class="col-md-8">
                                      <div class="card-body">
                                          <h5 class="card-title">{props.titulo}</h5>
                                          <p class="card-text">{props.descripcion}</p>
                                          <p class="card-text"><small class="text-muted">precio: 6000</small></p>
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
    {/* <img src="" class="card-img-top" />
    <div class="card-body">
        <h5 class="card-title">{props.nombre}</h5>
        <p class="card-text">{props.descripcion}</p>
        <a href="#" class="btn btn-primary">ver productasdasddas</a> */}