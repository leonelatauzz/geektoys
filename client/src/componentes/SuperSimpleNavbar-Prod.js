import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo, getActiveOrder} from '../Redux/Actions/actions';
import axios from 'axios'


export default function SuperSimpleNavbar() {
    let history = useHistory();

    const handleHome = (e) => {
        e.preventDefault();
        history.push('/products')
    }

    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light" style={{ display: "flex", justifyContent: 'space-between', borderBottom: '1px black solid', backgroundColor: 'red' }}>
            <a onClick={handleHome} class="navbar-brand">
                <img src="https://i.imgur.com/QUOAdAS.png" width="190vh" height="80vh" alt="" style={{ cursor: 'pointer' }} />
            </a>
        </nav>
    )
}
