import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import {getCategories} from '../Redux/Actions/actions';
import { useDispatch, useSelector } from "react-redux";
import {getCategoryId} from '../Redux/Actions/actions';
import Swal from 'sweetalert2'
import Nat from './SuperSimpleNavbarAdmin'

export default function AddCategory() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [data, setData] = useState({
        name: "",
        description: "",
        categories: []
    })

    useEffect(() => {
        async function makeRequests() {

            await axios.get(`http://localhost:3001/products/category`)
                .then(res => {
                    setData({
                        ...data,
                        categories: res.data
                    })

                })
        }
        makeRequests();
    }, []);

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
        }).then(async() => {
            const res = await axios.get('http://localhost:3001/products/category')
            .then(res=>{
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Categoria agregada correctamente',
                    showConfirmButton: false,
                    timer: 1500
                  }).then(()=> {
                    dispatch(getCategories(res.data))
                    window.location.reload()

                  })                            
            })
        })
    }

    const handleDelete = async (e) => {
        const valor = e.target.value
        e.preventDefault();
        Swal.fire({
            title: '¿Estas seguro?',
            text: "No habra vuelta atras",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Eliminar'
          }).then(async(result) => {
              if(result.isConfirmed){

                  const res = await axios.delete(`http://localhost:3001/products/category/${valor}`)
                  .then(async() => {
                      const ras = await axios.get('http://localhost:3001/products/category')
                      .then(res=>{
                          dispatch(getCategories(res.data));
                          history.push('/admin/addcategory')
                      })       
                      Swal.fire({
                          position: 'center',
                          icon: 'success',
                          title: 'Categoria eliminada correctamente',
                          showConfirmButton: false,
                          timer: 1500
                        }).then(() => {
                            window.location.reload()
                        })                            
                  })
              }
    
          })
    }


    

    

    const handleEdit = async(e) => {
        e.preventDefault();  
        let pruebina = e.target.value.split("/");
            const res = await axios.get(`http://localhost:3001/products/category/cat/${pruebina[1]}`)
            .then(res=>{ 
                dispatch(getCategoryId(res.data));
                history.push(`/admin/editordelete/cat/${pruebina[0]}`);
          })  
    }


    function titleCase(str) {
        var splitStr = str.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        return splitStr.join(' ');
    }

    
    return (
        <div>
            <Nat/>
            <div className="div_container">
                <div className="categories_existentes" style={{backgroundColor: 'white', boxShadow: '10px 10px 5px 0px rgba(0,0,0,0.35)', border: 'solid gray 0.5px', height: 'min-content'}}>
                    <form className="form">
                        <h3 className="titulo">Nueva categoría:</h3>
                        <label className="label_cat">Nombre de categoria:</label>
                        <input className="inputs1" type='text' placeholder='Nombre de categoria...' name='name' onChange={handlerChange}></input>
                        {data.name.length === 0 && <span style={{ color: 'red' }}>Este campo es requerido</span>}
                        <label className="label_cat">Descripcion:</label>
                        <input className="inputs1" type='text' placeholder='Descripcion...' name='description' onChange={handlerChange} ></input>
                        {data.description.length === 0 && <span style={{ color: 'red' }}>Este campo es requerido</span>}
                        {data.description.length > 0 && data.name.length > 0 && <input className="DO101" style={{margin: 'auto', marginTop: '1vw'}} type='submit' value='Agregar' onClick={handleSubmit}></input>}
                    </form>
                </div>
            </div>
            <div className="categories" style={{backgroundColor: 'white', boxShadow: '10px 10px 5px 0px rgba(0,0,0,0.35)', border: 'solid gray 0.5px', height: 'min-content', width: '25vw', marginTop: '4.7vw'}}>
                <h3> Categorias existentes</h3>
                <div>
                    {data.categories.map((cat) => 
                    <div className="div_categories">
                        <ul className="ul">
                            <li className="li">
                                <a className="link" href={`http://localhost:3000/products/categoria/${cat.name}`} style={{color: "black"}}>{titleCase(cat.name)}</a>
                                <button className="edit"  value={cat.name+"/"+cat.id} onClick={handleEdit} type="submit">Editar</button>
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
