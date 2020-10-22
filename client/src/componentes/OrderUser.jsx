import React, { useEffect, useState } from 'react';
import { Nav, Table, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { getPurchaseData, getOrderProducts, getA} from '../Redux/Actions/actions'

export default function OrderUser() {
    const dispatch = useDispatch();
    let history = useHistory();
    const userData = useSelector(state => state.userId);
    let orders = userData.orders.filter(item => item.state !== 'carrito')
    let fecha;

    const getOrderData = async(e) => {
        e.preventDefault();
        var orderId = e.target.value
        const rous = await axios.get(`http://localhost:3001/order/${orderId}`)
            .then(async (resp) => {
                console.log('2')
                dispatch(getPurchaseData(resp.data));
                const rid = await axios.get(`http://localhost:3001/order/cart/${orderId}`)
                    .then(async(repo) => {
                        console.log('3')
                        let products = Object.values(repo.data)
                        dispatch(getOrderProducts(products))
                        if (resp.data.deliveryMethod === 'sucursal') {
                            history.push(`/user/${userData.id}/selectedOrder/${orderId}`)
                        } else if(resp.data.deliveryMethod === 'adress') {
                            const reis = await axios.get(`http://localhost:3001/user/adress/edit/${resp.data.adressId}`)
                            .then(dat => {
                                console.log('4')
                                dispatch(getA(dat.data));
                                history.push(`/user/${userData.id}/selectedOrder/${orderId}`)
                            })
                        }
                    })
            })
    }

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
                <Table striped bordered hover size="sm" class='tabla100' >
                    <thead class='head100'>
                        <tr class='he100'>
                            <th class='tit100'># Orden</th>
                            <th class='tit100'>Fecha</th>
                            <th class='tit100'>Estado</th>
                            <th class='tit100'>Revisar Orden</th>
                        </tr>
                    </thead>
                    <tbody class='body100'>
                        {orders.map(order =>
                        
                            <tr class='bo100'>
                                <td class='te100'>{order.id}</td>
                                <td class='te100'>{fecha = order.createdAt.split('T')[0]}</td>
                                <td class='te100'>{order.state}</td>
                                <button value={order.id} onClick={getOrderData}>prueba</button>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </Row>
        </div>
    )
}