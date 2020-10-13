import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, useHistory } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Navbar(props) {
    let history = useHistory();
    const [busq, setBusq] = useState([]);

    const handleChange = (event) => {
        window.location.replace(`http://localhost:3000/products/categoria/${event.target.value}`);
    }

    const handleInputChange = (event) => {
        setBusq(event.target.value.toLowerCase());
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();
        axios.get(`http://localhost:3001/products/search?query=${busq}`)
            .then(res => {
                props.getState(res.data)
            })
        history.push("/products/search");
    }

    const handleP = (e) => {
        e.preventDefault();
        history.push('/products')
    }

    const handleEnter = (e) => {
        e.preventDefault()
        axios.get(`http://localhost:3001/products/search?query=${busq}`)
            .then(res => {
                props.getState(res.data)
            })
        history.push("/products/search");
    }

    const handleAdmin = (e) => {
        e.preventDefault();
        history.push('/admin')
    }
    
    const handleHome = (e)=> {
        e.preventDefault();
        history.push('/')
    }
    
    return (        
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <a onClick={handleHome} class="navbar-brand">
                    <img src="https://i.imgur.com/byHLoDk.gif" width="160" height="50" alt="" />
                </a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav mr-auto">
                        <li class="nav-item">
                            <a class="nav-link my-1 mr-sm-2 lin" onClick={handleAdmin}>Dashboard Administrador</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link my-1 mr-sm-2 lin" onClick={handleP}>Productos</a>
                        </li>
                        <li className="nav-item dropdown">
                            <select class="custom-select my-1 mr-sm-2 categ" id="inlineFormCustomSelectPref" onChange={handleChange}>
                                <option >Categorias</option>
                                {props.categories.map(cat => <option value={cat.name} key={cat.id}>{cat.name}</option>)}
                            </select>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link disabled" href="#"></a>
                        </li>
                    </ul>
                </div>
                <form onSubmit={handleEnter}>
                    <div>
                        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
                        <input class="" name="search" type="text" placeholder="Tu producto..." aria-label="Search" onChange={handleInputChange}></input>
                    </div>
                </form>
                <button id='searchB' class="botonete" onClick={handleFormSubmit}>Buscar</button>
            </nav>

    )
}