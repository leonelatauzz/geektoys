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

<CardDeck style={{margin: '30px 10px 10px 10px'}}>
  <Card style={{maxWidth: '450px'}}>
    <Card.Img style={{padding:'20px'}} variant="top" src={stImg}  width= "400" height= "400"/>
    <Card.Body>
      <Button variant="secondary" size="medium" as="a" value="starwars" onClick={starwars} active>Conseguilo acá</Button>
      <Card.Title><span role="button" tabindex="0" style={{fontFamily:'Malgun Gothic', fontWeight:'bold'}}>Pochoclera Star Wars</span></Card.Title>
      <Card.Text style={{fontFamily:'Malgun Gothic'}}>
      PRODUCTO ORIGINAL IMPORTADO DE USA!!
      En las películas de Star Wars, la Estrella de la Muerte tiene el poder suficiente para destruir un planeta entero, está pochoclera de la Estrella De La Muerte, también tiene el poder para hacer el mejor pochoclo de la galaxia. Esta pochoclera Death Star Star Wars, es una opción perfecta para cualquier fan de Star Wars. Sentirás la potencia del lado oscuro, cada vez que uses esta pochoclera divertida y finamente diseñada, para disfrutar los pochoclos frescos, dulces o salados, mientras ves tu película favorita de Star Wars o también solo para exhibir.
      La tapa funciona como bowl contenedor de pochoclos!
      Funciona utilizando aire caliente. Acabado: gris, con escamas metálicas.
      </Card.Text>
    </Card.Body>
    <Card.Footer>
      <medium className="text-muted">Precio $30000</medium>
    </Card.Footer>
  </Card>
  <Card style={{maxWidth: '450px'}}>
    <Card.Img style={{padding:'20px'}} variant="top" src={pImg} width= "400" height= "395"/>
    <Card.Body>
    <Button variant="secondary" size="medium" as="a" value="pokemon" onClick={pokemon} active>Conseguilo acá</Button>
      <Card.Title><span role="button" tabindex="0">Funko Pop Pikachu 353</span></Card.Title>
      <Card.Text style={{fontFamily:'Malgun Gothic Semilight'}}>
      Linea Pop! Games
      Producto Original Funko
      Nuevo y en su Embalaje Original
      Alucinante Figura POP, de la marca Funko, de unos 10cms de alto. Ideal para fanáticos y coleccionistas, para regalar o regalarse, no podes dejar de tener esta hermosa figura. Marca Funko en Caja cerrada, en Excelente estado de conservación, nunca abierta ni exhibida.
      </Card.Text>
    </Card.Body>
    <Card.Footer>
    <medium className="text-muted">Precio $2000</medium>
    </Card.Footer>
  </Card>
  <Card style={{maxWidth: '450px'}}>
    <Card.Img style={{padding:'20px'}} variant="top" src={nImg}  width= "400" height= "400"/>
    <Card.Body>
    <Button variant="secondary" size="medium" as="a" value="naruto" onClick={naruto} active>Conseguilo acá</Button>
      <Card.Title><span role="button" tabindex="0">Figura Gaara mode 185</span></Card.Title>
      <Card.Text>
        Convertite en el mejor ninja!
        ¡Una colección de figuras única e irrepetible!
        Completa esta impresionante colección de figuras exclusivas en la que se encuentran todos los personajes clave de la popular serie animada. Desde los miembros del equipo 7 hasta las bestias con cola, pasando por los principales aliados de Naruto y los miembros de Akatsuki, entre muchos otros.
        Las figuras se han reproducido con todo detalle, respetando los rasgos, vestuario y complementos originales de cada personaje.
        ¡Un póster central en cada entre
      </Card.Text>
    </Card.Body>
    <Card.Footer>
    <medium className="text-muted">Precio $1500</medium>
    </Card.Footer>
  </Card>
</CardDeck>
    )
    } 