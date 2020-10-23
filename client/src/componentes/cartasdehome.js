import React from "react";

import { Card } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import { CardDeck } from 'react-bootstrap'
import { useHistory } from 'react-router-dom';
import stImg from './images/swCard.jpg';
import pImg from './images/pCard.png';
import nImg from './images/nCard.png'
import { useDispatch, useSelector } from "react-redux";
import {getProducts} from "../Redux/Actions/actions";
import Axios from 'axios';
export default function CartitasDeHome () {
  const history = useHistory();
  const dispatch = useDispatch();
  const starwars = async(e) => {
    e.preventDefault();
    const res = await Axios.get(`http://localhost:3001/products/categoria/starwars`)
    .then(res =>{
      history.push(`/products/categoria/starwars`)
      const productDist = Object.values(res.data);
      dispatch(getProducts(productDist))
    })
  }
  const pokemon = async(e) => {
    e.preventDefault();
    const res = await Axios.get(`http://localhost:3001/products/categoria/pokemon`)
    .then(res =>{
      history.push(`/products/categoria/pokemon`)
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

<CardDeck style={{width: '90vw', margin: 'auto', marginTop: '5vh', display: 'flex', justifyContent: 'space-around'}}>
  <Card style={{maxWidth: '25vw', boxShadow: '10px 10px 5px 0px rgba(0,0,0,0.35)'}}>
    <Card.Img onClick={starwars} style={{padding:'20px'}} variant="top" src={stImg} />
    <Card.Body>
      <Card.Title style={{color: '#D90429'}}><h2 role="button" tabindex="0">Pochoclera Star Wars</h2></Card.Title>
      <Card.Text style={{fontFamily:'Malgun Gothic Semilight', fontSize: '19px', textAlign: 'justify'}}>
      PRODUCTO ORIGINAL IMPORTADO DE USA!!
      En las películas de Star Wars, la Estrella de la Muerte tiene el poder suficiente para destruir un planeta entero, está pochoclera de la Estrella De La Muerte, también tiene el poder para hacer el mejor pochoclo de la galaxia. Esta pochoclera Death Star Star Wars, es una opción perfecta para cualquier fan de Star Wars.
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      <h3 style={{color: '#D90429'}}>$30000</h3>
    </Card.Footer>
  </Card>
  <Card style={{maxWidth: '25vw', boxShadow: '10px 10px 5px 0px rgba(0,0,0,0.35)'}}>
    <Card.Img onClick={pokemon} style={{padding:'20px'}} variant="top" src={pImg} />
    <Card.Body>
      <Card.Title style={{marginTop: '30px', color: '#D90429'}}><span role="button" tabindex="0">Funko Pop Pikachu 353</span></Card.Title>
      <Card.Text style={{fontFamily:'Malgun Gothic Semilight', fontSize: '19px', textAlign: 'justify'}}>
      Linea Pop! Games
      Producto Original Funko
      Nuevo y en su Embalaje Original
      Alucinante Figura POP, de la marca Funko, de unos 10cms de alto. Ideal para fanáticos y coleccionistas, para regalar o regalarse, no podes dejar de tener esta hermosa figura. Marca Funko en Caja cerrada, en Excelente estado de conservación, nunca abierta ni exhibida.
      </Card.Text>
    </Card.Body>
    <Card.Footer>
    <h3 style={{color: '#D90429'}}>$2000</h3>
    </Card.Footer>
  </Card>
  <Card style={{maxWidth: '25vw', boxShadow: '10px 10px 5px 0px rgba(0,0,0,0.35)'}}>
    <Card.Img onClick={naruto} style={{padding:'20px'}} variant="top" src={nImg} />
    <Card.Body>
      <Card.Title style={{marginTop: '25px', color: '#D90429'}}><span role="button" tabindex="0">Figura Kakashi Coleccionable</span></Card.Title>
      <Card.Text style={{fontFamily:'Malgun Gothic Semilight', fontSize: '19px', textAlign: 'justify'}}>
        Convertite en el mejor ninja!
        ¡Una colección de figuras única e irrepetible!
        Completa esta impresionante colección de figuras exclusivas en la que se encuentran todos los personajes clave de la popular serie animada. Desde los miembros del equipo 7 hasta las bestias con cola, pasando por los principales aliados de Naruto y los miembros de Akatsuki, entre muchos otros.
      </Card.Text>
    </Card.Body>
    <Card.Footer>
    <h3 style={{color: '#D90429'}}>$1500</h3>
    </Card.Footer>
  </Card>
</CardDeck>
    )
    } 