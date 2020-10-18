import React, { useEffect, useState } from 'react';
import { Accordion, Card, Button, Row, Col, Nav, Table } from 'react-bootstrap'
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, useHistory } from 'react-router-dom'


export default function Order() {
    let fecha;
    const userData = useSelector(state => state.userId);
    return (
        <div>
            <Row style={{ margin: "30px", height: "600px", border: "none", boxShadow: "none" }}>
                <Col sm={3}>
                    <div className="div_desplegable">
                        <Accordion defaultActiveKey="0">
                            <Card>
                                <h4 style={{margin: ' 5px 0px 0px 20px'}}>{userData.name} {userData.lastname}</h4>
                                <Card.Header>
                                    <Accordion.Toggle as={Button} variant="link" eventKey="0" >
                                        <span> Compras </span>
                                    </Accordion.Toggle>
                                </Card.Header>
                                <Accordion.Collapse eventKey="0">
                                    <Card.Body> Compras </Card.Body>
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
                    <div>
                        <h1>Mis ordenes</h1>
                        <Nav fill variant="tabs" defaultActiveKey="/home">
                            <Nav.Item>
                                <Nav.Link eventKey="link-1">Carrito</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="link-2">En proceso</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="link-3">Completado</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="link-4">Cancelado</Nav.Link>
                            </Nav.Item>
                        </Nav>
                        <Row style={{ marginTop: "10px" }}>
                            <Table striped bordered hover size="sm" >
                                <thead>
                                    <tr>
                                        <th># Orden</th>
                                        <th>Fecha</th>                                   
                                        <th>Estado</th> 
                                    </tr>
                                </thead>
                                <tbody>
                                    {userData.orders.map(order =>                                                                       
                                        <tr>                                            
                                            <td>{order.id}</td>
                                            <td >{ fecha = order.createdAt.split('T')[0]}</td>
                                            <td>{order.state}</td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                        </Row>
                    </div>
                </Col>
            </Row>
        </div>
    )
}
