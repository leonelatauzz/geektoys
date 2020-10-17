import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import {getUserInfo, getActiveOrder, logIn} from '../Redux/Actions/actions'
import Swal from 'sweetalert2'

export default function Login() {
    const dispatch = useDispatch();
    const [data, setData] = useState({
        email: "",
        password: ""
    })
    const history = useHistory();

    const inputChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const registrar = (e) => {
        e.preventDefault()
        history.push('/user/singin')
    }

    const handleLogIn = async (e) => {
        Swal.fire({
            title: 'Usuario logueado correctamente',
            width: 600,
            padding: '3em',
            background: 'url("https://i.imgur.com/rU0G3W0.jpeg")',
            backdrop: `
              rgba(0,0,123,0.4)
              url("https://sweetalert2.github.io/images/nyan-cat.gif")
              left top
              no-repeat
            `
          })
        e.preventDefault();
        let json = {
            email: data.email,
            password: data.password
        }
        const res = await axios.post(`http://localhost:3001/user/login`, json, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(resp => {
            let activeOrder = resp.data.orders.filter(ord => ord.state === "carrito")
            dispatch(logIn())
            dispatch(getUserInfo(resp.data));
            dispatch(getActiveOrder(activeOrder))
            history.push('/')
        })
    }

    return (
        <div className="sing_in" >
            <form className="form-sing-in">
                <div class="form-group">
                    <label for="exampleInputEmail1">Email</label>
                    <input type="email" name="email" onChange={inputChange} class="form-control" id="exampleInputEmail1" style={{ width: "350px" }} aria-describedby="emailHelp" placeholder="Enter email" />
                </div>
                <div class="form-group">
                    <label for="exampleInputPassword1">Password</label>
                    <input type="password" name="password" onChange={inputChange} class="form-control" id="exampleInputPassword1" style={{ width: "350px" }} placeholder="Password" />
                </div>
                <div class="form-check">
                    <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                    <label class="form-check-label" for="exampleCheck1">Remember Me</label>
                </div>
                <button type="submit" style={{ marginTop: "12px", height: "35px" }} class="btn btn-primary" onClick={handleLogIn}>Iniciar sesion</button>
                <h5 style={{ marginLeft: "55px", marginTop: "10px" }}>¿Eres nuevo en Geek Toys? </h5>
                <button style={{ marginLeft: "100px", width: "150px", marginTop: "5px" }} onClick={registrar} > Crear cuenta   </button>
            </form>
            <div>
            </div>
        </div>
    )
}