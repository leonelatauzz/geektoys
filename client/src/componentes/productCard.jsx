import React from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

// se crea diseño de productos en una card utilizando bootstrap
export default function ProductCard(props) {
    const history = useHistory();

    function example(props) {
        return props.stock == 0 ? 'Producto sin stock'
            : props.stock == 1 ? 'Última unidad disponible'
                : props.stock <= 5 ? props.stock + ' unidades disponibles'
                    : '';
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
        <div className="container" >
            <div className="row">
                <div className="col-sm">
                    <div className="card" >
                        <div>
                            <div className="card mb-3" >
                                <div className="row no-gutters">
                                    <div className="col-md-4">
                                        <img src={`http://localhost:3001/uploads/${props.picture}`} className="card-img" alt="..." />
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body">
                                            <h5 className="card-title" value={props.getProduct} ><a onClick={handle}  >{props.name}</a></h5>
                                            <p className="card-text">${props.price}</p>
                                            <p className="card-text"><small className="text-muted"></small></p>
                                            <p className="card-text"><small className="text-muted">{example(props)}</small></p>
                                            <form>
                                                <button onClick={handleEdit} type="submit">Editar</button>
                                            </form>
                                            <button onClick={handleDelete}> Eliminar</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
