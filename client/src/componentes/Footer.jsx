import React from 'react'
import phone from './images/whatsapp.png'
import home from './images/home.png'
import email from './images/google-plus.png'
import { useHistory } from 'react-router-dom'
import Axios from 'axios';
import { getProducts, getUserInfo, getActiveOrder } from "../Redux/Actions/actions";
import { useDispatch, useSelector } from "react-redux";



export default function Footer() {
    const history = useHistory()
    const dispatch = useDispatch();
    const token = useSelector(state => state.token);
    const userData = useSelector(state => state.userId);




    const starwars = async (e) => {
        e.preventDefault();
        const res = await Axios.get(`http://localhost:3001/products/categoria/starwars`)
            .then(res => {
                history.push(`/products/categoria/starwars`)
                const productDist = Object.values(res.data);
                dispatch(getProducts(productDist))
            })
    }
    const pokemon = async (e) => {
        e.preventDefault();
        const res = await Axios.get(`http://localhost:3001/products/categoria/pokemon`)
            .then(res => {
                history.push(`/products/categoria/pokemon`)
                const productDist = Object.values(res.data);
                dispatch(getProducts(productDist))
            })
    }
    const naruto = async (e) => {
        e.preventDefault();
        const res = await Axios.get(`http://localhost:3001/products/categoria/naruto`)
            .then(res => {
                history.push(`/products/categoria/naruto`)
                const productDist = Object.values(res.data);
                dispatch(getProducts(productDist))
            })
    }


    const handleHome = (e) => {
        e.preventDefault();
        history.push('/')
    }
    const goDashboard = async (e) => {
        e.preventDefault();
        const res = await Axios.get(`http://localhost:3001/user/orders/getOrders`, {
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

    return (
        <div className="footer">

            <div className="footer_div_container">
                <div className="company">
                    <a onClick={handleHome} class="navbar-brand">
                        <img src="https://i.imgur.com/QUOAdAS.png" width="200vh" height="100vh" alt="" style={{ marginRight: '10vw', marginBottom: '5vw', cursor: 'pointer' }} />
                    </a>
                    {/* <h5>El mundo GEEK a solo un click!</h5> */}
                    {/*  <p> Nos esforzamos por tener un impacto positivo en los clientes, empleados, pequeñas empresas, la economía y las comunidades.
                    La comunidad geek son constructores inteligentes y apasionados con diferentes orígenes y objetivos, que comparten el deseo
                        común de estar siempre aprendiendo e inventando en nombre de nuestros clientes.</p> */}
                </div>
                <div className="products">
                    <ul >
                        <li className="lista">
                            <h3 className="tituloo" style={{ color: '#D90429', marginBottom: '25px' }}>Productos</h3>
                        </li>
                        <li className="lista">
                            <a onClick={naruto} name="funkos" style={{ cursor: 'pointer' }} className="links_categories" >- Naruto </a>
                        </li>
                        <li className="lista">
                            <a onClick={pokemon} name="colecionables" style={{ cursor: 'pointer' }} className="links_categories" >- Pokemon </a>
                        </li>
                        <li className="lista">
                            <a onClick={starwars} name="vestimenta" style={{ cursor: 'pointer' }} className="links_categories" >- Starwars </a>
                        </li>
                    </ul>
                </div>
                <div className="links">
                    <ul>
                        <li className="lista" bac>
                            <h3 style={{ color: '#D90429', marginBottom: '25px' }}>Links</h3>
                        </li>
                        <li className="lista">
                            <a onClick={goDashboard} style={{ cursor: 'pointer' }} className="links_categories">- Mi cuenta</a>
                        </li>
                        <li className="lista" style={{ cursor: 'pointer' }}>
                            <a style={{ color: 'black', }} href="http://localhost:3000/colaboradores">- Desarrolladores</a>
                        </li>
                    </ul>
                </div>
                <div className="contact">

                    <ul>
                        <li className="lista">
                            <h3 style={{ color: '#D90429', marginBottom: '25px' }} className="titulo_contact"> Contacto </h3>
                        </li>
                        <li className="lista">
                            <img style={{ width: "30px" }} src={home} />
                            <label>
                                <a> Calle falsa123 - Buenos Aires</a>
                            </label>
                        </li>
                        <li className="lista">
                            <a>
                                <img style={{ width: "30px", margin: "5px" }} src={email} />
                                <label>
                                    <a> soporte@geektoys.com</a>
                                </label>
                            </a>
                        </li>
                        <li className="lista">
                            <img style={{ width: "23px", margin: "5px" }} src={phone} />
                            <label > (+54) 300 840 84 80</label>
                        </li>
                    </ul>
                </div>
            </div>
            <div className='derechos' style={{ display: 'flex', color: "black", justifyContent: "center" }}><p>© 1999-2020, todos los derechos reservados ,inc o sus filiales</p></div>
        </div>
    )
}