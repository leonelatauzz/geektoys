import React, { useEffect, useState } from 'react';
import { Accordion, Card, Button, Row, Col } from 'react-bootstrap'
import axios from 'axios';
import { BrowserRouter as Router, Route, useHistory, useParams } from 'react-router-dom'
import Nat from './navbar'
import Footer from './Footer';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from "react-redux";
import pokemon from './images/lugia-pokemon-2.webp';
import empUser from './images/empUs.png';
import {getUserInfo} from '../Redux/Actions/actions'


export default function Order() {
    const userData = useSelector(state => state.userId);
    const dispatch = useDispatch();
    const token = useSelector(state => state.token);
    const history = useHistory();
    const params = useParams();
    const [data, setData] = useState({
        edit: false,
        pic: false,
        displayFile: null,
        file: userData.picture,
        name: userData.name,
        lastname: userData.lastname
    })
    let json;

    const handleChange = (event) => {
        setData({
            ...data,
            displayFile: URL.createObjectURL(event.target.files[0]),
            file: event.target.files[0],
            pic: true
        })
    }


    const handleClick = (e) => {
        if (e.target.value === 'ordenes') {
            history.push(`/user/${params.id}/order/${userData.name}/orderUser`)
        }
        if (e.target.value === 'seguridad') {
            history.push(`/user/${params.id}/order/${userData.name}/segurity`)

        }
        /*   if(e.target.value === 'privacidad'){
             history.push(`/user/${params.id}/privacity`)
         } */


    }
    const handleChangeI = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }
    const handleEdit = (e) => {
        e.preventDefault();
        setData({
            ...data,
            edit: true
        })
    }

    if (data.pic === false) {
        json = JSON.stringify({
            name: data.name,
            lastname: data.lastname,
            picture: data.file
        });
    } else if (data.pic === true) {
        json = JSON.stringify({
            name: data.name,
            lastname: data.lastname
        });
    }
    const handleEdited = async (e) => {
        e.preventDefault();
        let dataP;
        if (data.pic === false) {
            dataP = new FormData();
            dataP.append('json', json);
        } else if (data.pic === true) {
            dataP = new FormData();
            let images = data.file
            dataP.append('images', images);
            dataP.append('json', json);
        }

        const res = await axios.put(`http://localhost:3001/user/info/${userData.id}`, dataP, {
            headers: {
                'accept': 'application/json',
                'Content-Type': `multipart/form-data;`,
            }
        }).then(async (res) => {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Usuario editado correctamente',
                showConfirmButton: false,
                timer: 1500
            })
            await axios.get(`http://localhost:3001/user/orders/getOrders`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }).then(reisp => {
                dispatch(getUserInfo(reisp.data))
                setData({
                    ...data,
                    edit: false
                })
            })

        })
        
    }


    return (
        <div>
            <Nat />
            <div class='cont109'>
                {console.log(userData.id)}
                {data.edit === false &&
                    <div class='profCont109'>
                        {console.log(userData.picture)}
                        {userData.picture.length < 2 ? <img src={empUser} class='pic109' /> : <img src={`http://localhost:3001/uploads/${userData.picture}`} class='pic109' />}
                        <h2 class='titu109'>{userData.name} {userData.lastname}</h2>
                        {userData.role === 'Admin' && <h3 style={{textAlign: "center"}}>Administrador</h3>}
                        <button class='btn109' onClick={handleEdit}>Editar</button>
                    </div>
                }
                {data.edit === true &&
                    <div>
                        <form class='profCont109'>
                            <div style={{ display: 'flex' }}>
                                {data.pic === false && userData.picture.length < 2 && <img src={empUser} style={{ maxWidth: "150px", marginTop: '0px', borderRadius: '50px' }} />}
                                {data.pic === false ? <img src={`http://localhost:3001/uploads/${userData.picture}`} style={{ maxWidth: "150px", marginTop: '0px', borderRadius: '50px' }} /> : <img src={data.displayFile} style={{ minHeight: "150px", maxWidth: "150px", marginTop: '0px', borderRadius: '50px' }} />}
                                <input className="img_file" style={{ maxWidth: '150px', maxHeight: '150px', alignSelf: 'center' }} type="file" onChange={handleChange} id="img" name="img" accept="image/*" />
                            </div>
                            <label class='lAS'>Nombre</label>
                            <input class='inAS' name='name' value={data.name} type='text' onChange={handleChangeI}></input>
                            <label class='lAS'>Apellido</label>
                            <input class='inAS' name='lastname' value={data.lastname} type='text' onChange={handleChangeI}></input>
                            <button class='btn109' onClick={handleEdited}>Guardar cambios</button>
                        </form>
                    </div>
                }

                <div class='opCard109' >

                    <div>
                        <Card style={{ display: 'flex', alignItems: 'center', width: '15rem' }}>
                            <Card.Img variant="top" src="https://i.imgur.com/qlmpxcd.png" />
                            <Card.Body >
                                <Card.Title style={{ color: 'red', textAlign: 'center', margin: '1rem', padding: '1rem' }}>Ordenes</Card.Title>
                                <Card.Text style={{ textAlign: 'center', margin: '1rem', padding: '1rem' }}>
                                    Verifica el estado de tus órdenes.
    </Card.Text>
                                <Button style={{ marginLeft: '60px' }} onClick={handleClick} value="ordenes" variant="danger">Ver más</Button>
                            </Card.Body>
                        </Card>
                    </div>
                    {/*                     <div style={{ marginLeft: '50px' }}>
                        <Card style={{ width: '15rem' }}>
                            <Card.Img variant="top" src="https://i.imgur.com/du1UGbF.jpg" />
                            <Card.Body>
                                <Card.Title style={{color:'red', textAlign:'center', margin:'1rem', padding:'1rem'}}>Privacidad</Card.Title>
                                <Card.Text style={{textAlign:'center', margin:'1rem', padding:'1rem'}}>
                                    Detalles de mi información personal.
    </Card.Text>
                                <Button style={{marginLeft: '60px'}} onClick= {handleClick} value="privacidad" variant="danger">Ver más</Button>
                            </Card.Body>
                        </Card>
                    </div> */}
                    <div style={{ marginLeft: '50px' }}>
                        <Card style={{ width: '15rem' }}>
                            <Card.Img variant="top" src="https://i.imgur.com/du1UGbF.jpg" />
                            <Card.Body >
                                <Card.Title style={{ color: 'red', textAlign: 'center', margin: '1rem', padding: '1rem' }}>Seguridad</Card.Title>
                                <Card.Text style={{ textAlign: 'center', margin: '1rem', padding: '1rem' }}>
                                    Actualiza tus datos personales.
    </Card.Text>
                                <Button style={{ marginLeft: '60px' }} onClick={handleClick} value="seguridad" variant="danger">Ver más</Button>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}