import React from "react";

import { Card } from 'react-bootstrap'
import { Button } from 'react-bootstrap'
import { CardDeck } from 'react-bootstrap'
import { useHistory } from 'react-router-dom';
import stImg from './images/swCard.jpg';
import pImg from './images/pCard.png';
import nImg from './images/kakashi.jpg'
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../Redux/Actions/actions";
import Axios from 'axios';
export default function CartitasDeHome() {
  const history = useHistory();
  const dispatch = useDispatch();
  const starwars = async (e) => {
    e.preventDefault();
    const res = await Axios.get(`http://localhost:3001/products/categoria/starwars`)
      .then(res => {
        history.push(`/products/categoria/starwars`)
        const productDist = Object.values(res.data);
        dispatch(getProducts(productDist))
      })
  }
  const pokemon = async (e) => {
    e.preventDefault();
    const res = await Axios.get(`http://localhost:3001/products/categoria/pokemon`)
      .then(res => {
        history.push(`/products/categoria/pokemon`)
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

    <div>
      <div>
      <div style={{textAlign:'center',marginTop:'100px',fontFamily: 'Malgun Gothic Semilight', fontSize: '19px'}}>
      <h1 style={{fontFamily: 'Malgun Gothic Semilight', color: '#D90429', textDecoration:'bold', fontSize: '45px', backgroundColor: 'white', padding: '2vw', width: '30vw', margin: 'auto', borderRadius: '10px'}}>Productos Destacados</h1>
      </div>
      <CardDeck style={{ width: '70vw', margin: 'auto', marginTop: '10vh', display: 'flex', justifyContent: 'space-around' }}>
      <Card style={{ maxWidth: '25vw', boxShadow: '10px 10px 5px 0px rgba(0,0,0,0.35)' }}>
  <Card.Img onClick={starwars} style={{ padding: '20px', cursor: 'pointer' }} variant="top" src={stImg} />
    <Card.Body >
    <Card.Title onClick={starwars} style={{ color: '#D90429'}}>Pochoclera Star Wars</Card.Title>
      <Card.Text style={{ fontFamily: 'Malgun Gothic Semilight', margin:'5px', textAlign:'justify'}}>
      La Estrella de la Muerte tiene el poder suficiente para destruir un planeta entero, está pochoclera de la Estrella De La Muerte, también tiene el poder para hacer el mejor pochoclo de la galaxia. 

      </Card.Text>
    </Card.Body>
    <Card.Footer>
    <h3 style={{ color: '#D90429', textAlign:"center"}}>$7.500</h3>
    </Card.Footer>
  </Card>
  <Card style={{ maxWidth: '25vw', boxShadow: '10px 10px 5px 0px rgba(0,0,0,0.35)' }}>
  <Card.Img onClick={pokemon} style={{ padding: '20px', cursor: 'pointer' }} variant="top" src={pImg} />
    <Card.Body>
      <Card.Title onClick={pokemon} style={{ color: '#D90429'}}>Funko Pikachu</Card.Title>
      <Card.Text style={{ fontFamily: 'Malgun Gothic Semilight', margin:'5px', textAlign:'justify'}}>
      Alucinante Figura POP, de la marca Funko, de unos 10cms de alto. Ideal para fanáticos y coleccionistas, para regalar o regalarse, no podes dejar de tener esta hermosa figura.

      </Card.Text>
    </Card.Body>
    <Card.Footer>
    <h3 style={{ color: '#D90429', textAlign:"center"}}>$2.000</h3>
    </Card.Footer>
  </Card>
  <Card style={{ maxWidth: '25vw', boxShadow: '10px 10px 5px 0px rgba(0,0,0,0.35)' }}>
  <Card.Img onClick={naruto} style={{ padding: '20px', cursor: 'pointer' }} variant="top" src={nImg} />
    <Card.Body>
    <Card.Title onClick={naruto} style={{ color: '#D90429'}}>Funko Kakashi</Card.Title>
    <Card.Text style={{fontFamily: 'Malgun Gothic Semilight', margin:'5px', textAlign:'justify'}}>
      Convertite en el mejor ninja!
                ¡Una colección de figuras única e irrepetible!
                Completa esta impresionante colección de figuras exclusivas en la que se encuentran todos los personajes clave de la popular serie animada.
      </Card.Text>
    </Card.Body>
    <Card.Footer>
    <h3 style={{ color: '#D90429', textAlign:"center"}}>$1.500</h3>
    </Card.Footer>
  </Card>
</CardDeck>
      </div>
    </div>
  )
} 