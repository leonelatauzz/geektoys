import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import axios from 'axios'
import { Row, Col, Button } from 'react-bootstrap';
import { getDbCart } from '../Redux/Actions/actions'

export default function CardCarrito(props) {
    const dispatch = useDispatch();
    const loggedIn = useSelector(state => state.loggedIn);
    const userData = useSelector(state => state.userId);
    const activeOrder = useSelector(state => state.activeOrder);
    const [data, setData] = useState({
        amount: props.cart.amount
    })

    const upAmount = async (e) => {
        e.preventDefault();
        let targetInfo = e.target.value.split('/');
        let dataP = {
            orderId: activeOrder[0].id,
            productId: parseInt(targetInfo[0]),
            amount: parseInt(targetInfo[1]) + 1
        }
        const res = await axios.put(`http://localhost:3001/user/${userData.id}/cart`, dataP, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(async (resp) => {
            const rous = await axios.get(`http://localhost:3001/order/cart/${activeOrder[0].id}`)
                .then((resp) => {
                    let response = Object.values(resp.data)
                    dispatch(getDbCart(response))
                    setData({
                        ...data,
                        amount: data.amount + 1
                    })

                })

        })
    }



    const downAmount = async (e) => {
        e.preventDefault();
        let targetInfo = e.target.value.split('/');
        let dataP = {
            orderId: activeOrder[0].id,
            productId: parseInt(targetInfo[0]),
            amount: parseInt(targetInfo[1]) - 1
            
        }
        const ros = await axios.put(`http://localhost:3001/user/${userData.id}/cart`, dataP, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(async (resp) => {
            const rous = await axios.get(`http://localhost:3001/order/cart/${activeOrder[0].id}`)
                .then((resp) => {
                    let response = Object.values(resp.data)
                    dispatch(getDbCart(response))
                    setData({
                        ...data,
                        amount: data.amount - 1
                    })

                })

        })

        if(dataP.amount <= 0) {
            return
        }

    }

    const handDel = async(e) => {
        e.preventDefault();
        const ris = await axios.delete(`http://localhost:3001/user/${userData.id}/cart/${e.target.value}/${activeOrder[0].id}`)
        .then(async (resp) => {
            alert('Producto eliminado correctamente');
            const reis = await axios.get(`http://localhost:3001/order/cart/${activeOrder[0].id}`)
                .then((resp) => {
                    let response = Object.values(resp.data)
                    dispatch(getDbCart(response))

                })

        })
    }

    return (
        <div>
            <div className='contenedor' style={{ display: "flex" }}>
                <Col sm={8}>
                    <div style={{ display: "flex" }}>
                        <img style={{ width: "190px", height: "250px", margin: '10px' }} src={`http://localhost:3001/uploads/${props.picture}`} />
                        <div style={{ display: "flex", flexDirection: "column", margin: '30px' }}>
                            <h3 style={{ marginBottom: '15px' }}> {props.name} </h3>
                            <p>{props.stock > 0 ? 'Disponible' : 'Producto sin stock'}</p>
                            <p>Cantidad a comprar:</p>
                            <div style={{ display: 'flex' }}>
                                {loggedIn === false ? <p id='comprar'>{data.amount}</p> : <p id='comprar'>{data.amount}</p>}
                                <div className= "union">
                                    <button for='comprar' value={props.id + '/' + props.cart.amount} onClick={upAmount}>+</button>
                                    <button for='comprar' value={props.id + '/' + props.cart.amount} onClick={downAmount}>-</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Col>
                <Col sm={4}>
                    <div style={{ display: "flex" }}>
                        <div style={{ display: "flex", flexDirection: "column", margin: '30px', marginTop: '70px' }}>
                            <h5 style={{ marginBottom: '15px' }}> Precio: ${props.cart.price}</h5>
                            <div>
                                <button value={props.id} onClick={handDel} class="btn btn-outline-danger">Eliminar producto</button>
                            </div>
                        </div>
                    </div>
                </Col>
                <div style={{ borderBottom: "black solid 1px", position: "absolute", left: "250px", width: "900px" }}></div>
            </div>
        </div>
    )
}