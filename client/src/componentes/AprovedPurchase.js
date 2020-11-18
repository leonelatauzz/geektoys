import React, { useEffect, useState } from 'react';
import SimpleNavbar from './SimpleNavbar'
import { useDispatch, useSelector } from "react-redux";
import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';
import Nat from './navbar'

export default function AprovedPurchase() {
    const pData = useSelector(state => state.purchaseData);
    let utc = new Date().toJSON().slice(0, 10).replace(/-/g, '/');

    function titleCase(str) {
        var splitStr = str.toLowerCase().split(' ');
        console.log(splitStr)
        for (var i = 0; i < splitStr.length; i++) {
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        return splitStr.join(' ');
    }

    return (
        <div >
            <Nat />
            <div class='container99'>
                <div class='cont99'>
                <h1 class='TT99'>Muchas gracias por tu compra!</h1>
                <h4>Una copia de tu recibo te llegará al mail {pData.user.email}, tambien puedes ver y gestionar la compra en tu perfil.</h4>
                </div>
                <div class='card99' style={{backgroundColor: 'white'}}>
                    <div class='top99'>
                        <h3 class='titu99'>Orden #{pData.order}</h3>
                        <h5>{utc}</h5>
                    </div>
                    <div class='bot99'>
                        <div class='dIz99'>
                            <h6>Nombre:</h6>
                            <h4 class='titu99'>{pData.user.name}</h4>
                            <h4 class='titu99'>{pData.user.lastname}</h4>
                            <h6>Método de entrega:</h6>
                            {pData.deliveryMethod === 'sucursal' ?
                                <div>
                                    <h4 class='titu99'>Retiro en sucursal</h4>
                                    <h5>Calle falsa123</h5>
                                    <h5>Microcentro - Capital Federal</h5>
                                    <h5>Lunes a Viernes, 9:00 a 18:00</h5>
                                </div> :
                                <div>
                                    <h4 class='titu99'>Delivery a</h4>
                                    <h4 class='titu99'>{pData.adress.firstLine}</h4>
                                    <h5>{pData.adress.secondLine} - {pData.adress.postalCode}</h5>
                                    <h5>{pData.adress.district} - {pData.adress.province}</h5>
                                </div>
                            }
                            <h6>Total:</h6>
                            <h4 class='titu99'>${pData.total}</h4>
                        </div>
                        <div class='dDer99'>
                            <h6>Productos:</h6>
                            {pData.products.map(item =>
                                <div>
                                    <h4 class='titu99'>{titleCase(item.name)}</h4>
                                    {item.cart.amount == 1 ? <p>{item.cart.amount} unidad</p> : <p>{item.cart.amount} unidades</p>}
                                    <h5>${(item.cart.price) * (item.cart.amount)}</h5>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
} 