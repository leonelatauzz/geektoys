import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import axios from 'axios'
import { Row, Col, Button } from 'react-bootstrap';
import CardCarrito from './cardCarrito'
import Nat from './navbar'
import Footer from './Footer';
import { getAdress } from '../Redux/Actions/actions'

export default function Cart() {
  const history = useHistory();
  const dispatch = useDispatch();
  const userData = useSelector(state => state.userId)
  const dbCart = useSelector(state => state.dbCart)
  const activeOrder = useSelector(state => state.activeOrder)
  let suma = 0;
  let count = 0;
  dbCart.forEach(element => {
    suma = suma + (element.cart.price * element.cart.amount)
    count = count + element.cart.amount
  });


  const [subtotal, setSubtotal] = useState({
    total: 0
  })



  function titleCase(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
      splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(' ');
  }


  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const handleBuy = async (e) => {
    e.preventDefault();
    history.push(`/checkout/${activeOrder[0].id}/${userData.id}`)
  }

  return (
    <div>
      <Nat />
      <div class='infoCat102'>
        {dbCart.length === 0 && <h1 class='titA102'>Tu carrito esta vacío!</h1>}
        {dbCart.length > 0 && <h1 class='titA102'>Mi carrito</h1>}
      </div>
      <div style={{ display: "flex", width: '90vw', margin: 'auto', marginRight: '8vw' }}>
        <div class='leftD' style={{ marginLeft: '6.5vw' }}>
          {dbCart.map(p => <CardCarrito
            key={p.id}
            id={p.id}
            name={titleCase(p.name)}
            description={capitalizeFirstLetter(p.description)}
            picture={p.picture}
            price={p.price}
            stock={p.stock}
            cart={p.cart}
          />)}
        </div>

        <div class='rigthD'>
          <div style={{ margin: '2vh' }}>
            <h3>{count} productos</h3>
            <h1 style={{ color: '#D90429' }}>Subtotal: ${suma}</h1>

          </div>
          <Col sm={6}>
            {dbCart.length === 0 ? <span></span> :
              <div class='adressRC' style={{ marginTop: '5vh', width: '10vh' }} onClick={handleBuy}>
                <p class='pRC'>Comprar</p>
              </div>
            }
          </Col>
        </div>
      </div>
      <Footer />
    </div>
  )
}