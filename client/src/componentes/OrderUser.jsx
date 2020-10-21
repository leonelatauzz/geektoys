import React from 'react'
import { Nav, Table, Row} from 'react-bootstrap'
import { useSelector } from "react-redux";

export default function OrderUser() {


    const userData = useSelector(state => state.userId);
    let fecha;



    return (
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
                                <td >{fecha = order.createdAt.split('T')[0]}</td>
                                <td>{order.state}</td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </Row>
        </div>
    )
}