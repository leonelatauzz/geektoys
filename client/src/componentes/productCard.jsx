import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { getAProduct, getProducts, getPID } from '../Redux/Actions/actions'
import eHeart from './images/emp.png';
import fHeart from './images/cl.png';
import { Card } from 'react-bootstrap'

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
        dispatch(getAProduct(props))
        dispatch(getPID(props.id))
        history.push(`/products/prod/${props.id}`);
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
        <Card class='card103' style={{ maxWidth: '25vw', boxShadow: '10px 10px 5px 0px rgba(0,0,0,0.35)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', marginBottom: '5vh'}}>
            <div onClick={handle} style={{height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', cursor: 'pointer'}}>
                <Card.Img  style={{ padding: '20px' }} variant="top" src={`http://localhost:3001/uploads/${props.picture}`} />
            </div>
            <div>
                <Card.Body>
                    <Card.Title onClick={handle} style={{ marginTop: '30px', color: '#D90429' }}><h1 role="button" tabindex="0">{props.name}</h1></Card.Title>
                    <Card.Text style={{ fontFamily: 'Malgun Gothic Semilight', fontSize: '19px', textAlign: 'justify' }}>
                        <p>{setStock(props)}</p>
                    </Card.Text>
                </Card.Body>
                <Card.Footer style={{ display: 'flex', justifyContent: 'space-between', height: '10vh' }}>
                    <h2 style={{ color: '#D90429', alignSelf: 'center' }}>${props.price}</h2>
                    <div class="divBoton" style={{ cursor: 'pointer', }} >
                        {data.fav === false ? <img onClick={handleEH} class='emptyLike' src={eHeart} /> : <img onClick={handleFH} class='fullLike' src={fHeart} />}
                        <span role="button" tabindex="0"></span>
                    </div>
                </Card.Footer>
            </div>
        </Card>
    )
}
