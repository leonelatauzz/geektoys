import React from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getCategories, getProducts } from '../Redux/Actions/actions';
import axios from 'axios';

export default function Admin() {
    const dispatch = useDispatch();
    const history = useHistory();

    const btnAddProduct = (e) => {
        e.preventDefault();
        history.push('/admin/addproduct')
    }
    const btnProducts = async(e) => {
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

   

    
    return (
        <div className="div_conteiner">
            <h2 className="tittle" >Dashboard de administrador</h2>
            <div className="admin" >
                <div>
                    <button className="bot" onClick={btnAddProduct}>Agregar nuevo producto</button>
                </div>
                <div>
                    <button className="bot" onClick={btnAddCategory}>Administrar categorías</button>
                </div>
                <div>
                    <button className="bot" onClick={btnProducts}> Productos</button>
                </div>
            </div>
        </div>
    )
}