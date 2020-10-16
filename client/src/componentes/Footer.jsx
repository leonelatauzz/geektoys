import React from 'react'
import phone from './images/Phone.png'
import home from './images/homes.png'
import email from './images/email.png'

export default function Footer() {

    return (
        <div className="footer">
            <div className="footer_div_container">
                <div className="company">
                    <h5> Company name </h5>
                    <p> Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo doloribus quisquam quis dicta ea laudantium itaque dolore quasi enim, atque rem magnam modi similique ipsum amet deserunt odio perferendis totam?</p>
                </div>
                <div className="products">
                    <h5 className="tituloo"> Products </h5>
                    <ul>
                        <li className="lista">
                            <a > Muñecos </a>
                        </li>
                        <li className="lista">
                            <a> Collecionables </a>
                        </li>
                        <li className="lista">
                            <a> Articulos varios </a>
                        </li>
                        <li className="lista">
                            <a> Tazas </a>
                        </li>
                    </ul>
                </div>
                <div className="links">
                    <h5 className="titulo_link"> Links </h5>
                    <ul>
                        <li className="lista">
                            <a>Mi cuenta</a>
                        </li>
                        <li className="lista">
                            <a>Valoranos</a>
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