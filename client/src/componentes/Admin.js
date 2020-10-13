import React from 'react';
import { useHistory } from 'react-router-dom';

export default function Admin() {
    const history = useHistory();
    const handleP = (e) => {
        e.preventDefault();
        history.push('/admin/addproduct')
    }
    const useBton = (e) => {
        e.preventDefault();
        history.push('/admin/addcategory')
    }

    return (
        <div className="div_conteiner">
            <h2 className="tittle" >Dashboard de administrador</h2>
            <div className="admin" >
                <div>
                    <button className="bot" onClick={handleP}>Agregar nuevo producto</button>
                </div>
                <div>
                    <button className="bot" onClick={useBton}>Administrar categorías</button>
                </div>
            </div>
        </div>
    )
}