import React from 'react';
import { useHistory } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';
import pIm from './images/pkmn.mp4';
import stIm from './images/bbf.mp4';
import nIm from './images/nrt.mp4'
import Axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../Redux/Actions/actions"
export default function Carusel() {
  const history = useHistory();
  const dispatch = useDispatch();
  const pokemon = async (e) => {
    e.preventDefault();
    const res = await Axios.get(`http://localhost:3001/products/categoria/pokemon`)
      .then(res => {
        history.push(`/products/categoria/pokemon`)
        const productDist = Object.values(res.data);
        dispatch(getProducts(productDist))
      })
  }
  const starwars = async (e) => {
    e.preventDefault();
    const res = await Axios.get(`http://localhost:3001/products/categoria/starwars`)
      .then(res => {
        history.push(`/products/categoria/starwars`)
        const productDist = Object.values(res.data);
        dispatch(getProducts(productDist))
      })
  }
  const naruto = async (e) => {
    e.preventDefault();
    const res = await Axios.get(`http://localhost:3001/products/categoria/naruto`)
      .then(res => {
        history.push(`/products/categoria/naruto`)
        const productDist = Object.values(res.data);
        dispatch(getProducts(productDist))
      })
  }

  return (
    <Carousel >
      <Carousel.Item interval={800}>
        <div class="view" onClick={starwars} >
          <video muted autoPlay loop style={{width: '100vw', margin: 'auto'}} class="video-fluid" >
            <source src={stIm} type="video/mp4" />
          </video>
          <div class="mask rgba-black-strong"></div>
        </div>
        <div class="carousel-caption">
          <div class="animated fadeInDown">
            <h1 class="h3-responsive">¿Querés ser tan cool como Bobba Fett?</h1>
            <h4>Consigue aquí los mejores productos para ser como él</h4>
          </div>
        </div>
      </Carousel.Item>
      <Carousel.Item interval={800} style={{width: '100vw'}}>
        <div class="view" onClick={pokemon}>
          <video style={{width: '100vw', margin: 'auto'}} class="video-fluid" autoPlay loop muted>
            <source src={pIm} type="video/mp4" />
          </video>
          <div class="mask rgba-black-strong"></div>
        </div>
        <div class="carousel-caption">
          <div class="animated fadeInDown">
            <h1 class="h3-responsive">¿Querés ser un gran maestro Pokémon?</h1>
            <h4>Los mejores productos Pokémon aquí</h4>
          </div>
        </div>
      </Carousel.Item>
      <Carousel.Item interval={800} style={{width: '100vw'}}>
        <div class="view" onClick={naruto}>
          <video style={{width: '100vw', margin: 'auto'}} class="video-fluid" autoPlay loop muted>
            <source src={nIm} type="video/mp4" />
          </video>
          <div class="mask rgba-black-strong"></div>
        </div>
        <div class="carousel-caption">
          <div class="animated fadeInDown">
            <h1 class="h3-responsive">¿Querés ser un Ninja?</h1>
            <h4>Los mejores productos de Naruto</h4>
          </div>
        </div>
      </Carousel.Item>
    </Carousel>
  )
}


