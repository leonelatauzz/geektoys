import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo, getActiveOrder} from '../Redux/Actions/actions';
import axios from 'axios'


export default function SuperSimpleNavbarAd() {
    let history = useHistory();

    const goDashboard = (e) => {
        e.preventDefault();
        history.push('/admin')
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
            <button onClick={goDashboard} class="smButtRC" class='nav-link' >Dashboard</button>
        </nav>
    )
}
