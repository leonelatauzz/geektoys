import React, { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import {getUserInfo, getActiveOrder, logIn} from '../Redux/Actions/actions'
import { Modal, Button } from 'react-bootstrap'

export default function Registro() {
    let history = useHistory();
    const dispatch = useDispatch();
    const [data, setData] = useState({
        name: "",
        lastName: "",
        email: "",
        password: "",
        check: false
    })

    const [lgShow, setLgShow] = useState(false);
    const [smShow, setSmShow] = useState(false);

    const [errors, setErrors] = useState({
        emailError: "",
        passwordError: true,
        nameError:"",
        lastnameError: ""
    })

    const check = (e) => {
        if (e.target.checked === true) {
            setData({
                ...data,
                check: true
            })
        } else {
            setData({
                ...data,
                check: false
            })
        }
    }

    const inputsChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    useEffect(() => {
        if (data.name.length > 3 && data.lastName.length > 3 && data.check === true && data.email.length > 1 && !errors.emailError && data.password.length > 1 && !errors.passwordError && !errors.lastnameError && !errors.nameError) {
            setErrors({
                ...errors,
                errores: false
            })
        } else {
            setErrors({
                ...errors,
                errores: true
            })
        }
    }, [data.name, data.lastName, data.email, data.password, data.check, errors.emailError, errors.passwordError, errors.nameError,errors.lastnameError])
    
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

    useEffect(() => {
        if (!/\S+@\S+\.\S+/.test(data.email)) {
            setErrors({
                ...errors,
                emailError: "El email ingresado no es valido",

            })
        }
        if (/\S+@\S+\.\S+/.test(data.email)) {
            setErrors({
                ...errors,
                emailError: "",
            })
        }
    }, [data.email])

    useEffect(() => {
        if (/[$%&|{}.,()+-<>?¿'"!¡#]/.test(data.lastName)) {
            setErrors({
                ...errors,
                lastnameError: "no se aceptan caracteres especiales"
            })
        }
        if (!/[$%&|{}.,()+-<>?¿'"!¡#]/.test(data.lastName)) {
            setErrors({
                ...errors,
                lastnameError: ""
            })
        }
    }, [data.lastName])

    useEffect(() => {
        if (/[$%&|{}.,()+-<>?¿'"!¡#]/.test(data.name)) {
            setErrors({
                ...errors,
                nameError: "no se aceptan caracteres especiales"
            })
        }
        if (!/[$%&|{}.,()+-<>?¿'"!¡#]/.test(data.name)) {
            setErrors({
                ...errors,
                nameError: ""
            })
        }
    }, [data.name])

    const handleRegister = async(e)=>{
        e.preventDefault();
        let json ={
            name: data.name,
            lastname: data.lastName,
            email: data.email,
            password: data.password
        }
        const res = await axios.post('http://localhost:3001/user', json, {
            headers: {
                'Content-Type': 'application/json'
            }

        }).then(async(resp) =>{
            if(typeof(resp.data)==="string"){
                alert("Ya existe un usuario con este email")
            }
            dispatch(getUserInfo(resp.data))
            dispatch(logIn())
            const ras = await axios.post(`http://localhost:3001/order/${resp.data.id}`)
            .then(orden => {
                let ord = [];
                ord.push(orden.data)
                dispatch(getActiveOrder(ord))
            })
            alert("Usuario registrado exitosamente")
             history.push(`/user/${resp.data.id}`)
        })

    }

    return (
        <div className="sing_in">
            <form className="form-sing-in">
                <div class="form-group">
                    <label >Name</label>
                    <input name="name" onChange={inputsChange} type="text" class="form-control" style={{ color: "black", width: "450px" }} placeholder="ingresar nombre" />
                    <small className="detail">{errors.nameError}</small>
                </div>
                <div class="form-group">
                    <label >Lastname</label>
                    <input name="lastName" onChange={inputsChange} type="text" class="form-control" style={{ color: "black", width: "450px" }} placeholder="ingresa apellido" />
                    <small className="detail">{errors.lastnameError}</small>
                </div>
                <div class="form-group">
                    <label >Email address</label>
                    <input name="email" onChange={inputsChange} type="email" class="form-control" style={{ color: "black", width: "450px" }} aria-describedby="emailHelp" placeholder="Enter email" />
                    {data.email.length > 0 ? <small id="emailHelp" class="detail" >{errors.emailError}</small> : <div></div>}
                </div>
                <div class="form-group">
                    <label >Password</label>
                    <input name="password" onChange={inputsChange} type="password" class="form-control" style={{ color: "black", width: "450px" }} placeholder="Password" />
                    {errors.passwordError === true ? <small className="detail">Debe tener al menos 6 caracteres, una mayuscula, una minuscula y un numero</small> : <div></div>}
                </div>
                <div>
                    <input type="checkbox" onChange={check} />
                    <div>
                        <>
                            <Button onClick={() => setLgShow(true)} style={{ backgroundColor: "white", width: "250px", padding: "0px", color: "black", border: "none", position: "relative", bottom: "27px", left: "18px",boxShadow:"none",textDecoration:"none" }}>Acepto los <a className="links_terminos">terminos y condiciones</a></Button>
                            <Modal
                                size="sm"
                                show={smShow}
                                onHide={() => setSmShow(false)}
                                aria-labelledby="example-modal-sizes-title-sm"
                            >
                                <Modal.Header closeButton>
                                    <Modal.Title id="example-modal-sizes-title-sm">
                                        Small Modal
                            </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>...</Modal.Body>
                            </Modal>
                            <Modal
                                size="lg"
                                show={lgShow}
                                onHide={() => setLgShow(false)}
                                aria-labelledby="example-modal-sizes-title-lg"
                            >
                                <Modal.Header closeButton>
                                    <Modal.Title id="example-modal-sizes-title-lg">
                                        Terminos de condiciones
                                    </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    Los Términos y Condiciones así como la Política de Privacidad y/o informaciones sobre el Sitio se considerarán de aplicación para todo Usuario del
                                    Sitio desde el primer momento en que acceda al mismo. Los presentes términos y condiciones tienen carácter obligatorio y vinculante. Se aplican a
                                    todas las compras y actividades realizadas en el Sitio. Si el Usuario no acepta en forma total los presentes Términos y Condiciones y la Política
                                    de Privacidad, le rogamos que no avance en el acceso y visita de nuestro Sitio. En caso de avanzar en la visita a nuestro Sitio, se entenderá que
                                    el Usuario aceptó sin reservas los presentes Términos y Condiciones y la Política de Privacidad, aceptando recibir mails periódicos con la
                                    información que el Sitio determine. Los Términos y Condiciones y la Política de Privacidad podrán ser modificados en todo o en parte en cualquier
                                    momento y a exclusivo criterio de GEEKTOYS S.A.; dichos cambios e implementaciones tendrán vigencia a partir del momento mismo en que sean publicados
                                    o insertados en el Sitio o desde que sean notificados al Usuario por cualquier medio, lo que ocurra primero. Por lo expuesto, le sugerimos que los
                                    visite periódicamente. Las violaciones a los Términos y Condiciones generarán el derecho en favor del titular del Sitio a suspender o terminar la
                                    prestación del servicio al Usuario que las haya realizado, por acción u omisión. El Sitio se preocupa por la protección de datos de carácter
                                    personal de los Usuarios, de acuerdo a los lineamientos expuestos en nuestra Política de Privacidad.
                                </Modal.Body>
                            </Modal>
                        </>
                    </div>
                </div>
                <button onClick={handleRegister} disabled={errors.errores} requiered type="submit" class="btn btn-primary">Registrar</button>
            </form>
        </div>
    )
}


{/* <div class="alert alert-success" role="alert">
  <h4 class="alert-heading">Well done!</h4>
  <p>Aww yeah, you successfully read this important alert message. This example text is going to run a bit longer so that you can see how spacing within an alert works with this kind of content.</p>
  <hr>
  <p class="mb-0">Whenever you need to, be sure to use margin utilities to keep things nice and tidy.</p>
</div> */}