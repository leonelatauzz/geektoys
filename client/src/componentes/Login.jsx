import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo, getActiveOrder, logIn, getDbCart, resetCart, getToken, getFavorites } from '../Redux/Actions/actions'
import Swal from 'sweetalert2';
import SuperSimpleNavbar from './SuperSimpleNavbar';
import { GoogleLogin } from 'react-google-login';

export default function Login() {
    const cart = useSelector(state => state.cart)
    const dispatch = useDispatch();
    const [data, setData] = useState({
        email: "",
        password: "",
        withCredentials: true
    })

    const responseSuccessGoogle = async (response) => {
        let json = {
            tokenId: response.tokenId,
            withCredentials: data.withCredentials
        }
        const res = await axios.post('http://localhost:3001/user/login/google', json, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(async (resp) => {

            dispatch(getToken(resp.data.accessToken))
            const res = await axios.get(`http://localhost:3001/user/orders/getOrders`, {
                headers: {
                    'Authorization': `Bearer ${resp.data.accessToken}`
                }
            }).then(async (respo) => {

                if (respo.data.orders.length === 0) {
                    const ras = await axios.post(`http://localhost:3001/order/${respo.data.id}`)
                        .then(async (respi) => {
                            console.log(respi.data)
                            let activeOrder = respi.data.orders.filter(ord => ord.state === "carrito")
                            dispatch(logIn())
                            dispatch(getUserInfo(respi.data));
                            dispatch(getActiveOrder(activeOrder))
                            if (cart.length > 0) {
                                cart.map(async (item) => {
                                    let json = {
                                        idOrder: activeOrder[0].id,
                                        idProduct: item.id,
                                        price: item.price,
                                        amount: 1
                                    }
                                    const res = await axios.post(`http://localhost:3001/user/${respi.data.id}/cart`, json, {
                                        headers: {
                                            'Content-Type': 'application/json'
                                        }
                                    })
                                })
                                const rous = await axios.get(`http://localhost:3001/order/cart/${activeOrder[0].id}`)
                                    .then(respe => {
                                        let products = Object.values(respe.data)
                                        dispatch(getDbCart(products))
                                        Swal.fire({
                                            title: 'Usuario registrado correctamente',
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
                                        dispatch(resetCart())
                                        history.push(`/user/${respi.data.id}/order`)
                                    })
                            } else {
                                Swal.fire({
                                    title: 'Usuario registrado correctamente',
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
                                history.push(`/user/${respi.data.id}/order`)
                            }
                        })
                } else if (respo.data.orders.length > 0) {
                    console.log(respo.data)
                    let activeOrder = respo.data.orders.filter(ord => ord.state === "carrito")
                    dispatch(logIn())
                    dispatch(getUserInfo(respo.data));
                    dispatch(getActiveOrder(activeOrder));

                    const rusp = await axios.get(`http://localhost:3001/products/favorites/${respo.data.id}`)
                        .then(async (repi) => {
                            let favs = Object.values(repi.data)
                            dispatch(getFavorites(favs))
                            if (cart.length > 0) {
                                cart.map(async (item) => {
                                    let json = {
                                        idOrder: activeOrder[0].id,
                                        idProduct: item.id,
                                        price: item.price,
                                        amount: 1
                                    }
                                    const res = await axios.post(`http://localhost:3001/user/${respo.data.id}/cart`, json, {
                                        headers: {
                                            'Content-Type': 'application/json'
                                        }
                                    })
                                })
                                const rous = await axios.get(`http://localhost:3001/order/cart/${activeOrder[0].id}`)
                                    .then(resp => {
                                        let products = Object.values(resp.data)
                                        dispatch(getDbCart(products))
                                        dispatch(resetCart())
                                        history.push(`/user/${respo.data.id}/order`)
                                    })
                            } else {
                                history.push(`/user/${respo.data.id}/order`)
                            }
                        })
                }
            })

        })
    }

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
            if (typeof (resp.data) === 'string') {
                Swal.fire({
                    position: 'top',
                    icon: 'warning',
                    title: 'Usuario y/o contraseña son incorrectos',
                    showConfirmButton: false,
                    timer: 1700
                })
            }
            dispatch(getToken(resp.data.accessToken))
            const res = await axios.get(`http://localhost:3001/user/orders/getOrders`, {
                headers: {
                    'Authorization': `Bearer ${resp.data.accessToken}`
                }
            }).then(async (respo) => {
                console.log(respo.data)
                if (respo.data.state !== 'alta') {
                    Swal.fire({
                        position: 'top',
                        icon: 'warning',
                        title: 'Usuario y/o contraseña son incorrectos',
                        showConfirmButton: false,
                        timer: 1700
                    })
                } else {
                    let activeOrder = respo.data.orders.filter(ord => ord.state === "carrito")
                    dispatch(logIn())
                    dispatch(getUserInfo(respo.data));
                    dispatch(getActiveOrder(activeOrder));
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
                    const rusp = await axios.get(`http://localhost:3001/products/favorites/${respo.data.id}`)
                        .then(async (repi) => {
                            let favs = Object.values(repi.data)
                            dispatch(getFavorites(favs))
                            if (cart.length > 0) {
                                cart.map(async (item) => {
                                    let json = {
                                        idOrder: activeOrder[0].id,
                                        idProduct: item.id,
                                        price: item.price,
                                        amount: 1
                                    }
                                    const res = await axios.post(`http://localhost:3001/user/${respo.data.id}/cart`, json, {
                                        headers: {
                                            'Content-Type': 'application/json'
                                        }
                                    })
                                })
                                const rous = await axios.get(`http://localhost:3001/order/cart/${activeOrder[0].id}`)
                                    .then(resp => {
                                        let products = Object.values(resp.data)
                                        dispatch(getDbCart(products))
                                        dispatch(resetCart())
                                        history.push(`/user/${respo.data.id}/order`)
                                    })
                            } else {
                                const rous = await axios.get(`http://localhost:3001/order/cart/${activeOrder[0].id}`)
                                .then(resp => {
                                    let products = Object.values(resp.data)
                                    dispatch(getDbCart(products))
                                    history.push(`/user/${respo.data.id}/order`)
                                })
                            }
                        })
                }
            })
        })
    }
    const responseErrorGoogle = (response) => {
    }

    const handleHome = (e) => {
        e.preventDefault();
        history.push('/')
    }

    return (
        <div>
            <SuperSimpleNavbar />
            <div className="sing_in" style={{ height: '60vh' }} >
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
                    <div class='btns104' style={{display:'flex', flexWrap:'wrap'}}>
                        <button class='DO101' style={{ width: '10vw', marginBottom: '3vh'}} type="submit" onClick={handleLogIn}>Iniciar sesion</button>
                        
                        <GoogleLogin
                            clientId="689080969961-k4i4ccctckdvf369ln044ar325rfd1km.apps.googleusercontent.com"
                            buttonText="Iniciar Sesion"
                            onSuccess={responseSuccessGoogle}
                            isSignedIn={false}
                            onFailure={responseErrorGoogle}
                            cookiePolicy={'single_host_origin'}
                        />
                         <br />
                        <p style={{ marginTop: '2vh', margin: '0', textAlign: 'center' }}>¿No estás registrado?</p>
                        <button class='DO101' style={{ width: '10vw', margin: '0' }} onClick={registrar}> Crear cuenta</button>
                    </div>
                </form>
                <div>
                </div>
            </div>
        </div>
    )
}