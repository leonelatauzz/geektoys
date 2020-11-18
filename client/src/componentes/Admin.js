import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getCategories, getProducts } from '../Redux/Actions/actions';
import axios from 'axios';
import Nav from 'react-bootstrap/Nav'
import '../componentes/css/Admin.css'
import { Container, Card, Row } from 'react-bootstrap'
import Nat from './SuperSimpleNavbarAdmin'
import Footer from './Footer';


export default function Admin() {
    const dispatch = useDispatch();
    const history = useHistory();

    const btnAddProduct = (e) => {
        e.preventDefault();
        history.push('/admin/addproduct')
    }
    const btnProducts = async (e) => {
        e.preventDefault();
        history.push('/admin/products');
        await axios.get('http://localhost:3001/products/')
            .then(res => {
                dispatch(getProducts(res.data))
            })

    }

    const btnAddCategory = (e) => {
        e.preventDefault();
        history.push('/admin/addcategory')
    }

    const btnOrders = (e) => {
        e.preventDefault();
        history.push('/admin/orderlist')
    }

    const handleHome = (e) => {
        e.preventDefault();
        history.push('/')
    }

    const btnAdmin = (e) => {
        e.preventDefault();
        history.push('/admin/promote')
    }

    return (

        <div>
            <Nat />
            <div className='divPrincipalAdmin' style={{ margin: 'auto' }}>
                <Card className='cardAdmin' style={{ width: '80rem', border: 'solid 1px black', margin: 'auto' }}>
                    <h1 className='textin-welcome'>Administrador</h1>
                    <div className='divAdmin-1' style={{ display: "flex", justifyContent: 'center', margin: '20px' }}>
                        <Card border="danger" style={{ width: '25rem', marginRight: '10px' }}>
                            <Card.Body>
                                <Card.Title style={{ color: '#D90429', margin: 'auto' }} onClick={btnAddProduct} eventKey="Agregar nuevo producto">Agregar nuevo producto</Card.Title>
                            </Card.Body>
                        </Card>

                        <Card border="danger" style={{ width: '25rem', marginRight: '10px' }}>
                            <Card.Body>
                                <Card.Title style={{ color: '#D90429', margin: 'auto' }} onClick={btnAddCategory} eventKey="Administrar categorías">Administrar categorías</Card.Title>

                            </Card.Body>
                        </Card>

                        <Card border="danger" style={{ width: '25rem', marginRight: '10px' }}>
                            <Card.Body>
                                <Card.Title style={{ color: '#D90429', margin: 'auto' }} onClick={btnProducts} eventKey="Productos">Productos</Card.Title>

                            </Card.Body>
                        </Card>

                    </div>
                    <div className='divAdmin-1' style={{ display: "flex", justifyContent: 'center', margin: 'auto', marginBottom: '150px' }}>
                        <Card border="danger" style={{ width: '25rem', marginRight: '10px' }}>
                            <Card.Body>
                                <Card.Title style={{ color: '#D90429', margin: 'auto' }} onClick={btnOrders} eventKey="Tabla de Ordenes">Tabla de ordenes</Card.Title>

                            </Card.Body>
                        </Card>

                        <Card border="danger" style={{ width: '25rem', marginRight: '10px' }}>
                            <Card.Body>
                                <Card.Title style={{ color: '#D90429', margin: 'auto' }} onClick={btnAdmin} eventKey="btnAdmin">Agregar admin</Card.Title>
                            </Card.Body>
                        </Card>

                        <Card border="danger" style={{ width: '25rem', marginRight: '10px' }}>
                            <Card.Body>
                                <Card.Title style={{ color: '#D90429', margin: 'auto' }} onClick={handleHome} eventKey="Home">Home</Card.Title>
                            </Card.Body>
                        </Card>

                    </div>

                </Card>
            </div>
            <Footer />
        </div>
    )
}