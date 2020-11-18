import React from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { getAProduct, getProducts } from '../Redux/Actions/actions'
import Swal from 'sweetalert2'
import '../componentes/css/productoAdmin.css'


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
        history.push(`/products/prod/admin/${props.id}`);
        dispatch(getAProduct(props))
    }

    const handleEdit = (e) => {
        e.preventDefault()
        history.push(`/admin/editordelete/${props.id}`);
        dispatch(getAProduct(props))

    }

    const handleDelete = async (e) => {
        e.preventDefault();
        Swal.fire({
            title: '¿Estas seguro?',
            text: "No hay vuelta atras!!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Eliminar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axios.delete(`http://localhost:3001/products/${props.id}`)
                    .then(async () => {
                        history.push('/admin/products')
                        await axios.get('http://localhost:3001/products/')
                            .then((res) => {
                                dispatch(getProducts(res.data))
                            })
                    })
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Producto eliminado correctamente',
                    showConfirmButton: false,
                    timer: 1500
                }).then(()=> {
                    window.location.reload()
                })
            }

        })
    }



    const dashboard = (e) => {
        e.preventDefault()
        history.push('/admin')
    }

    const direction = window.location.href
    const direction2 = "http://localhost:3000/admin/products"

    return (

        <div>

            <div>

                <div class="container" >
                    <div class="row" style={{backgroundColor: "white"}}>
                        <div class='style-cards'>
                            <img onClick={handle} src={`http://localhost:3001/uploads/${props.picture}`} class="card-img" style={{margin: 'auto'}} role="button" tabindex="0" alt="..." />
                        </div>
                        <div class="informacion">
                            <a class="card-title" onClick={handle} style={{color: '#D90429'}}  >{props.name}</a>
                            <p class="card-text-price">${props.price}</p>
                            <p class="card-text"><small className="text-muted">{setStock(props)}</small></p>
                        </div>
                        <div class="divBoton" style={{marginBottom: '15px'}}>
                            <button type="button" style={{ marginRight: '10px' }} class="btn btn-outline-success rowi" onClick={handleEdit} >Editar</button>
                            <button type="button" class="btn btn-outline-danger rowi" onClick={handleDelete}  >Eliminar</button>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
