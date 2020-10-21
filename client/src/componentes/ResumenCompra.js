import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getA, getAdress, getActiveOrder, getPurchaseData } from '../Redux/Actions/actions';
import Swal from 'sweetalert2';
import axios from 'axios';
import SimpleNavbar from './SimpleNavbar'
import Footer from './Footer'


export default function ResumenCompra() {
    const history = useHistory()
    const dispatch = useDispatch();
    const dbCart = useSelector(state => state.dbCart);
    const userData = useSelector(state => state.userId)
    const activeOrder = useSelector(state => state.activeOrder)
    const adresses = useSelector(state => state.adresses)
    const [data, setData] = useState({
        options: false,
        domicilio: false,
        sucursal: false,
        adresses: [],
        selectedAdress: null,
        sA: false,
        dMethod: null,
        forward: false,
        adressId: null,
        payment: false,
        cardNumber: '',
        cardName: '',
        cardCcv: ''
    });
    let json;
    let utc = new Date().toJSON().slice(0, 10).replace(/-/g, '/');
    let suma = 0
    dbCart.forEach(element => {
        suma = suma + (element.cart.price * element.cart.amount)
    });
    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const hideOptionsA = async (e) => {
        e.preventDefault();
        const res = await axios.get(`http://localhost:3001/user/adress/${userData.id}`)
            .then(resp => {
                dispatch(getAdress(resp.data.adresses))
                setData({
                    ...data,
                    options: true,
                    domicilio: true,
                    sucursal: false,
                    sA: false,
                    adresses: resp.data.adresses,
                    forward: false
                })
            })

    }

    const hideOptionsB = (e) => {
        e.preventDefault();
        setData({
            ...data,
            options: true,
            sucursal: true,
            dMethod: 'sucursal',
            forward: true,
            selectedAdress: {id: 0}
        })
    }

    const addA = (e) => {
        e.preventDefault();
        history.push(`/checkout/${activeOrder[0].id}/${userData.id}/newAdress`)
    }

    const editA = (e) => {
        e.preventDefault()
        dispatch(getA(e.target.value))
        history.push(`/checkout/${activeOrder[0].id}/${userData.id}/editAdress`)
    }

    const deleteA = async (e) => {
        e.preventDefault()
        setData({
            ...data,
            adressId: e.target.value
        })
        Swal.fire({
            title: '¿Estas seguro?',
            text: "No hay vuelta atras!!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Eliminar'
        }).then(async (alert) => {
            if (alert.isConfirmed === true) {
                const res = await axios.delete(`http://localhost:3001/user/deleteAdress/${userData.id}/${data.adressId}`)
                    .then(resp => {
                        dispatch(getAdress(resp.data.adresses));
                        setData({
                            ...data,
                            options: false,
                            domicilio: false,
                            forward: false
                        })
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Dirección eliminada correctamente',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    })
            }
        })
    }

    const selectA = (e) => {
        e.preventDefault();
        data.adresses.forEach(item => {
            if (item.id === parseInt(e.target.value)) {
                setData({
                    ...data,
                    options: true,
                    domicilio: false,
                    sA: true,
                    sucursal: false,
                    selectedAdress: item,
                    dMethod: 'adress',
                    forward: true
                })
            }
        })


    }
    const resetOptions = (e) => {
        e.preventDefault();
        setData({
            ...data,
            options: false,
            domicilio: false,
            sucursal: false,
            sA: false,
            forward: false
        })
    }

    function titleCase(str) {
        var splitStr = str.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        return splitStr.join(' ');
    }

    const payment = (e) => {
        e.preventDefault()
        setData({
            ...data,
            payment: true
        })
    }

    const handlePayment = async (e) => {
        e.preventDefault();
        if (data.cardNumber.length === 0 || data.cardName.length === 0 || data.cardCcv.length === 0) {
            Swal.fire({
                position: 'top',
                icon: 'warning',
                title: 'Completa todos los campos porfavor',
                showConfirmButton: false,
                timer: 1700
            })
        } else {
            if (data.dMethod === 'sucursal') {
                json = {
                    state: 'pagada',
                    deliveryMethod: data.dMethod
                }
            } else if (data.dMethod === 'adress') {
                json = {
                    state: 'pagada',
                    deliveryMethod: data.dMethod,
                    adressId: data.selectedAdress.id
                }
            }
            const res = await axios.put(`http://localhost:3001/order/${activeOrder[0].id}/payment`, json, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(async () => {
                const ras = await axios.post(`http://localhost:3001/order/${userData.id}`)
                    .then((resp) => {
                        let activeOrder = resp.data.orders.filter(ord => ord.state === "carrito")
                        dispatch(getActiveOrder(activeOrder))
                        let pData = {
                            products: dbCart,
                            adress: data.selectedAdress,
                            deliveryMethod: data.dMethod,
                            user: userData,
                            order: activeOrder[0].id,
                            total: suma
                        }
                        dispatch(getPurchaseData(pData))
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'Pago exitoso!',
                            showConfirmButton: false,
                            timer: 1500
                        })
                        history.push(`/aproved/${activeOrder[0].id}/${userData.id}`)
                    })

            })
        }

    }

    return (
        <div>
            <SimpleNavbar />
            {data.payment === false &&
                <div class='containerRC'>
                    <div class='leftD'>

                        {data.options === false &&
                            <div class='RC1'>
                                <h2 class='titleRC'>Selecciona como deseas recibir tu compra!</h2>
                                <div class='RC1_5'>
                                    <div class='adressRC' onClick={hideOptionsA}>
                                        <p class='pRC'>Envío a domicilio</p>
                                    </div>
                                    <div class='adressRC' onClick={hideOptionsB}>
                                        <p class='pRC'>Retiro en sucursal</p>
                                    </div>
                                </div>
                            </div>
                        }
                        {data.domicilio === true &&
                            <div class='RC1'>
                                <h2>Selecciona una dirección</h2>
                                {data.adresses.length === 0 ?
                                    <h4>No tienes direcciones guardadas</h4> :
                                    data.adresses.map(item =>
                                        <div class='aRCCard'>
                                            <div class='liRc'>
                                                <h4>{item.firstLine}</h4>
                                                <p>{item.secondLine} - {item.postalCode}</p>
                                                <p>{item.district} - {item.province}</p>
                                                <button class='smButtRC' value={item.id} onClick={editA}>Editar</button>
                                                <button class='smButtRC' value={item.id} onClick={deleteA}>Eliminar</button>
                                            </div>
                                            <button class='slButtRC' value={item.id} onClick={selectA}>Seleccionar Dirección</button>
                                        </div>
                                    )
                                }
                                <button class='fBRC' onClick={addA}>Agregar nueva dirección</button>
                                <button class='fBRC' onClick={resetOptions}>Elegir otro método de entrega</button>
                            </div>
                        }
                        {data.sA === true &&
                            <div class='RC1'>
                                <h2>Delivery a:</h2>
                                <div class='aRCCard'>
                                    <div class='liRc'>
                                        <h4>{data.selectedAdress.firstLine}</h4>
                                        <p>{data.selectedAdress.secondLine} - {data.selectedAdress.postalCode}</p>
                                        <p>{data.selectedAdress.district} - {data.selectedAdress.province}</p>
                                        <button class='fBRC' onClick={hideOptionsA}>Elegir otra dirección</button>
                                        <button class='fBRC' onClick={resetOptions}>Elegir otro metodo de entrega</button>
                                    </div>
                                </div>
                            </div>
                        }
                        {data.sucursal === true &&
                            <div class='RC1'>
                                <h2>Retiras en nuestra sucursal</h2>
                                <div class='aRCCard'>
                                    <div class='liRc'>
                                        <h4>Calle falsa123</h4>
                                        <p>Microcentro - Capital Federal</p>
                                        <p>Lunes a Viernes, 9:00 a 18:00</p>
                                        <button class='fBRC' onClick={resetOptions}>Elegir otro metodo de entrega</button>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                    <div class='rigthD'>
                        <div class='RC2'>
                            <h2>Resumen de tu compra</h2>
                            <div class='mRC'>
                                {dbCart.map(item =>
                                    <p class='mItemRC'><a href={`/products/prod/${item.id}`}>{titleCase(item.name)}</a> ({item.cart.amount}) -- ${(item.cart.price) * (item.cart.amount)}</p>
                                )}
                                <h5 class='mItemRC'>Total: {suma}</h5>
                            </div>
                            {data.forward === true &&
                                <div class='adressRC' style={{ marginTop: '3vh' }} onClick={payment}>
                                    <p class='pRC'>Seleccionar pago</p>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            }
            {data.payment === true &&
                <div class='container98'>
                    <div class="card98">
                        <div class='cd98'>
                            <img src="https://seeklogo.com/images/V/VISA-logo-62D5B26FE1-seeklogo.com.png" class="logo-card98" />
                            <label class='label98'>Card number:</label>
                            <input value={data.cardNumber} name='cardNumber' onChange={handleChange} id="user" type="text" class="input98 cardnumber98" placeholder="1234 5678 9101 1121"></input>
                            <label class='label98'>Name:</label>
                            <input value={data.cardName} name='cardName' onChange={handleChange} class="input98 name98" placeholder="Edgar Pérez"></input>
                            <label class="label98 toleft98">CCV:</label>
                            <input value={data.cardCcv} name='cardCcv' onChange={handleChange} class="input98 toleft98 ccv98" placeholder="321"></input>
                        </div>
                        <button onClick={handlePayment} class="proceed98"><svg class="sendicon98" width="24" height="24" viewBox="0 0 24 24">
                            <path d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z"></path>
                        </svg></button>
                    </div>
                    <div class="receipt98">
                        <div class="col98">
                            <h6>Total:</h6>
                            <h4 class="cost98">${suma}</h4>
                            <h6>Nombre:</h6>
                            <h4 class="seller98">{userData.name}</h4>
                            <h4 class="seller98">{userData.lastname}</h4>
                            <h6>Número de orden:</h6>
                            <h4 class="cost98">#{activeOrder[0].id}</h4>
                        </div>
                        <div class="col98">
                            <h6>Productos:</h6>
                            {dbCart.map(item =>
                                <div>
                                    <h4 class="seller98">{titleCase(item.name)}</h4>
                                    {item.cart.amount == 1 ? <h5 class="bought-items98 description98">{item.cart.amount} unidad</h5> : <h5 class="bought-items98 description98">{item.cart.amount} unidades</h5>}
                                    <h5 class="bought-items98 price98">${(item.cart.price) * (item.cart.amount)}</h5>
                                </div>
                            )}
                        </div>
                        <h6 class="comprobe98">{utc}</h6>
                    </div>
                </div>
            }
        </div>
    )
}