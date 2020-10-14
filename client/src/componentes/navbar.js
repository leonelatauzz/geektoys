import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, useHistory } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import { getCategories, getProducts } from '../Redux/Actions/actions'



export default function Navbar() {
    let history = useHistory();
    const dispatch = useDispatch();
    const categoria = useSelector(state => state.categories)
    const [busq, setBusq] = useState([]);

    

    const handleChange = async(event) => {
        history.push(`/products/categoria/${event.target.value}`)
        const res = await axios.get(`http://localhost:3001/products/categoria/${event.target.value}`)
        .then(res =>{
            console.log(res.data)
            const resObj = Object.values(res.data)
            dispatch(getProducts(resObj))
        })        
    }

    const handleInputChange = (event) => {
        setBusq(event.target.value.toLowerCase());
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();
        axios.get(`http://localhost:3001/products/search?query=${busq}`)
            .then(res => {
                history.push("/products/search")
                const ObjRes = Object.values(res.data)
                dispatch(getProducts(ObjRes))
            })
       
    }

    const handleP = async(e) => {
        e.preventDefault();
        history.push('/products');
        await axios.get('http://localhost:3001/products/')
        .then(res => {
            dispatch(getProducts(res.data))
        })

    }

    const handleEnter = (e) => {
        e.preventDefault()
        axios.get(`http://localhost:3001/products/search?query=${busq}`)
            .then(res => {
                history.push("/products/search")
                const responseObj = Object.values(res.data)
                dispatch(getProducts(responseObj))
            })
        
    }

    const handleAdmin = (e) => {
        e.preventDefault();
        history.push('/admin')
    }
    
    const handleHome = (e)=> {
        e.preventDefault();
        history.push('/')
    }
   
    useEffect(() => {
        async function makeRequests() {

            await axios.get(`http://localhost:3001/products/category`)
                .then(res => {
                    dispatch(getCategories(res.data))

                })
        }
        makeRequests();
    }, []);
    
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
                            <a class="nav-link my-1 mr-sm-2 homE" href="Dashboard Admin" onClick={handleAdmin}>Dashboard Admin</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link my-1 mr-sm-2 lin" href="Productos" onClick={handleP}>Productos</a>
                        </li>
                        <li className="nav-item dropdown">
                            <select class="custom-select my-1 mr-sm-2 categ" id="inlineFormCustomSelectPref" href="Categorias"  onChange={handleChange}>
                                <option >Categorias</option>
                                {categoria.map(cat => <option value={cat.name} key={cat.id}>{cat.name}</option>)}
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
                        <input className="input" name="search" type="text" placeholder="Tu producto..." aria-label="Search" onChange={handleInputChange}></input>
                    </div>
                </form>
                <button id='searchB' class="botonete" onClick={handleFormSubmit}>Buscar</button>
            </nav>

    )
}


