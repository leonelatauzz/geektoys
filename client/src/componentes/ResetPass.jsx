import React, { useState, useEffect } from 'react'
import { Button, Form, Col, Row } from 'react-bootstrap'
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2'



export default function ResetPass() {

    const history = useHistory();
    const params = useParams();


    const [data, setState] = useState({
        password: '',
        oldPassword: ''
    })

    const [errors, setErrors] = useState({
        passwordError: true,
        errores: true
    })



    const handleChange = (e) => {
        setState({
            ...data,
            [e.target.name]: e.target.value
        })
    }


    const handlSubmit = async (e) => {
        e.preventDefault();
        const json = {
            oldPassword: data.oldPassword,
            password: data.password
        }
        const password = await axios.post(`http://localhost:3001/user/${params.id}/passwordReset`, json, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((message)=>{
            if(message.status !== 200){
                Swal.fire({
                    position: 'center',
                    icon: 'warning',
                    title: message.data,
                    showConfirmButton: false,
                    timer: 1500
                  })
            } else {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: message.data,
                    showConfirmButton: false,
                    timer: 1500
                  })
            }
        })
    }

    useEffect(()=>{
        if(data.password.length > 1 && errors.passwordError === false){
            setErrors({
                ...errors,
                errores: false
            })
        }else{
            setErrors({
                ...errors,
                errores: true
        
            })
        }
    },[data.password,errors.passwordError])

    useEffect(() => {
        if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(data.password)) {
            setErrors({
                ...errors,
                passwordError: true
            })
        }
        if (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(data.password)) {
            setErrors({
                ...errors,
                passwordError: false
            })
        }
    }, [data.password])

    


    return (
        <div>
            <Form>
            <Form.Group controlId="formBasicEmail">
                    <Form.Label column sm="10" style={{fontSize:'22px'}}>Restablecer contraseña</Form.Label>
                    <Col sm="10">
                        <Form.Control name='oldPassword' onChange={handleChange} type="password" placeholder="Actual contraseña" />
                    </Col>
                    <Col sm="10">
                        <Form.Control name='password' onChange={handleChange} type="password" placeholder="Contraseña nueva" />
                        {errors.passwordError === true ? <small className="detail" style={{fontSize:'15px', color: 'red'}}>Debe tener al menos 6 caracteres, una mayuscula, una minuscula y un numero</small> : <div></div>}
                    </Col>
                </Form.Group>
                <button disabled={errors.errores} onClick={handlSubmit} style={{margin: 'auto', marginLeft:'25px'}} class='tbe100'>Cambiar</button>
            </Form>
        </div>
    )


}