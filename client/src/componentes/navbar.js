import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, useHistory } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import { getCategories, getProducts, getDbCart, logOut, getUserInfo, getActiveOrder, resetCart } from '../Redux/Actions/actions'
import image from './images/carrito.png'


export default function Navbar() {
    const loggedIn = useSelector(state => state.loggedIn)
    const userData = useSelector(state => state.userId)
    let history = useHistory();
    const dispatch = useDispatch();
    const categoria = useSelector(state => state.categories)
    const [busq, setBusq] = useState([]);
    const activeOrder = useSelector(state => state.activeOrder);



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
            const rous = await axios.get(`http://localhost:3001/order/cart/${activeOrder[0].id}`)
                .then(resp => {
                    let products = Object.values(resp.data)
                    dispatch(getDbCart(products))
                    history.push(`/user/${userData.id}/carrito`)
                })
        }


    }
    const goDashboard = (e) => {
        e.preventDefault();
        history.push(`/user/${userData.id}/order`)
    }

    const salir = (e) => {
        e.preventDefault();
        dispatch(logOut())
        dispatch(getUserInfo([]))
        dispatch(getActiveOrder([]))
        dispatch(resetCart())
        history.push('/')
    }



    return (

        <nav class="navbar navbar-expand-lg navbar-light bg-light" style={{ display: "flex", alignItems: "stretch"}}>
            <a onClick={handleHome} class="navbar-brand">
                <img src="https://i.imgur.com/QUOAdAS.png" width="160" height="50" alt="" style={{cursor: 'pointer'}} />
            </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent"  >
                <ul class="navbar-nav mr-auto">
                   {/*  <li class="nav-item">
                        <a class="nav-link my-1 mr-sm-2 homE" href="Dashboard Admin" onClick={handleAdmin}>Dashboard Admin</a>
                    </li> */}
                    <li class="nav-item">
                        <a class="nav-link my-1 mr-sm-2 lin" href="Productos" onClick={handleP}>Productos</a>
                    </li>
                    <li className="nav-item dropdown">
                        
                        <select class="custom-select my-1 mr-sm-2 categ" id="inlineFormCustomSelectPref" href="Categorias" onChange={handleChange}>
                        <option selected="true" disabled="disabled">Categorias</option>
                            {categoria.map(cat => <option value={cat.name} key={cat.id}>{cat.name}</option>)}
                        </select>
                        
                    </li>
                    <li >
                        <form onSubmit={handleEnter}>
                            <div>
                              
                                <input className="input" name="search" type="text" placeholder="Tu producto..." aria-label="Search" onChange={handleInputChange}></input>
                            </div>
                        </form>
                    </li>
                    <li>
                        <button id='searchB' class="botonete" onClick={handleFormSubmit}>Buscar</button>
                    </li>
                </ul>
                <div style={{display: "flex", justifyContent: "flex-end", alignItems: "stretch"}}>
                {loggedIn === false ? <div> <button className="btn3" style={{ marginRight: "20px" }} onClick={singIn}> Registrarse</button>
                    <button className="btn3" style={{ marginRight: "30px" }} onClick={logIn}>Ingresar</button></div> : <div style={{display:'flex'}}><button onClick={goDashboard} className="btn3" style={{ marginRight: "30px" }}>Mi Usuario</button> <button className="btn3" style={{ marginRight: "30px" }} onClick={salir}>Salir</button> </div>}
                    <div style={{display: "flex", justifyContent: "flex-end"}}>
                    <img onClick={carrito} src={image} style={{ width: "40px", height: "40px"}} role="button" tabindex="0"/>
                    </div>
                </div>
            </div>
        </nav>
    )
}

