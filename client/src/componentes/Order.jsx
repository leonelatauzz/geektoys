import React, { useEffect, useState } from 'react';
import { Accordion, Card, Button, Row, Col } from 'react-bootstrap'
import axios from 'axios';
import { BrowserRouter as Router, Route, useHistory, useParams } from 'react-router-dom'
import Nat from './navbar'
import Footer from './Footer'
import { useSelector } from "react-redux";
import pokemon from './images/lugia-pokemon-2.webp'


export default function Order() {
    const userData = useSelector(state => state.userId);
    const history = useHistory();
    const params = useParams();


    const handleClick = (e) => {
        if (e.target.value === 'ordenes') {
            history.push(`/user/${params.id}/order/${userData.name}/orderUser`)
        }
        if (e.target.value === 'seguridad') {
            history.push(`/user/${params.id}/order/${userData.name}/segurity`)

        }
        /*   if(e.target.value === 'privacidad'){
             history.push(`/user/${params.id}/privacity`)
         } */


    }


    return (
        <div>
            <Nat />
            <div style={{ marginTop: '30px', textAlign: 'center', color: 'black' }}>
                <h2>Bienvenido {userData.name} {userData.lastname}</h2>
            </div>

            <div style={{ display: 'flex', alignContent: 'center', margin: 'auto', marginTop: '30px', marginBottom: '30px' }}>
                <div style={{ display: 'flex', alignContent: 'center', margin: 'auto', marginTop: '30px', marginBottom: '30px' }}>

                    <Card style={{ width: '15rem' }}>
                        <Card.Img variant="top" src="https://i.imgur.com/qlmpxcd.png" />
                        <Card.Body>
                            <Card.Title style={{ color: 'red' }}>Ordenes</Card.Title>
                            <Card.Text>
                                Verifica el estado de tus órdenes.
    </Card.Text>
                            <button onClick={handleClick} class='tbe100' value="ordenes" variant="danger">Ver más</button>
                        </Card.Body>
                    </Card>

                    {/* <Card style={{ width: '15rem',marginLeft: '50px'}}>
                            <Card.Img variant="top" src="https://i.imgur.com/du1UGbF.jpg" />
                            <Card.Body>
                                <Card.Title style={{color:'red'}}>Privacidad</Card.Title>
                                <Card.Text>
                                    Detalles de mi información personal.
    </Card.Text>
                                <Button onClick= {handleClick} value="privacidad" variant="danger">Ver más</Button>
                            </Card.Body>
                        </Card> */}


                    <Card style={{ width: '15rem', marginLeft: '50px' }}>
                        <Card.Img variant="top" src="https://i.imgur.com/n12K3dz.jpg" />
                        <Card.Body>
                            <Card.Title style={{ color: 'red' }}>Seguridad</Card.Title>
                            <Card.Text>
                                Actualiza tus datos personales.
    </Card.Text>
                            <button onClick={handleClick} class='tbe100' value="seguridad" >Ver más</button>
                        </Card.Body>
                    </Card>
                    {/*  <div style={{ width: '18rem', marginLeft:'100px', marginTop:'120px'}}>
                    <Card.Img variant="top" src={pokemon} />
                </div> */}
                </div>
            </div>
            <Footer />
        </div>
    )

}