import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import axios from 'axios';
import Swal from 'sweetalert2'
import { useDispatch } from "react-redux";
import { useHistory, useParams } from 'react-router-dom';
import { getFavorites, getCategories, getToken, getProducts, getDbCart, logOut, getUserInfo, getActiveOrder, resetCart } from '../Redux/Actions/actions'

export default function FormUserDisable() {

    const history = useHistory();
    const params = useParams();
    const dispatch = useDispatch();

    const [data,setData] = useState({
        message: "",
        valoration: "1"
    })

    const change = (e) => {
        e.preventDefault()
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const submit = (e) => {
        e.preventDefault()
        Swal.fire({
            title: '¿estas seguro?',
            text: 'no podras volver a logearte con este usuario',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'si, estoy seguro'
          }).then(async (result) => {
            if (result.isConfirmed) {
                const json = {
                    message: data.message,
                    valoration: data.valoration
                }
                const res = await axios.post(`http://localhost:3001/user/${params.id}/motivo/baja`,json,{
                    headers: {
                        'content-type': 'application/json'
                    }
                })
                .then(async(user)=>{    
                    console.log(user)
                    const res = await axios.put(`http://localhost:3001/user/${params.id}/baja`)
                    .then((message)=>{
                        dispatch(getToken(null))
                        dispatch(logOut())
                        dispatch(getUserInfo([]))
                        dispatch(getActiveOrder([]))
                        dispatch(resetCart())
                        dispatch(getDbCart([]))
                        history.push('/user/login')
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'usuario dado de baja',
                            showConfirmButton: false,
                            timer: 1500
                          })
                    })
                })
            }
          })
       
    }

    return (
        <div>
            <Form>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label style={{fontSize:'22px'}}>Cuéntanos tu experiencia o razón para desactivar la cuenta:</Form.Label>
                    <div>
                    <textarea name="message" onChange={change} style={{width:'600px', height:'100px'}} placeholder="Motivo"></textarea>
                    </div>
                    
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                    <Form.Label style={{fontSize:'22px'}}>Califica tu experiencia</Form.Label>
                    <Form.Control name="valoration" onChange={change} style={{ marginLeft: '50px', width: '100px', height:'40px' }} as="select" className="mr-sm-2" id="inlineFormCustomSelect" custom>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </Form.Control>
                </Form.Group>
                <button onClick={submit} style={{ margin: 'auto', width: '100px'}} class='tbe100' type="submit">Bloquear</button>
            </Form>
        </div>
    )

}
