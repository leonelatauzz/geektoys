import React from 'react';

import {Carousel} from 'react-bootstrap'

export default function Carusel(props){
  return (
    <Carousel>
    <Carousel.Item interval={1000}>
      <img
        src="https://images3.alphacoders.com/114/thumb-1920-11439.png" class="d-block w-100" alt="Darth Vader"/>
        
      <Carousel.Caption>
        <h3>First slide label</h3>
        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item interval={500}>
    <img src="https://i1.wp.com/culturageek.com.ar/wp-content/uploads/2017/02/Culturageek.com_.ar-pokemon-21-aniversario-1.jpg?resize=1000%2C667&ssl=1" class="d-block w-100" alt="Pokemon"/>
      
      <Carousel.Caption>
        <h3>Second slide label</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </Carousel.Caption>
    </Carousel.Item>
    <Carousel.Item>
      <img
          src="https://i.imgur.com/Jh9qtix.jpeg" class="d-block w-100" alt="Dios Itachi"/>  
      <Carousel.Caption>
        <h3>¿Querés ser un Ninja?</h3>
        <p>Los mejores productos de Naruto</p>
      </Carousel.Caption>
    </Carousel.Item>
  </Carousel>
  )
  }


