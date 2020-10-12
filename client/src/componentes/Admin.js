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
        <div>
            <h2>Dashboard de administrador</h2>

            <div>
                <button onClick={handleP}>Agregar nuevo producto</button>
            </div>
            <div>
                <button onClick={useBton}>Administrar categorías</button>
            </div>
        </div>
    )
}