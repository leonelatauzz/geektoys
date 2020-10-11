import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {BrowserRouter as  Router, Route, useHistory} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

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
            <a class="navbar-brand">
                <img src="https://i.imgur.com/byHLoDk.gif" width="160" height="50" alt="" />
            </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                    <li class="nav-item">
                        <a class="nav-link my-1 mr-sm-2 homE" href="Home">Home <span class="sr-only">(current)</span></a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link my-1 mr-sm-2 lin" href="Products">Productos</a>
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
            <form>
                <div>
                    <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
                    <input class="" name="search" type="text" placeholder="Tu producto..." aria-label="Search" onChange={handleInputChange}></input>
                </div>
            </form>
            <button class="botonete" onClick={handleFormSubmit}>Buscar</button>
        </nav>
      
        <div id="carousel1" class="carousel slide" data-ride="carousel">
            <ol class="carousel-indicators">
                <li data-target="#carousel1" data-slide-to="0" class="active"></li>
                <li data-target="#carousel1" data-slide-to="1"></li>
                <li data-target="#carousel1" data-slide-to="2"></li>
            </ol>
            <div class="carousel-inner">
                <div class="carousel-item active">
                    <img src="https://i1.wp.com/culturageek.com.ar/wp-content/uploads/2017/02/Culturageek.com_.ar-pokemon-21-aniversario-1.jpg?resize=1000%2C667&ssl=1" alt="First slide" widht="1000" height="700"/>
                </div>
               
                <div class="carousel-item">
                    <img src="https://images3.alphacoders.com/114/thumb-1920-11439.png" alt="Second slide" widht="1000" height="700"/>
                </div>
                <div class="carousel-item">
                    <img src="https://i.imgur.com/Jh9qtix.jpeg" alt="Third slide" widht="1000" height="700"/>
                </div>
            </div>
            <a class="carousel-control-prev" href="#carousel1" role="button" data-slide="prev">
                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carousel1" role="button" data-slide="next">
                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                <span class="sr-only">Next</span>
            </a>
        </div>
    </div>
)

}