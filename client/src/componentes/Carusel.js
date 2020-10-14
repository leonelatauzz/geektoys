import React from 'react';
import { useHistory } from 'react-router-dom';
import {Carousel} from 'react-bootstrap';
import pIm from './images/pokemonPic.webp';
import stIm from './images/starwarsPic.png';
import nIm from './images/narutoPic.jpeg'
import Axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import {getProducts} from "../Redux/Actions/actions"
export default function Carusel(){
  const history = useHistory();
  const dispatch = useDispatch();
  const pokemon = async(e) => {
    e.preventDefault();
    const res = await Axios.get(`http://localhost:3001/products/categoria/pokemon`)
    .then(res =>{
      history.push(`/products/categoria/pokemon`)
      const productDist = Object.values(res.data);
      dispatch(getProducts(productDist))
    })
  }
  const starwars = async(e) => {
    e.preventDefault();
    const res = await Axios.get(`http://localhost:3001/products/categoria/starwars`)
    .then(res =>{
      history.push(`/products/categoria/starwars`)
      const productDist = Object.values(res.data);
      dispatch(getProducts(productDist))
    })
  }
  const naruto = async(e) => {
    e.preventDefault();
    const res = await Axios.get(`http://localhost:3001/products/categoria/naruto`)
    .then(res =>{
      history.push(`/products/categoria/naruto`)
      const productDist = Object.values(res.data);
      dispatch(getProducts(productDist))
    })
  }
  
  return (
    <Carousel>
    <Carousel.Item interval={1000}>
      <img value="pokemon" onClick={pokemon} src={pIm}  class="d-block w-100" alt="Pokemon"/>
        
      <Carousel.Caption>
        <h3>¿Querés ser un gran maestro Pokémon?</h3>
        <p>Los mejores productos Pokémon aquí</p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item interval={500}>
    <img value="starwars" onClick={starwars} src={stIm} class="d-block w-100" alt="Darth Vader"/>
      
      <Carousel.Caption>
        <h3>¿Ser Darth Vader es tu ideal?</h3>
        <p>Consigue aquí los mejores productos para ser como él</p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img value="naruto" onClick={naruto} src={nIm} class="d-block w-100" alt="Dios Itachi"/>  
      <Carousel.Caption>
        <h3>¿Querés ser un Ninja?</h3>
        <p>Los mejores productos de Naruto</p>
      </Carousel.Caption>
    </Carousel.Item>
  </Carousel>
  )
  }


