import React from 'react'
import { Accordion, Card, Button, Row, Col, Nav, Table } from 'react-bootstrap'

export default function Order() {


    return (
        <div>
            <Row style={{ margin: "30px", height: "600px", border: "none", boxShadow: "none" }}>
                <Col sm={3}>
                    <div className="div_desplegable">
                        <Accordion defaultActiveKey="0">
                            <Card>
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
                        <Row style={{marginTop:"10px"}}>
                            <Table striped bordered hover size="sm" >
                                <thead>
                                    <tr>
                                        <th># Orden</th>
                                        <th>Fecha</th>
                                        <th>Precio final</th>
                                        <th>Detalle</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>2</td>
                                        <td>10/10/2020</td>
                                        <td>$4000000</td>
                                        <td><a href="http://localhost:3000/user/1/order/1">Ir a detalle de orden</a></td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td>5/10/2020</td>
                                        <td>$40000</td>
                                        <td>Ir a detalle de orden</td>
                                    </tr>
                                    <tr>
                                        <td>4</td>
                                        <td>2/10/2020</td>
                                        <td>$7000</td>
                                        <td>Ir a detalle de orden</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Row>
                    </div>
                </Col>
            </Row>
        </div>
    )
}
