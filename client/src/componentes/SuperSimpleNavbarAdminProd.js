import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, useHistory } from 'react-router-dom'



export default function SuperSimpleNavbarAdmin() {
    let history = useHistory();

    const handleHome = (e) => {
        e.preventDefault();
        history.push('/Admin')
    }

    const handleB = (e) => {
        e.preventDefault();
        history.push('/admin/products')
      }

    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light" style={{ display: "flex", justifyContent: 'space-between', borderBottom: '1px black solid', backgroundColor: 'red' }}>
            <a onClick={handleHome} class="navbar-brand">
                <img src="https://i.imgur.com/QUOAdAS.png" width="190vh" height="80vh" alt="" style={{ cursor: 'pointer' }} />
            </a>
            <a class="nav-item">
            <button class="nav-link" style={{color: '#D90429', marginLeft: '2vw', cursor:'pointer'}} onClick={handleB} >Volver a Productos</button>
            </a>
        </nav>
    )
}