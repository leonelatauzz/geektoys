import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {BrowserRouter as  Router, Route, useHistory} from 'react-router-dom'

export default function Navbar (props){
    let history = useHistory();
    const [busq, setBusq] = useState([]);
  
    
    
    const handleChange = (event) => {
        window.location.replace(`http://localhost:3000/products/categoria/${event.target.value}`);
        
    }
    const handleInputChange = (event) => {
        setBusq(event.target.value);

    }

    const handleFormSubmit = (event) => {
        event.preventDefault();
        
        axios.get(`http://localhost:3001/products/search?query=${busq}`)
        .then(res=> {
            props.getState(res.data)

        })
        history.push("/products/search");
        
          

        
    }
    
    
    return (
            <div>
                <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <a class="navbar-brand" href="#">Navbar</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item active">
                        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Link</a>
                    </li>
                    <li className="nav-item dropdown">                       
                        <select class="custom-select my-1 mr-sm-2" id="inlineFormCustomSelectPref" onChange={handleChange}>
                            <option >Categorias</option>
                            {props.categories.map(cat => <option value={cat.name} key={cat.id}>{cat.name}</option>)}
                        </select>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link disabled" href="#">Disabled</a>
                    </li>
                </ul>
                </div>
                <form>
                    <input class="form-control mr-sm-2" type="search" placeholder="Buscar Producto..." aria-label="Search" onChange={handleInputChange}></input>
                    <button class="btn btn-outline-success my-2 my-sm-0" onClick={handleFormSubmit}>Buscar</button>
                </form>
                </nav>
            </div>
        )
    
}