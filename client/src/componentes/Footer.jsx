import React from 'react'
import phone from './images/Phone.png'
import home from './images/homes.png'
import email from './images/email.png'
import {useHistory} from 'react-router-dom'

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
                    <h5> Company name </h5>
                    <p> Nos esforzamos por tener un impacto positivo en los clientes, empleados, pequeñas empresas, la economía y las comunidades. 
                        La comunidad geek son constructores inteligentes y apasionados con diferentes orígenes y objetivos, que comparten el deseo 
                        común de estar siempre aprendiendo e inventando en nombre de nuestros clientes.</p>
                </div>
                <div className="products">
                    <h5 className="tituloo"> Products </h5>
                    <ul>
                        <li className="lista">
                            <a onClick={toCategorie} name="muñecos" className="links_categories" > Muñecos </a>
                        </li>
                        <li className="lista">
                            <a onClick={toCategorie} name="collecionables" className="links_categories" >  Collecionables </a>
                        </li>
                        <li className="lista">
                            <a onClick={toCategorie} name="articulos varios" className="links_categories" >  Articulos varios </a>
                        </li>
                        <li className="lista">
                            <a onClick={toCategorie} name="tazas" className="links_categories" > Tazas </a>
                        </li>
                    </ul>
                </div>
                <div className="links">
                    <h5 className="titulo_link"> Links </h5>
                    <ul>
                        <li className="lista">
                            <a onClick={acount} className="links_categories">Mi cuenta</a>
                        </li>
                        <li className="lista">
                            <a >Valoranos</a>
                        </li>
                        <li className="lista">
                            <a>Ayuda</a>
                        </li>
                    </ul>
                </div>
                <div className="contact">
                    <h5 className="titulo_contact"> Contact </h5>
                    <ul>
                        <li className="lista">
                            <img style={{width:"30px",marginRight:"4px"}} src={home} />
                            <label>
                                <a>Calle falsa123</a>
                            </label>
                        </li>
                        <li className="lista">
                            <a>
                            <img style={{width:"30px",marginRight:"4px"}} src={email} />
                            <label>
                                <a>g9@gmail.com</a>
                            </label>
                            </a>
                        </li>
                        <li className="lista">
                            <img style={{width:"30px",marginRight:"2px"}} src={phone} />
                            <label > +54 1234567890</label>
                        </li>
                    </ul>
                </div>
            </div>
            <div style={{ width: "100%", height: "2px", border: "white solid 1px", position: "relative" }}></div>
            <span style={{color:"white"}}>© 1999-2020, todos los derechos reservados ,inc o sus filiales</span>
        </div>
    )
}