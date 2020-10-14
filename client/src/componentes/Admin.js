import React from 'react';
import { useHistory } from 'react-router-dom';

export default function Admin() {

    const history = useHistory();

    const btnAddProduct = (e) => {
        e.preventDefault();
        history.push('/admin/addproduct')
    }

    const btnAddCategory = (e) => {
        e.preventDefault();
        history.push('/admin/addcategory')
    }

    const btnProducts = (e) => {
        e.preventDefault();
        history.push('/admin/products')
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