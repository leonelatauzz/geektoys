import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getCategories, getProducts } from '../Redux/Actions/actions';
import axios from 'axios';
import Nav from 'react-bootstrap/Nav'
import '../componentes/css/Admin.css'


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
            <div>
                <div className='contaiiner'>
                    <h1 className='textin-welcome'>Administrador</h1>
                    </div>
            </div>
            <div className='Div_centrin'>
                <Nav className="textin">
                    <Nav.Link style={{ color: 'black', background: 'none', border: 'none', boxShadow:'none' }} onClick={btnAddProduct} eventKey="Agregar nuevo producto">Agregar nuevo producto</Nav.Link>
                    <Nav.Link style={{ color: 'black', background: 'none', border: 'none', boxShadow:'none' }} onClick={btnAddCategory} eventKey="Administrar categorías">Administrar categorías</Nav.Link>
                    <Nav.Link style={{ color: 'black', background: 'none', border: 'none', boxShadow:'none' }} onClick={btnProducts} eventKey="Productos">Productos</Nav.Link>
                    <Nav.Link style={{ color: 'black', background: 'none', border: 'none', boxShadow:'none' }} onClick={btnOrders} eventKey="Tabla de Ordenes">Tabla de Ordenes</Nav.Link>
                    <Nav.Link style={{ color: 'black', background: 'none', border: 'none', boxShadow:'none' }} onClick={btnAdmin} eventKey="Home">Agregar Admin</Nav.Link>
                    <Nav.Link style={{ color: 'black', background: 'none', border: 'none', boxShadow:'none' }} onClick={handleHome} eventKey="Home">Home</Nav.Link>
                </Nav>
            </div>
        </div>
    )
}