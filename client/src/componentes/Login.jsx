import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo, getActiveOrder, logIn, getDbCart } from '../Redux/Actions/actions'
import Swal from 'sweetalert2';
import SuperSimpleNavbar from './SuperSimpleNavbar'

export default function Login() {
    const cart = useSelector(state => state.cart)
    const dispatch = useDispatch();
    const [data, setData] = useState({
        email: "",
        password: ""
    })
    const history = useHistory();

    const inputChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const registrar = (e) => {
        e.preventDefault()
        history.push('/user/singin')
    }

    const handleLogIn = async (e) => {
        e.preventDefault();
        let json = {
            email: data.email,
            password: data.password
        }
        const res = await axios.post(`http://localhost:3001/user/login`, json, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(async (resp) => {
            if (typeof (resp.data) === "string") {
                Swal.fire({
                    position: 'top',
                    icon: 'warning',
                    title: 'Usuario y/o contraseña son incorrectos',
                    showConfirmButton: false,
                    timer: 1700
                })
            } else {
                let activeOrder = resp.data.orders.filter(ord => ord.state === "carrito")
                dispatch(logIn())
                dispatch(getUserInfo(resp.data));
                dispatch(getActiveOrder(activeOrder))
                Swal.fire({
                    title: 'Usuario logueado correctamente',
                    width: 600,
                    padding: '3em',
                    background: 'url("https://i.imgur.com/4rsKgF2.jpg")',
                    backdrop: `
                  rgba(0,0,123,0.4)
                  url("https://sweetalert2.github.io/images/nyan-cat.gif")
                  left top
                  no-repeat
                `
                })
                if (cart.length > 0) {
                    cart.map(async (item) => {
                        let json = {
                            idOrder: activeOrder[0].id,
                            idProduct: item.id,
                            price: item.price,
                            amount: 1
                        }
                        const res = await axios.post(`http://localhost:3001/user/${resp.data.id}/cart`, json, {
                            headers: {
                                'Content-Type': 'application/json'
                            }
                        })
                    })
                    const rous = await axios.get(`http://localhost:3001/order/cart/${activeOrder[0].id}`)
                        .then(resp => {
                            let products = Object.values(resp.data)
                            dispatch(getDbCart(products))
                            history.push(`/user/${resp.data.id}/order`)
                        })
                } else {
                    history.push(`/user/${resp.data.id}/order`)
                }
            }
        })
    }

    const handleHome = (e) => {
        e.preventDefault();
        history.push('/')
    }

    return (
        <div>
            <SuperSimpleNavbar />
            <div className="sing_in" >
                <form className="form-sing-in">
                    <div class="Titulo-Ingresar">
                        <h2>Ingresar</h2>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Email</label>
                        <input type="email" name="email" onChange={inputChange} class="form-control" id="exampleInputEmail1" style={{ width: "350px" }} aria-describedby="emailHelp" placeholder="Ingresa tu email..." />
                    </div>
                    <div class="form-group">
                        <label for="exampleInputPassword1">Contraseña</label>
                        <input type="password" name="password" onChange={inputChange} class="form-control" id="exampleInputPassword1" style={{ width: "350px" }} placeholder="Ingresa tu contraseña..." />
                    </div>
                    <div class='btns104'>
                        <button class='DO101' style={{ width: '10vw', marginBottom: '3vh' }} type="submit" onClick={handleLogIn}>Iniciar sesion</button>
                        <p style={{marginTop: '2vh', margin: '0', textAlign: 'center'}}>¿No estás registrado?</p>
                        <button class='DO101' style={{ width: '10vw', margin: '0' }} onClick={registrar}> Crear cuenta</button>
                    </div>
                </form>
                <div>
                </div>
            </div>
        </div>
    )
}