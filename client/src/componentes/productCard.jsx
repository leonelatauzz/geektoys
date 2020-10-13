import React from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

// se crea diseño de productos en una card utilizando bootstrap
export default function ProductCard(props) {
    const history = useHistory();

    function example(props) {
        return props.stock == 0 ? 'Producto sin stock'
            : props.stock == 1 ? 'Última unidad disponible'
                : props.stock <= 5 ? 'Últimas ' + props.stock + ' unidades disponibles'
                    : props.stock + ' unidades disponibles';
    }

    const handle = (e) => {
        e.preventDefault()
        props.product(props)
        history.push(`/products/prod/${props.id}`);
    }

    const handleEdit = (e) => {
        e.preventDefault()
        props.product(props)
        history.push(`/admin/editordelete/${props.id}`);

    }

    const handleDelete = async (e) => {
        e.preventDefault();
        if (window.confirm('Estas a punto de eliminar este producto! ¿Deseas continuar?')) {
            const res = await axios.delete(`http://localhost:3001/products/${props.id}`)
                .then(async (res) => {
                    await axios.get('http://localhost:3001/products/')
                        .then((res) => {
                            return props.callback(res.data)
                        }).then(() => {
                            alert('Producto eliminado correctamente');
                            history.push('/products')
                        })
                })
        }
    }

    return (
        <div class="container" >
            <div class="row">
                <div class="col-md-4">
                    <img value={props.getProduct} onClick={handle} src={`http://localhost:3001/uploads/${props.picture}`} class="card-img" alt="..." />
                </div>
                <div class="informacion">
                    <h5 class="card-title" value={props.getProduct} ><a onClick={handle}  >{props.name}</a></h5>
                    <p class="card-text-price">${props.price}</p>
                    <p class="card-text"><small className="text-muted">{example(props)}</small></p>
                </div>
                <div class="divBoton">
                <button type="button" class="btn btn-outline-success" onClick={handleEdit}>Editar</button>  
                
                <button type="button" onClick={handleDelete} class="btn btn-outline-danger">Eliminar</button>
                </div>
            </div>
        </div>
    )
}
