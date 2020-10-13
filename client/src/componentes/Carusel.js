import React from 'react';
import { useHistory } from 'react-router-dom';
import {Carousel} from 'react-bootstrap';
import pIm from './images/pokemonPic.webp';
import stIm from './images/starwarsPic.png';
import nIm from './images/narutoPic.jpeg'

export default function Carusel(props){
  const history = useHistory();

  const naruto = (e) => {
    e.preventDefault();
    history.push("/products/categoria/naruto")
    let url = document.location.href.slice(21, document.location.href.length)
    props.categoryCb(url)
  }

  const starwars = (e) => {
    e.preventDefault();
    history.push("/products/categoria/starwars");
    let url = document.location.href.slice(21, document.location.href.length)
    props.categoryCb(url)
  }

  const pokemon = (e) => {
    e.preventDefault();
    history.push("/products/categoria/pokemon")
    let url = document.location.href.slice(21, document.location.href.length)
    props.categoryCb(url)
  }
  return (
    <Carousel>
    <Carousel.Item interval={1000}>
      <img onClick={pokemon} src={pIm}  class="d-block w-100" alt="Pokemon"/>
        
      <Carousel.Caption>
        <h3>¿Querés ser un gran maestro Pokémon?</h3>
        <p>Los mejores productos Pokémon aquí</p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item interval={500}>
    <img onClick={starwars} src={stIm} class="d-block w-100" alt="Darth Vader"/>
      
      <Carousel.Caption>
        <h3>¿Ser Darth Vader es tu ideal?</h3>
        <p>Consigue aquí los mejores productos para ser como él</p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img onClick={naruto} src={nIm} class="d-block w-100" alt="Dios Itachi"/>  
      <Carousel.Caption>
        <h3>¿Querés ser un Ninja?</h3>
        <p>Los mejores productos de Naruto</p>
      </Carousel.Caption>
    </Carousel.Item>
  </Carousel>
  )
  }


