import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo, getActiveOrder} from '../Redux/Actions/actions';
import axios from 'axios'


export default function SimpleNavbar() {
    let history = useHistory();
    const dispatch = useDispatch()
    const userData = useSelector(state => state.userId);
    const token = useSelector(state => state.token)


    const goDashboard = async (e) => {
        e.preventDefault();
        const res = await axios.get(`http://localhost:3001/user/orders/getOrders`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }).then(respo => {
            let activeOrder = respo.data.orders.filter(ord => ord.state === "carrito")
            dispatch(getUserInfo(respo.data));
            dispatch(getActiveOrder(activeOrder));
        })
        history.push(`/user/${userData.id}/order`)
    }

    const handleHome = (e) => {
        e.preventDefault();
        history.push('/')
    }

    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light" style={{ display: "flex", justifyContent: 'space-between', borderBottom: '1px black solid', backgroundColor: 'red' }}>
            <a onClick={handleHome} class="navbar-brand">
                <img src="https://i.imgur.com/QUOAdAS.png" width="190vh" height="80vh" alt="" style={{ cursor: 'pointer' }} />
            </a>
            <button onClick={goDashboard} class="smButtRC" class='nav-link' >Mi Usuario</button>
        </nav>
    )
}

