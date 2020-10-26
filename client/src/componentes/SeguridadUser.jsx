import { Card, Col, Row } from 'react-bootstrap';
import ResetPass from './ResetPass';
import FormUserDisable from './formUserDisable'
import Nat from './navbar';
import Footer from './Footer';
import React, { useState } from 'react';


export default function SeguridadUser() {
    const estilo = { marginLeft: '100px', marginTop: '100px', marginBottom: '10px' };
    const cualquiera = ''

    const [data, setState] = useState({
        options: ''
    })



    const handleClick = (e) => {
        setState({
            ...data,
            options: e.target.value
        })

    }

    return (

        <div >
            <div>
                <Nat />
            </div>

            <div className= 'contenedor1' style={{display:"flex", height: '600px'}}>
                
                    <Col sm={3} >                        
                            <div className="navSeguridadUser">
                                <div class='bd100' style={estilo}>
                                    <button onClick={handleClick} value='resetPass' class='tbe100' variant="secondary">Cambiar contraseña</button>
                                </div>
                                <div class='bd100' style={estilo}>
                                    <button onClick={handleClick} value='bloquearCuenta' class='tbe100'>Desactivar cuenta</button>
                                </div>
                            </div>
                        
                    </Col>
                    <Col sm={8} style={{margin:'100px'}}>                        
                            {data.options === 'bloquearCuenta' ? <div><FormUserDisable/></div> : data.options === 'resetPass' ? <ResetPass /> : <ResetPass />}
                        
                    </Col  >
                
            </div >
            <div>
                <Footer />
            </div>

        </div>
    )
}