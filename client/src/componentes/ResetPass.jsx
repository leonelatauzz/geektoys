import React, { useState } from 'react'
import { Button, Form, Col, Row } from 'react-bootstrap'
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2'



export default function ResetPass() {

    const history = useHistory();
    const params = useParams();


    const [data, setState] = useState({
        password: ''
    })

    const handleChange = (e) => {
        setState({
            ...data,
            password: e.target.value
        })
    }


    const handlSubmit = async (e) => {
        e.preventDefault();
        const json = {
            password: data.password
        }
        const password = await axios.post(`http://localhost:3001/user/${params.id}/passwordReset`, json, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(()=>{
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Contraseña modificada correctamente',
                showConfirmButton: false,
                timer: 1500
              })
        })
    }

    return (
        <div>
            <Form>
            <Form.Group controlId="formBasicEmail">
                    <Form.Label column sm="10">Restablecer contraseña</Form.Label>
                    <Col sm="10">
                        <Form.Control onChange={handleChange} type="password" placeholder="Contraseña nueva" />
                    </Col>
                </Form.Group>
                <button onClick={handlSubmit} style={{margin: 'auto', marginLeft:'25px'}} class='tbe100'>Cambiar</button>{' '}
            </Form>
        </div>
    )


}