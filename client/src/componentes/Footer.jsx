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

    const handleHome = (e) => {
        e.preventDefault();
        history.push('/')
    }

    return (
        <div className="footer">

            <div className="footer_div_container">
                <div className="company">
                    <a onClick={handleHome} class="navbar-brand">
                        <img src="https://i.imgur.com/QUOAdAS.png" width="230vh" height="120vh" alt="" style={{ marginLeft: '50px', cursor: 'pointer' }} />
                    </a>
                    {/* <h5>El mundo GEEK a solo un click!</h5> */}
                    {/*  <p> Nos esforzamos por tener un impacto positivo en los clientes, empleados, pequeñas empresas, la economía y las comunidades.
                    La comunidad geek son constructores inteligentes y apasionados con diferentes orígenes y objetivos, que comparten el deseo
                        común de estar siempre aprendiendo e inventando en nombre de nuestros clientes.</p> */}
                </div>
                <div className="products">
                    <ul >
                        <li className="lista">
                            <h3 className="tituloo" style={{ color: '#D90429', marginBottom:'25px'}}>Productos</h3>
                        </li>
                        <li className="lista">
                            <a onClick={toCategorie} name="funkos" style={{cursor: 'pointer' }} className="links_categories" >- Funkos </a>
                        </li>
                        <li className="lista">
                            <a onClick={toCategorie} name="colecionables" style={{cursor: 'pointer' }} className="links_categories" >- Colecionables </a>
                        </li>
                        <li className="lista">
                            <a onClick={toCategorie} name="vestimenta" style={{cursor: 'pointer' }} className="links_categories" >- Vestimenta </a>
                        </li>
                        <li className="lista">
                            <a onClick={toCategorie} name="videojuegos" style={{cursor: 'pointer' }} className="links_categories" >- Videojuegos </a>
                        </li>
                    </ul>
                </div>
                <div className="links">
                    <ul>
                        <li className="lista" bac>
                            <h3 style={{ color: '#D90429', marginBottom:'25px' }}>Links</h3>
                        </li>
                        <li className="lista">
                            <a onClick={acount} style={{cursor: 'pointer' }} className="links_categories">- Mi cuenta</a>
                        </li>
                        <li className="lista">
                            <a style={{cursor: 'pointer' }}>- Valoranos</a>
                        </li>
                        <li className="lista">
                            <a style={{cursor: 'pointer' }}>- Ayuda</a>
                        </li>
                        <li className="lista" style={{ cursor: 'pointer' }}>
                            <a style={{ color: 'black', }} href="http://localhost:3000/colaboradores">- Desarrolladores</a>
                        </li>
                    </ul>
                </div>
                <div className="contact">

                    <ul>
                        <li className="lista">
                            <h3 style={{ color: '#D90429', marginBottom:'25px'}} className="titulo_contact"> Contacto </h3>
                        </li>
                        <li className="lista">
                            <img style={{ width: "30px"}} src={home} />
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
            <div className='derechos' style={{ display:'flex',color: "black", justifyContent: "center"}}><p>© 1999-2020, todos los derechos reservados ,inc o sus filiales</p></div>
        </div>
    )
}