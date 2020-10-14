import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import {getCategories} from "../Redux/Actions/actions"
export default function Categoria() {
    const categoryEdit = useSelector(state => state.categoryId);
    const dispatch = useDispatch();
    const history = useHistory();
    const [data, setData] = useState({
        name: categoryEdit.name,
        description: categoryEdit.description
        
    })
    
    const json = JSON.stringify({
        name: data.name,
        description: data.description
    });

    const handleForm = async (e) => {
        e.preventDefault()
        if(categoryEdit.id){
            const res = await axios.put(`http://localhost:3001/products/category/${categoryEdit.id}`, json, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(async() => {
                const ras = await axios.get(`http://localhost:3001/products/category`)
                .then(res => {
                    dispatch(getCategories(res.data))
                    alert('Categoria editada correctamente');
                    history.push(`/admin/addcategory`);                              
                })
            
            })
        }
       
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
                    <h3 className="titulo">Editar categoría:</h3>
                    <label className="label1">Nombre de categoria:</label>
                    <input value={data.name} className="inputs1" type='text' placeholder='nombre de categoria...' name='name' onChange={handleChange}></input>
                    {data.name.length === 0 && <span style={{ color: 'red' }}>Este campo es requerido</span>}
                    <label className="label1">Descripcion:</label>
                    <input value={data.description} className="inputs1" type='text' placeholder='descripcion...' name='description' onChange={handleChange} ></input>
                    {data.description.length === 0 && <span style={{ color: 'red' }}>Este campo es requerido</span>}
                    <input className="submit1" type='submit' value='Editar' onClick={handleForm}></input>
                </form>
            </div>
        </div>      
    </div>
    )
}