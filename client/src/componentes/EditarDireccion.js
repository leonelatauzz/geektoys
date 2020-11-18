import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getAdress } from '../Redux/Actions/actions';
import Swal from 'sweetalert2';
import axios from 'axios';
import SimpleNavbar from './SimpleNavbar';
import Footer from './Footer'

export default function EditarDireccion() {
    const history = useHistory();
    const dispatch = useDispatch();
    const userData = useSelector(state => state.userId);
    const activeOrder = useSelector(state => state.activeOrder);
    const adressId = useSelector(state => state.adressId)
    const [data, setData] = useState({
        firstLine: '',
        secondLine: '',
        province: '',
        district: '',
        postalCode: ''
    })

    useEffect(() => {
        async function makeRequests() {

            await axios.get(`http://localhost:3001/user/adress/edit/${adressId}`)
                .then(res => {
                    setData({
                        ...data,
                        firstLine: res.data.firstLine,
                        secondLine: res.data.secondLine,
                        province: res.data.province,
                        district: res.data.district,
                        postalCode: res.data.postalCode
                    })

                })
        }
        makeRequests();
    }, []);

    const saveA = async (e) => {
        e.preventDefault();
        let json = {
            firstLine: data.firstLine,
            secondLine: data.secondLine,
            province: data.province,
            district: data.district,
            postalCode: data.postalCode
        }
        const res = await Axios.put(`http://localhost:3001/user/editAdress/${userData.id}/${adressId}`, json, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(async (resp) => {
            const ris = await axios.get(`http://localhost:3001/user/adress/${userData.id}`)
                .then(resp => {
                    dispatch(getAdress(resp.data.adresses))
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Dirección editada correctamente',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    history.push(`/checkout/${activeOrder[0].id}/${userData.id}`)
                })
        })
    }

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

    return (
        <div>
            <SimpleNavbar />
            <div class='containerEAS'>
                <div class='formAS'>
                    <form className="form">
                        <h5>Edita tu dirección</h5>
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