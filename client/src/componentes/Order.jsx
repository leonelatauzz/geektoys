import React, { useEffect, useState } from 'react';
import { Accordion, Card, Button, Row, Col } from 'react-bootstrap'
import axios from 'axios';
import { BrowserRouter as Router, Route, useHistory, useParams } from 'react-router-dom'
import Nat from './navbar'
import Footer from './Footer'
import { useSelector } from "react-redux";


export default function Order() {
    const userData = useSelector(state => state.userId);     
    const history = useHistory();
    const params = useParams();


    const handleClick = (e) =>{        
        if(e.target.value === 'ordenes'){
            history.push(`/user/${params.id}/order/${userData.name}/orderUser`)
        }
        if(e.target.value === 'seguridad'){
            history.push(`/user/${params.id}/order/${userData.name}/segurity`)

        }
        if(e.target.value === 'privacidad'){
            history.push(`/user/${params.id}/privacity`)
        }

        
    }


    return (
        <div>
            <Nat />
            <div style={{marginTop:'30px', textAlign: 'center', color: 'black' }}>
                <h3>Bienvenido: {userData.name} {userData.lastname}</h3>
            </div>

            <div style={{display:'flex', flexFlow: 'row wrap', marginLeft:'650px'}}>                
                
                <div style={{display:'flex', flexDirection:'row', alignItems:'center'}}>
                    
                    <div>
                        <Card style={{display:'flex', alignItems:'center', width: '15rem' }}>
                            <Card.Img variant="top" src="https://i.imgur.com/qlmpxcd.png" />
                            <Card.Body >
                                <Card.Title style={{color:'red', textAlign:'center', margin:'1rem', padding:'1rem'}}>Ordenes</Card.Title>
                                <Card.Text style={{textAlign:'center', margin:'1rem', padding:'1rem'}}>
                                    Verifica el estado de tus órdenes.
    </Card.Text>
                                <Button style={{marginLeft: '60px'}} onClick= {handleClick} value="ordenes" variant="danger">Ver más</Button>
                            </Card.Body>
                        </Card>
                    </div>
                    <div style={{ marginLeft: '50px' }}>
                        <Card style={{ width: '15rem' }}>
                            <Card.Img variant="top" src="https://i.imgur.com/du1UGbF.jpg" />
                            <Card.Body>
                                <Card.Title style={{color:'red', textAlign:'center', margin:'1rem', padding:'1rem'}}>Privacidad</Card.Title>
                                <Card.Text style={{textAlign:'center', margin:'1rem', padding:'1rem'}}>
                                    Detalles de mi información personal.
    </Card.Text>
                                <Button style={{marginLeft: '60px'}} onClick= {handleClick} value="privacidad" variant="danger">Ver más</Button>
                            </Card.Body>
                        </Card>
                    </div>
                    <div style={{ marginLeft: '50px' }}>
                        <Card style={{ width: '15rem' }}>
                            <Card.Img variant="top" src="https://i.imgur.com/n12K3dz.jpg" />
                            <Card.Body >
                                <Card.Title style={{color:'red', textAlign:'center', margin:'1rem', padding:'1rem'}}>Seguridad</Card.Title>
                                <Card.Text style={{textAlign:'center', margin:'1rem', padding:'1rem'}}>
                                    Actualiza tus datos personales.
    </Card.Text>
                                <Button style={{marginLeft: '60px'}} onClick= {handleClick} value="seguridad" variant="danger">Ver más</Button>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

/*
<Col sm={3}>
                    <div className="div_desplegable" style={{display:'flex' ,margin:'20px'}}>
                        <Accordion defaultActiveKey="0">
                        <h4 style={{margin: ' 5px 0px 20px 20px'}}>{userData.name} {userData.lastname}</h4>
                            <Card>

                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant="link" eventKey="0" >
                                        <span> Compras </span>
                                    </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="0">
                                    <Card.Body> Ordenes </Card.Body>
                                </Accordion.Collapse>
                                <Accordion.Collapse eventKey="0">
                                    <Card.Body> Preguntas </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            <Card>
                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant="link" eventKey="1">
                                        <span> Configuracion </span>
                                    </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="1">
                                    <Card.Body>Mis datos</Card.Body>
                                </Accordion.Collapse>
                                <Accordion.Collapse eventKey="1">
                                    <Card.Body>Seguridad</Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>
                    </div>
                </Col>
                <Col sm={9}>

                </Col> */