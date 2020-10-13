import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

export default function Categoria(props) {
    let param = useParams()
    const history = useHistory();
    const [data, setData] = useState({
        name: '',
        description: '',
        id: param.id
    })

    useEffect(() => {
        async function makeRequests() {

            await axios.get(`http://localhost:3001/products/category/cat/${data.id}`)
                .then(res => {
                    setData({
                        ...data,
                        name: res.data.name,
                        description: res.data.description
                    })
                })
        }
        makeRequests();

    }, []);

    const json = JSON.stringify({
        name: data.name,
        description: data.description
    });

    const handleForm = async (e) => {
        e.preventDefault()
        const res = await axios.put(`http://localhost:3001/products/category/${data.id}`, json, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            alert('Categoria editada correctamente');
            window.location.replace(`http://localhost:3000/admin/addcategory`);
        })
    }

    const handleChange = (e) => {
        e.preventDefault();
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div>
        <div className="div_container">
            <div className="juan1">
                <form className="form">
                    <h3 className="titulo">Nueva categoría:</h3>
                    <label className="label1">Nombre de categoria:</label>
                    <input className="inputs1" type='text' placeholder='nombre de categoria...' name='name' onChange={handleChange}></input>
                    {data.name.length === 0 && <span style={{ color: 'red' }}>Este campo es requerido</span>}
                    <label className="label1">Descripcion:</label>
                    <input className="inputs1" type='text' placeholder='descripcion...' name='description' onChange={handleChange} ></input>
                    {data.description.length === 0 && <span style={{ color: 'red' }}>Este campo es requerido</span>}
                    <input className="submit1" type='submit' value='Editar' onClick={handleForm}></input>
                </form>
            </div>
        </div>      
    </div>
    )
}