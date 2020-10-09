import React, { useEffect, useState } from 'react';
import axios from 'axios'

export default function Navbar (props){
    const [productos, setProductos] = useState([]);
    const [searchbar, setSearchbar] = useState({});
    const [result, setResult] = useState([]);
    
    const handleChange = (event) => {
        window.location.replace(`http://localhost:3000/products/categoria/${event.target.value}`);
        
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(searchbar.searchbar)
        axios.get(`http://localhost:3001/products/search?query=${searchbar.searchbar}`)
        .then(res=> {
            setResult(Object.values(res.data));

        })
        window.location.replace(`http://localhost:3000/products/search`);  

        props.getState(result)
    }
    const handleInputChange = (e) => setSearchbar({
        ...searchbar,
        [e.target.name]: e.target.value
      })


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
                <div>
                    <input name= 'searchbar'  type='text' placeholder='Buscar producto...' onChange={handleInputChange}></input>
                    <input type="submit" value="Buscar" onClick={handleSubmit}></input>
                </div>
                </nav>
            </div>
        )
    
}