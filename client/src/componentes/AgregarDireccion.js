import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getAdress } from '../Redux/Actions/actions';
import Swal from 'sweetalert2';
import SimpleNavbar from './SimpleNavbar';
import Footer from './Footer'


export default function AgregarDireccion() {
    const history = useHistory();
    const dispatch = useDispatch();
    const userData = useSelector(state => state.userId);
    const activeOrder = useSelector(state => state.activeOrder);
    const [data, setData] = useState({
        firstLine: '',
        secondLine: '',
        province: '',
        district: '',
        postalCode: ''
    })

    const cancel = (e) => {
        e.preventDefault();
        history.push(`/checkout/${activeOrder[0].id}/${userData.id}`)
    }
    const handleChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const saveA = async (e) => {
        e.preventDefault();
        let json = {
            firstLine: data.firstLine,
            secondLine: data.secondLine,
            province: data.province,
            district: data.district,
            postalCode: data.postalCode
        }
        const res = await Axios.post(`http://localhost:3001/user/newAdress/${userData.id}`, json, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(resp => {
            dispatch(getAdress(resp.data.adresses))
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Dirección agregada correctamente',
                showConfirmButton: false,
                timer: 1500
            })
            history.push(`/checkout/${activeOrder[0].id}/${userData.id}`)
        })
    }

    return (
        <div>
            <SimpleNavbar />
            <div class='containerEAS'>
                <div class='formAS'>
                    <form className="form">
                        <h5>Ingresa tu dirección</h5>
                        <label class='lAS'>Calle y número</label>
                        <input class='inAS' name='firstLine' value={data.firstLine} type='text' placeholder='Ejemplo 123' onChange={handleChange}></input>
                        <label class='lAS'>Información adicional</label>
                        <input class='inAS' name='secondLine' value={data.secondLine} type='text' placeholder='Piso, departamento, etc...' onChange={handleChange}></input>
                        <label class='lAS'>Provincia</label>
                        <input class='inAS' name='province' value={data.province} type='text' onChange={handleChange}></input>
                        <label class='lAS'>Barrio / Localidad</label>
                        <input class='inAS' name='district' value={data.district} type='text' onChange={handleChange}></input>
                        <label class='lAS'>Código postal</label>
                        <input class='inAS' name='postalCode' value={data.postalCode} type='text' onChange={handleChange}></input>
                        <input class='btnEAS' type='submit' value='Guardar dirección' onClick={saveA}></input>
                        <input class='btnEAS' type='submit' value='Cancelar' onClick={cancel}></input>
                    </form>
                </div>
            </div>
        </div>
    )
}