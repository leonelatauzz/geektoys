import React from 'react'
import { Nav } from 'react-bootstrap'
import ResetPass from './ResetPass'

export default function SeguridadUser() {


    return (

        <div>
            <div className="navSeguridadUser">
                <Nav variant="tabs" defaultActiveKey="/home">
                    <Nav.Item>
                        <Nav.Link id='reset' value='reset'>Reset password</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link value='modificar'>Modificar email</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link value='eliminar'>Eliminar cuenta</Nav.Link>
                    </Nav.Item>
                </Nav>
            </div>
            <div id='datos' style={{backgroundColor:'red'}}>
            </div>
        </div>
    )
}