import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import axios from 'axios'
import { Row, Col, Button } from 'react-bootstrap';
import { getDbCart } from '../Redux/Actions/actions';
import Swal from 'sweetalert2'

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

        if (dataP.amount <= 0) {
            return
        }

    }

    const handDel = async (e) => {
        e.preventDefault();
        const ris = await axios.delete(`http://localhost:3001/user/${userData.id}/cart/${e.target.value}/${activeOrder[0].id}`)
            .then(async (resp) => {
                const reis = await axios.get(`http://localhost:3001/order/cart/${activeOrder[0].id}`)
                    .then((resp) => {
                        let response = Object.values(resp.data)
                        dispatch(getDbCart(response))
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Producto eliminado correctamente',
                            showConfirmButton: true
                        }).then(respou => {
                            if (respou.isConfirmed === true) {
                                window.location.reload()
                            }
                        })
                    })

            })
    }

    return (
        <div style={{ border: '0.25px gray solid', boxShadow: '10px 10px 5px 0px rgba(0,0,0,0.35)', borderRadius: '8px', width: '40vw', marginBottom: '5vh', display: "flex", justifyContent: 'space-between', marginLeft: '1vw', marginTop: '1vw' }}>
            <img style={{ width: "190px", height: "250px", margin: '10px' }} src={`http://localhost:3001/uploads/${props.picture}`} />
            <div style={{ display: "flex", width: '23vw', justifyContent: 'space-between', padding: '1vh', alignSelf: 'center' }}>
                <div>
                    <h2 style={{ color: '#D90429' }}> {props.name} </h2>
                    <p>{props.stock > 0 ? 'Disponible' : 'Producto sin stock'}</p>
                    <p>Cantidad a comprar:</p>
                    <div style={{ display: 'flex', justifyContent: 'space-evenly', height: '4vh', width: '12vh' }}>
                        {loggedIn === false ? <p style={{ fontSize: '2vh', marginTop: '0.5vh' }} id='comprar'>{data.amount}</p> : <p style={{ fontSize: '2vh', marginTop: '0.5vh' }} id='comprar'>{data.amount}</p>}
                        <button class='DO101' style={{ width: '4vh', heigth: '3vh', margin: '0', fontSize: '25px' }} for='comprar' value={props.id + '/' + props.cart.amount} onClick={upAmount}>+</button>
                        <button class='DO101' style={{ width: '4vh', heigth: '3vh', margin: '0', fontSize: '25px' }} for='comprar' value={props.id + '/' + props.cart.amount} onClick={downAmount}>-</button>
                    </div>
                </div>
                <div style={{ margin: '8.3vh 1vw 0 0' }}>
                    <h5 style={{ marginBottom: '15px' }}> Precio: ${props.cart.price}</h5>
                    <button value={props.id} onClick={handDel} class="btn btn-outline-danger">Eliminar producto</button>
                </div>
            </div>
        </div>
    )
}