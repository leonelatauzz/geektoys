import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, useHistory } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import { getFavorites, getCategories, getToken, getProducts, getDbCart, logOut, getUserInfo, getActiveOrder, resetCart } from '../Redux/Actions/actions'
import image from './images/carrito.png';
import Swal from 'sweetalert2';
import fHeart from './images/cl.png';
import eC from './images/empC.png'


export default function Navbar() {
    const categoria = useSelector(state => state.categories);
    const dbCart = useSelector(state => state.dbCart);
    const cart = useSelector(state => state.cart);
    const [busq, setBusq] = useState([]);
    const activeOrder = useSelector(state => state.activeOrder);
    const loggedIn = useSelector(state => state.loggedIn);
    const token = useSelector(state => state.token);
    const userData = useSelector(state => state.userId);
    let history = useHistory();
    const dispatch = useDispatch();
    const [dc, setDc] = useState([])
    const [c, setC] = useState([])

    useEffect(() => {
        async function makeRequests() {
            if (loggedIn === true) {
                await axios.get(`http://localhost:3001/order/cart/${activeOrder[0].id}`)
                    .then(resp => {
                        let products = Object.values(resp.data)
                        dispatch(getDbCart(products))
                        setDc(products)
                    })
            }
        }
        makeRequests();
    }, []);


    const handleChange = async (event) => {
        history.push(`/products/categoria/${event.target.value}`)
        const res = await axios.get(`http://localhost:3001/products/categoria/${event.target.value}`)
            .then(res => {
                const resObj = Object.values(res.data)
                dispatch(getProducts(resObj))

            })
    }

    const handleInputChange = (event) => {
        setBusq(event.target.value.toLowerCase());
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();
        axios.get(`http://localhost:3001/products/search?query=${busq}`)
            .then(res => {
                if (Object.values(res.data).length === 0) {
                    history.push('/products/search/notFound')
                } else {
                    history.push("/products/search")
                    const ObjRes = Object.values(res.data)
                    dispatch(getProducts(ObjRes))
                }
            })

    }

    const handleP = async (e) => {
        e.preventDefault();
        history.push('/products');
        await axios.get('http://localhost:3001/products/')
            .then(res => {

                dispatch(getProducts(res.data))
            })

    }

    const handleEnter = (e) => {
        e.preventDefault()
        axios.get(`http://localhost:3001/products/search?query=${busq}`)
            .then(res => {
                if (Object.values(res.data).length === 0) {
                    history.push('/products/search/notFound')
                } else {
                    history.push("/products/search")
                    const ObjRes = Object.values(res.data)
                    dispatch(getProducts(ObjRes))
                }
            })

    }

    const handleAdmin = (e) => {
        e.preventDefault();
        history.push('/admin')
    }

    const handleHome = (e) => {
        e.preventDefault();
        history.push('/')
    }

    useEffect(() => {
        async function makeRequests() {

            await axios.get(`http://localhost:3001/products/category`)
                .then(res => {
                    dispatch(getCategories(res.data))

                })
        }
        makeRequests();
    }, []);

    const singIn = (e) => {
        e.preventDefault()
        history.push("/user/singin")
    }

    const logIn = (e) => {
        e.preventDefault()
        history.push('/user/login')
    }

    const carrito = async (e) => {
        e.preventDefault()
        if (loggedIn === false) {
            history.push(`/guest/carrito`)
        } else if (loggedIn === true) {
            console.log(activeOrder[0].id)
            const rous = await axios.get(`http://localhost:3001/order/cart/${activeOrder[0].id}`)
                .then(resp => {
                    let products = Object.values(resp.data)
                    dispatch(getDbCart(products))
                    history.push(`/user/${userData.id}/carrito`)
                })
        }


    }
    const goDashboard = async (e) => {
        e.preventDefault();
        const res = await axios.get(`http://localhost:3001/user/orders/getOrders`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(respo => {
            let activeOrder = respo.data.orders.filter(ord => ord.state === "carrito")
            dispatch(getUserInfo(respo.data));
            dispatch(getActiveOrder(activeOrder));
        })
        history.push(`/user/${userData.id}/order`)
    }

    const salir = (e) => {
        e.preventDefault();
        dispatch(getToken(null))
        dispatch(logOut())
        dispatch(getUserInfo([]))
        dispatch(getActiveOrder([]))
        dispatch(resetCart())
        dispatch(getDbCart([]))
        history.push('/')
        Swal.fire({
            title: 'Usuario Desloguedo, ¡Nos vemos pronto!',
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
    }

    const favs = async (e) => {
        e.preventDefault();
        const rusp = await axios.get(`http://localhost:3001/products/favorites/${userData.id}`)
            .then(resp => {
                let favs = Object.values(resp.data)
                dispatch(getFavorites(favs))
                history.push(`/favorites/${userData.id}`)
            })
    }

    function titleCase(str) {
        var splitStr = str.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        return splitStr.join(' ');
    }

    return (

        <nav class="navbar navbar-expand-lg navbar-light bg-light" style={{ display: "flex", alignItems: "stretch" }}>
            <a onClick={handleHome} class="navbar-brand">
                <img src="https://i.imgur.com/QUOAdAS.png" width="190vh" height="80vh" alt="" style={{ cursor: 'pointer' }} />
            </a>
            <div class="collapse navbar-collapse" id="navbarSupportedContent"  >
                <ul class="navbar-nav mr-auto">
                    {/*  <li class="nav-item">
                        <a class="nav-link my-1 mr-sm-2 homE" href="Dashboard Admin" onClick={handleAdmin}>Dashboard Admin</a>
                    </li> */}
                    <li class="nav-item">
                        <button class="nav-link" style={{ color: '#D90429', marginLeft: '2vw' }} href="Productos" onClick={handleP}>Productos</button>
                    </li>
                    <li className="nav-item">

                        <select class="custom-select" id="inlineFormCustomSelectPref" href="Categorias" onChange={handleChange}>
                            <option class='opt102' selected="true" disabled="disabled">Categorias</option>
                            {categoria.map(cat => <option class='opt102' value={cat.name} key={cat.id}>{titleCase(cat.name)}</option>)}
                        </select>

                    </li>
                    <li >
                        <form onSubmit={handleEnter}>
                            <div>

                                <input className="input102" name="search" type="text" placeholder="Tu producto..." aria-label="Search" onChange={handleInputChange}></input>
                            </div>
                        </form>
                    </li>
                    <li>
                        <button id='searchB' class="nav-link" style={{ color: '#D90429', borderLeft: '0px white', borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px', boxShadow: '3px 0px 5px 2px rgba(0,0,0,0.29)', marginTop: '1vh' }} onClick={handleFormSubmit}>Buscar</button>
                    </li>
                </ul>
                <div style={{ display: "flex" }}>
                    {loggedIn === true && userData.role === 'Admin' &&
                        <div style={{ cursor: 'pointer', display: "flex", justifyContent: "flex-end", marginRight: '1.5vw' }}>
                          <button className="nav-link" onClick={() => history.push('/admin')}>administracion</button>
                        </div>
                    }
                     {loggedIn === true && dc.length === 0 &&
                        <div onClick={carrito} style={{ cursor: 'pointer', display: "flex", justifyContent: "flex-end", marginRight: '1.5vw' }}>
                            <img src={image} style={{ width: "40px", height: "4vh" }} role="button" />
                        </div>
                    }
                    {loggedIn === false && cart.length === 0 &&
                        <div onClick={carrito} style={{ cursor: 'pointer', display: "flex", justifyContent: "flex-end", marginRight: '1.5vw' }}>
                            <img src={image} style={{ width: "40px", height: "4vh" }} role="button" />
                        </div>
                    }
                    {loggedIn === true && dc.length > 0 &&
                        <div onClick={carrito} style={{ cursor: 'pointer', display: "flex", flexDirection: 'column', marginRight: '1.5vw', marginTop: '10px' }}>
                            <h6 style={{ width: '25px', textAlign: 'center', position: 'absolute', marginLeft: '11px', color: '#D90429' }}>{dc.length}</h6>
                            <img src={eC} style={{ width: "40px", height: "35px", margin: '0' }} role="button" />
                        </div>
                    }
                    {loggedIn === false && cart.length > 0 &&
                        <div onClick={carrito} style={{ display: "flex", flexDirection: 'column', marginRight: '1.5vw', marginTop: '10px', cursor: 'pointer' }}>
                            <h6 style={{ width: '25px', textAlign: 'center', position: 'absolute', marginLeft: '11px', color: '#D90429' }}>{cart.length}</h6>
                            <img src={eC} style={{ width: "40px", height: "35px", margin: '0' }} role="button" />
                        </div>
                    }
                    {loggedIn === true &&
                        <div style={{ display: "flex", justifyContent: "flex-end", marginRight: '1.5vw' }}>
                            <img onClick={favs} src={fHeart} style={{ width: "3vh", height: "3vh", alignSelf: 'center' }} role="button" />
                        </div>
                    }
                    {loggedIn === false ? <div style={{ display: "flex" }}> <button className="nav-link" style={{ marginRight: "20px" }} onClick={singIn}> Registrarse</button>
                        <button className="nav-link" style={{ marginRight: "30px" }} onClick={logIn}>Ingresar</button></div> : <div style={{ display: 'flex' }}><button onClick={goDashboard} className="nav-link" style={{ marginRight: "30px" }}>Mi Usuario</button> <button className="nav-link" style={{ marginRight: "30px" }} onClick={salir}>Salir</button> </div>}
                </div>
            </div>
        </nav>
    )
}

