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
            <div className="div_container">
                <button className="my_butom" style={{marginLeft: '710px', marginTop: '530px'}} onClick={clickBtn}>Volver al dashboard</button>
                <div className="juan1" style={{marginLeft:'400px'}}>
                    <form className="form">
                        <h3 className="titulo">Nueva categoría:</h3>
                        <label className="label1">Nombre de categoria:</label>
                        <input className="inputs1" type='text' placeholder='nombre de categoria...' name='name' onChange={handlerChange}></input>
                        {data.name.length === 0 && <span style={{ color: 'red' }}>Este campo es requerido</span>}
                        <label className="label1">Descripcion:</label>
                        <input className="inputs1" type='text' placeholder='descripcion...' name='description' onChange={handlerChange} ></input>
                        {data.description.length === 0 && <span style={{ color: 'red' }}>Este campo es requerido</span>}
                        {data.description.length > 0 && data.name.length > 0 && <input className="submit1" type='submit' value='Agregar' onClick={handleSubmit}></input>}
                    </form>
                </div>
            </div>
            <div className="categories">
                <h3> Categorias existentes</h3>
                <div>
                    {props.categories.map((cat) => 
                    <div className="div_categories">
                        <ul className="ul">
                            <li className="li">
                                <a className="link" href={`http://localhost:3000/products/categoria/${cat.name}`}>{cat.name}</a>
                                <button className="edit" value={cat.id} onClick={handleEdit} type="submit">Editar</button>
                                <button className="delete" value={cat.id} onClick={handleDelete}>Eliminar</button>
                            </li>
                        </ul>
                    </div>
                    )
                    }
                </div>
            </div>
        </div>
    )
}

