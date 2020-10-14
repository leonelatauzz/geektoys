import React from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { getAProduct, getProducts } from '../Redux/Actions/actions'

// se crea diseño de productos en una card utilizando bootstrap
export default function ProductCard(props) {
    const history = useHistory();
    const dispatch = useDispatch();

    function setStock(props) {
        return props.stock == 0 ? 'Producto sin stock'
            : props.stock == 1 ? 'Última unidad disponible'
                : props.stock <= 5 ? 'Últimas ' + props.stock + ' unidades disponibles'
                    : props.stock + ' unidades disponibles';
    }

    const handle = (e) => {
        e.preventDefault()
        history.push(`/products/prod/${props.id}`);
        dispatch(getAProduct(props))
    }

    const handleEdit = (e) => {
        e.preventDefault()
        history.push(`/admin/editordelete/${props.id}`);
        dispatch(getAProduct(props))

    }

    const handleDelete = async (e) => {
        e.preventDefault();
        if (window.confirm('Estas a punto de eliminar este producto! ¿Deseas continuar?')) {
            const res = await axios.delete(`http://localhost:3001/products/${props.id}`)
                .then(async () => {
                    alert('Producto eliminado correctamente');
                    history.push('/admin/products')
                    await axios.get('http://localhost:3001/products/')
                        .then((res) => {
                            dispatch(getProducts(res.data))
                        })
                })
        }
    }

    const dashboard = (e) => {
        e.preventDefault()
        history.push('/admin')
    }

    const direction =  window.location.href
    const direction2 = "http://localhost:3000/admin/products"

    return (
        <div class="container" >
            <div class="row">
                <div class="col-md-4">
                    <img onClick={handle} src={`http://localhost:3001/uploads/${props.picture}`} class="card-img" alt="..." />
                </div>
                <div class="informacion">
                    <a class="card-title" onClick={handle}  >{props.name}</a>
                    <p class="card-text-price">${props.price}</p>
                    <p class="card-text"><small className="text-muted">{setStock(props)}</small></p>
                </div>
                <div class="divBoton">
                <button type="button" class="btn btn-outline-success" onClick={handleEdit}>Editar</button>  
                
                <button type="button" onClick={handleDelete} class="btn btn-outline-danger">Eliminar</button>
        

                        

                </div>
            </div>
        </div>
    )
}
