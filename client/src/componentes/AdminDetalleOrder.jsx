import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import Axios from 'axios';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';

export default function AdminDetalleOrder() {
    const history = useHistory();
    const orderData = useSelector(state => state.purchaseData)
    const purchaseProducts = useSelector(state => state.purchaseProducts)
    const adressId = useSelector(state => state.adressId);
    const [data, setData] = useState({

    });
    let suma = 0
    purchaseProducts.forEach(element => {
        suma = suma + (element.cart.price * element.cart.amount)
    });

    function titleCase(str) {
        var splitStr = str.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        return splitStr.join(' ');
    }

    const delivered = async (e) => {
        e.preventDefault();
        let json = {
            state: 'entregada'
        }
        const res = await Axios.put(`http://localhost:3001/order/${orderData.id}`, json, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(() => {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Orden editada correctamente',
                showConfirmButton: false,
                timer: 1500
            })
            history.push('/admin/orderlist')
        })
    }

    const canceled = async (e) => {
        e.preventDefault();
        Swal.fire({
            title: '¿Estas seguro?',
            text: "No hay vuelta atras!!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Cancelar Orden'
        }).then(async (alert) => {
            if (alert.isConfirmed === true) {
                let json = {
                    state: 'cancelada'
                }
                const res = await Axios.put(`http://localhost:3001/order/${orderData.id}`, json, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(() => {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Orden cancelada correctamente',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    history.push('/admin/orderlist')
                })
            }
        })
    }

    return (
        <div>
            <div class='card99' style={{ margin: 'auto', marginTop: '15vh' }}>
                <div class='top99'>
                    <h3 class='titu99'>Orden #{orderData.id} - {orderData.state}</h3>
                    <h5>{orderData.updatedAt.split('T')[0]}</h5>
                </div>
                <div class='bot99'>
                    <div class='dIz99'>
                        <h6># Usuario:</h6>
                        <h4 class='titu99'>{orderData.userId}</h4>
                        <h6>Método de entrega:</h6>
                        {orderData.deliveryMethod === 'sucursal' ?
                            <div>
                                <h4 class='titu99'>Retiro en sucursal</h4>
                                <h5>Calle falsa123</h5>
                                <h5>Microcentro - Capital Federal</h5>
                            </div> :
                            <div>
                                <h4 class='titu99'>Delivery a</h4>
                                <h4 class='titu99'>{adressId.firstLine}</h4>
                                <h5>{adressId.secondLine} - {adressId.postalCode}</h5>
                                <h5>{adressId.district} - {adressId.province}</h5>
                            </div>
                        }
                        <h6>Total:</h6>
                        <h4 class='titu99'>${suma}</h4>
                    </div>
                    <div class='dDer99'>
                        <h6>Productos:</h6>
                        {purchaseProducts.map(item =>
                            <div>
                                <h4 class='titu99'>{titleCase(item.name)}</h4>
                                {item.cart.amount == 1 ? <p>{item.cart.amount} unidad</p> : <p>{item.cart.amount} unidades</p>}
                                <h5>${(item.cart.price) * (item.cart.amount)}</h5>
                            </div>
                        )}
                        {orderData.state === 'pagada' &&
                            <div>
                                <button class='DO101' onClick={delivered}>Orden entregada</button>
                                <button class='DO101' onClick={canceled}>Cancelar orden</button>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}