import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { getAProduct, getProducts } from '../Redux/Actions/actions'
import eHeart from './images/emp.png';
import fHeart from './images/cl.png'

// se crea diseño de productos en una card utilizando bootstrap
export default function ProductCard(props) {
    const history = useHistory();
    const dispatch = useDispatch();
    const [data, setData] = useState({
        fav: false
    });

    function setStock(props) {
        return props.stock == 0 ? 'Producto sin stock'
            : props.stock == 1 ? 'Última unidad disponible'
                : props.stock <= 5 ? 'Últimas ' + props.stock + ' unidades disponibles'
                    : props.stock + ' unidades disponibles';
    }

    const handle = (e) => {
        e.preventDefault()
        history.push(`/products/prod/${props.id}`);
        dispatch(getAProduct(props))
    }

    const handleEH = (e) => {
        e.preventDefault();
        setData({
            ...data,
            fav: true
        })
    }   

    const handleFH = (e) => {
        e.preventDefault();
        setData({
            ...data,
            fav: false
        })
    }
    


    return (
        <div class="container" >
            <div class="row">
                <div class="col-md-4">
                    <img onClick={handle} src={`http://localhost:3001/uploads/${props.picture}`} class="card-img" alt="..." />
                </div>
                <div class="informacion">
                    <a class="card-title" onClick={handle}  >{props.name}</a>
                    <p class="card-text-price">${props.price}</p>
                    <p class="card-text"><small className="text-muted">{setStock(props)}</small></p>
                </div>
                <div class="divBoton">
                {data.fav === false ? <img onClick={handleEH} class='emptyLike' src={eHeart}/> : <img onClick={handleFH} class='fullLike' src={fHeart}/>}
                

                        

                </div>
            </div>
        </div>
    )
}
