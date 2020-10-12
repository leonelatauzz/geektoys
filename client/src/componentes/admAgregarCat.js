import Axios from 'axios';
import React, { useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

export default function AddCategory(props) {
    const history = useHistory();
    const [data, setData] = useState({
        name: "",
        description: ""
    })

    const handlerChange = (event) => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const json = {
            name: data.name,
            description: data.description
        }

        const res = await Axios.post('http://localhost:3001/products/category', json, {
            headers: {
                'Content-Type': 'application/json'
            }

        }).then(() => {
            alert('Categoría creada correctamente');
            window.location.replace('http://localhost:3000/admin/addcategory')
        })
    }

    const handleDelete = async (e) => {
        e.preventDefault();
        if (window.confirm('Estas a punto de eliminar esta categoría! ¿Deseas continuar?')) {
            const res = await axios.delete(`http://localhost:3001/products//category/${e.target.value}`)
                .then(res => {
                    alert('Categoría eliminada correctamente');
                    window.location.replace('http://localhost:3000/admin/addcategory')
                })
        }
    }

    const handleEdit = (e) => {
        e.preventDefault();
        history.push(`/admin/editordelete/cat/${e.target.value}`);
    }

    const clickBtn = (e) => {
        e.preventDefault();
        history.push('/admin')
    }

    return (
        <div>
            <button onClick={clickBtn}>Volver al dashboard</button>
            <div>
                <h3> Categorias existentes</h3>
                {props.categories.map((e) => <p>
                    <a href={`http://localhost:3000/products/categoria/${e.name}`}>
                        {e.name}
                    </a>
                    <button value={e.id} onClick={handleEdit} type="submit">Editar</button>
                    <button value={e.id} onClick={handleDelete}>Eliminar</button>
                </p>
                )
                }
            </div>
            <form>
                <label>Nueva categoría:</label>
                <input type='text' placeholder='nombre de categoria...' name='name' onChange={handlerChange}></input>
                {data.name.length === 0 && <span style={{ color: 'red' }}>Este campo es requerido</span>}
                <input type='text' placeholder='descripcion...' name='description' onChange={handlerChange} ></input>
                {data.description.length === 0 && <span style={{ color: 'red' }}>Este campo es requerido</span>}
                <input type='submit' value='Agregar' onClick={handleSubmit}></input>
            </form>
        </div>
    )

}

