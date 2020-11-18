import React, { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo, getActiveOrder, logIn, getDbCart, resetCart, getToken, getFavorites } from '../Redux/Actions/actions'
import { Modal, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import SuperSimpleNavbar from './SuperSimpleNavbar'
import { GoogleLogin } from 'react-google-login';

export default function Registro() {
    const cart = useSelector(state => state.cart)
    let history = useHistory();
    const dispatch = useDispatch();
    const [data, setData] = useState({
        name: "",
        lastName: "",
        email: "",
        password: "",
        check: false,
        withCredentials:true
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
                
                if(respo.data.orders.length === 0){
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
                }else if(respo.data.orders.length > 0){
                console.log(respo.data)
                let activeOrder = respo.data.orders.filter(ord => ord.state === "carrito")
                dispatch(logIn())
                dispatch(getUserInfo(respo.data));
                dispatch(getActiveOrder(activeOrder));
               
                const rusp = await axios.get(`http://localhost:3001/products/favorites/${respo.data.id}`)
                    .then(async(repi) => {
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


    const responseErrorGoogle = (response) => {
        
    }

    const [lgShow, setLgShow] = useState(false);
    const [smShow, setSmShow] = useState(false);

    const [errors, setErrors] = useState({
        emailError: "",
        passwordError: true,
        nameError: "",
        lastnameError: "",
        errores: true
    })

    const check = (e) => {
        if (e.target.checked === true) {
            setData({
                ...data,
                check: true
            })
        } else {
            setData({
                ...data,
                check: false
            })
        }
    }

    const inputsChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        if (data.name.length > 3 && data.lastName.length > 3 && data.check === true && data.email.length > 1 && !errors.emailError && data.password.length > 1 && !errors.passwordError && !errors.lastnameError && !errors.nameError) {
            setErrors({
                ...errors,
                errores: false
            })
        } else {
            setErrors({
                ...errors,
                errores: true
            })
        }
    }, [data.name, data.lastName, data.email, data.password, data.check, errors.emailError, errors.passwordError, errors.nameError, errors.lastnameError])

    useEffect(() => {
        if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(data.password)) {
            setErrors({
                ...errors,
                passwordError: true
            })
        }
        if (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(data.password)) {
            setErrors({
                ...errors,
                passwordError: false
            })
        }
    }, [data.password])

    useEffect(() => {
        if (!/\S+@\S+\.\S+/.test(data.email)) {
            setErrors({
                ...errors,
                emailError: "El email ingresado no es valido",

            })
        }
        if (/\S+@\S+\.\S+/.test(data.email)) {
            setErrors({
                ...errors,
                emailError: "",
            })
        }
    }, [data.email])

    useEffect(() => {
        if (/[$%&|{}.,()+-<>?¿'"!¡#]/.test(data.lastName)) {
            setErrors({
                ...errors,
                lastnameError: "no se aceptan caracteres especiales"
            })
        }
        if (!/[$%&|{}.,()+-<>?¿'"!¡#]/.test(data.lastName)) {
            setErrors({
                ...errors,
                lastnameError: ""
            })
        }
    }, [data.lastName])

    useEffect(() => {
        if (/[$%&|{}.,()+-<>?¿'"!¡#]/.test(data.name)) {
            setErrors({
                ...errors,
                nameError: "no se aceptan caracteres especiales"
            })
        }
        if (!/[$%&|{}.,()+-<>?¿'"!¡#]/.test(data.name)) {
            setErrors({
                ...errors,
                nameError: ""
            })
        }
    }, [data.name])

    const handleRegister = async (e) => {
        e.preventDefault();
        let json = {
            name: data.name,
            lastname: data.lastName,
            email: data.email,
            password: data.password
        }
        const res = await axios.post('http://localhost:3001/user', json, {
            headers: {
                'Content-Type': 'application/json'
            }

        }).then(async (ris) => {
            if (typeof (ris.data) === "string") {
                Swal.fire({
                    position: 'top',
                    icon: 'warning',
                    title: 'Email ya registrado',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
            dispatch(getToken(ris.data.accessToken))
            const res = await axios.get(`http://localhost:3001/user/orders/getOrders`, {
                headers: {
                    'Authorization': `Bearer ${ris.data.accessToken}`
                }
            }).then(async (respo) => {
                const ras = await axios.post(`http://localhost:3001/order/${respo.data.id}`)
                    .then(async (respi) => {
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
                            dispatch(resetCart())
                            console.log(activeOrder[0].id)
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

            })
        })

    }

    const handleLogIn = (e) => {
        e.preventDefault();
        history.push('/user/login')
    }


    return (
        <div>
            <SuperSimpleNavbar />
            <div className="sing_in" style={{ height: '85vh' }}>
                <form className="form-sing-in">
                    <div class="Titulo-Ingresar">
                        <h2>Regístrate</h2>
                    </div>
                    <div class="form-group">
                        <label >Nombre</label>
                        <input name="name" onChange={inputsChange} type="text" class="form-control" style={{ color: "black", width: "24vw" }} placeholder="Ingresa tu nombre..." />
                        <small className="detail">{errors.nameError}</small>
                    </div>
                    <div class="form-group">
                        <label >Apellido</label>
                        <input name="lastName" onChange={inputsChange} type="text" class="form-control" style={{ color: "black", width: "24vw" }} placeholder="Ingresa tu apellido..." />
                        <small className="detail">{errors.lastnameError}</small>
                    </div>
                    <div class="form-group">
                        <label >Email</label>
                        <input name="email" onChange={inputsChange} type="email" class="form-control" style={{ color: "black", width: "24vw" }} aria-describedby="emailHelp" placeholder="Ingresa tu email..." />
                        {data.email.length > 0 ? <small id="emailHelp" class="detail" >{errors.emailError}</small> : <div></div>}
                    </div>
                    <div class="form-group">
                        <label >Contraseña</label>
                        <input name="password" onChange={inputsChange} type="password" class="form-control" style={{ color: "black", width: "24vw" }} placeholder="Ingresa tu contraseña..." />
                        {errors.passwordError === true ? <small className="detail">Debe tener al menos 6 caracteres, una mayuscula, una minuscula y un numero</small> : <div></div>}
                    </div>
                    <div>
                        <input type="checkbox" onChange={check} />
                        <div>
                            <>
                                <Button onClick={() => setLgShow(true)} style={{ background: 'none', width: "250px", padding: "0px", color: "black", border: "none", position: "relative", bottom: "27px", left: "18px", boxShadow: "none", textDecoration: "none" }}>Acepto los <a className="links_terminos">terminos y condiciones</a></Button>
                                <Modal
                                    size="sm"
                                    show={smShow}
                                    onHide={() => setSmShow(false)}
                                    aria-labelledby="example-modal-sizes-title-sm"
                                >
                                    <Modal.Header closeButton>
                                        <Modal.Title id="example-modal-sizes-title-sm">
                                            Small Modal
                            </Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>...</Modal.Body>
                                </Modal>
                                <Modal
                                    size="lg"
                                    show={lgShow}
                                    onHide={() => setLgShow(false)}
                                    aria-labelledby="example-modal-sizes-title-lg"
                                >
                                    <Modal.Header closeButton>
                                        <Modal.Title id="example-modal-sizes-title-lg">
                                            Terminos de condiciones
                                    </Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        Los Términos y Condiciones así como la Política de Privacidad y/o informaciones sobre el Sitio se considerarán de aplicación para todo Usuario del
                                        Sitio desde el primer momento en que acceda al mismo. Los presentes términos y condiciones tienen carácter obligatorio y vinculante. Se aplican a
                                        todas las compras y actividades realizadas en el Sitio. Si el Usuario no acepta en forma total los presentes Términos y Condiciones y la Política
                                        de Privacidad, le rogamos que no avance en el acceso y visita de nuestro Sitio. En caso de avanzar en la visita a nuestro Sitio, se entenderá que
                                        el Usuario aceptó sin reservas los presentes Términos y Condiciones y la Política de Privacidad, aceptando recibir mails periódicos con la
                                        información que el Sitio determine. Los Términos y Condiciones y la Política de Privacidad podrán ser modificados en todo o en parte en cualquier
                                        momento y a exclusivo criterio de GEEKTOYS S.A.; dichos cambios e implementaciones tendrán vigencia a partir del momento mismo en que sean publicados
                                        o insertados en el Sitio o desde que sean notificados al Usuario por cualquier medio, lo que ocurra primero. Por lo expuesto, le sugerimos que los
                                        visite periódicamente. Las violaciones a los Términos y Condiciones generarán el derecho en favor del titular del Sitio a suspender o terminar la
                                        prestación del servicio al Usuario que las haya realizado, por acción u omisión. El Sitio se preocupa por la protección de datos de carácter
                                        personal de los Usuarios, de acuerdo a los lineamientos expuestos en nuestra Política de Privacidad.
                                </Modal.Body>
                                </Modal>
                            </>
                        </div>
                    </div>
                    <div class='btns104'>
                        <button disabled={errors.errores} class='DO101' style={{ width: '10vw', marginBottom: '2vh', marginTop: '0' }} onClick={handleRegister}> Crear cuenta</button>
                        <p style={{ marginTop: '2vh', margin: '0', textAlign: 'center' }}>¿Ya tienes una cuenta?</p>
                        <button class='DO101' style={{ width: '10vw', margin: '0' }} type="submit" onClick={handleLogIn}>Iniciar sesion</button>
                        <br />
                        <GoogleLogin
                            clientId="689080969961-k4i4ccctckdvf369ln044ar325rfd1km.apps.googleusercontent.com"
                            buttonText="Iniciar Sesion"
                            onSuccess={responseSuccessGoogle}
                            isSignedIn={false}
                            onFailure={responseErrorGoogle}
                            cookiePolicy={'single_host_origin'}
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}
