import React from 'react'
import phone from './images/whatsapp.png'
import home from './images/home.png'
import email from './images/google-plus.png'
import { useHistory } from 'react-router-dom'

export default function Footer() {
    const history = useHistory()


    const toCategorie = (e) => {
        e.preventDefault()
        history.push(`/products/categoria/${e.target.name}`)
    }

    const acount = (e) => {
        e.preventDefault()
        history.push("/user/login")
    }

    return (
        <div className="footer">
            <div className="footer_div_container">
                <div className="company">
                    <h3 style={{ color: '#D90429' }}> Geek Toys </h3>
                    <p> Nos esforzamos por tener un impacto positivo en los clientes, empleados, pequeñas empresas, la economía y las comunidades.
                    La comunidad geek son constructores inteligentes y apasionados con diferentes orígenes y objetivos, que comparten el deseo
                        común de estar siempre aprendiendo e inventando en nombre de nuestros clientes.</p>
                </div>
                <div className="products">

                    <ul>
                        <li className="lista">
                            <h5 className="tituloo" style={{ color: '#D90429' }}> Productos </h5>
                        </li>
                        <li className="lista">
                            <a onClick={toCategorie} name="funkos" className="links_categories" > Funkos </a>
                        </li>
                        <li className="lista">
                            <a onClick={toCategorie} name="colecionables" className="links_categories" >  Colecionables </a>
                        </li>
                        <li className="lista">
                            <a onClick={toCategorie} name="vestimenta" className="links_categories" >  Vestimenta </a>
                        </li>
                        <li className="lista">
                            <a onClick={toCategorie} name="videojuegos" className="links_categories" > Videojuegos </a>
                        </li>
                    </ul>
                </div>
                <div className="links">
                    <ul>
                        <li className="lista" bac>
                            <h5 style={{ color: '#D90429' }}>Links</h5>
                        </li>
                        <li className="lista">
                            <a onClick={acount} className="links_categories">Mi cuenta</a>
                        </li>
                        <li className="lista">
                            <a >Valoranos</a>
                        </li>
                        <li className="lista">
                            <a>Ayuda</a>
                        </li>
                        <li className="lista" style={{ cursor: 'pointer' }}>
                            <a style={{ color: 'black', }} href="http://localhost:3000/colaboradores">Desarrolladores</a>
                        </li>
                    </ul>
                </div>
                <div className="contact">

                    <ul>
                        <li className="lista">
                            <h5 style={{ color: '#D90429', marginBottom: '2vh', marginLeft: '2vw' }} className="titulo_contact"> Contacto </h5>
                        </li>
                        <li className="lista">
                            <img style={{ width: "30px", margin: "7px" }} src={home} />
                            <label>
                                <a>Calle falsa123</a>
                            </label>
                        </li>
                        <li className="lista">
                            <a>
                                <img style={{ width: "30px", margin: "7px" }} src={email} />
                                <label>
                                    <a>g9@gmail.com</a>
                                </label>
                            </a>
                        </li>
                        <li className="lista">
                            <img style={{ width: "23px", margin: "7px" }} src={phone} />
                            <label > +54 1234567890</label>
                        </li>
                    </ul>
                </div>
            </div>
            <span style={{ color: "black", marginLeft: "87px" }}>© 1999-2020, todos los derechos reservados ,inc o sus filiales</span>
        </div>
    )
}