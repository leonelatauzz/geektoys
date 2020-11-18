import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from "react-redux";
import Review from "./Review.js"
import Swal from 'sweetalert2'
import { useHistory } from 'react-router-dom';
import { getAProduct } from '../Redux/Actions/actions.js';
import Axios from 'axios';

import Nat from './navbar';

export default function DetalleOrder() {
    const history= useHistory();
    const idProduct = useSelector(state=>state.productId)
    const orderData = useSelector(state => state.purchaseData)
    const purchaseProducts = useSelector(state => state.purchaseProducts)
    const adressId = useSelector(state => state.adressId);
    const userData = useSelector(state => state.userId)
    const dispatch = useDispatch();
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
    const handleButtonClick = async(e) => {
        dispatch(getAProduct(e.target.value))
        history.push(`/review`);
    }
    return (



        <div>
            <Nat />
            <div class='card99' style={{ margin: 'auto', marginTop: '15vh', backgroundColor: "white" }}>
                <div class='top99'>
                    <h3 class='titu99'>Orden #{orderData.id} - {orderData.state}</h3>
                    <h5>{orderData.updatedAt.split('T')[0]}</h5>
                </div>
                <div class='bot99'>
                    <div class='dIz99'>
                        <h6>Nombre:</h6>
                        <h4 class='titu99'>{userData.name}</h4>
                        <h4 class='titu99'>{userData.lastname}</h4>
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
                                <button class='DO101'style={{width: '200px'}} value={item.id} onClick={handleButtonClick}>Agrega tu Opinion</button>        

                              

                            </div>
                        )}
                    </div>
                   
                </div>
                
            </div>
           
           
        </div>
    )
}