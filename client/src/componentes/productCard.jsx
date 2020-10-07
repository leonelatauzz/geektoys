import React from 'react';
import ReactDom from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function ProductCard (props){
    return (
       <div class="container">
            <div class="row">
                <div class="col-sm">
                    <div class="card" >
                        <img src="" class="card-img-top" />
                        <div class="card-body">
                            <h5 class="card-title">{props.nombre}</h5>
                            <p class="card-text">{props.descripcion}</p>
                            <a href="#" class="btn btn-primary">ver productoo</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}