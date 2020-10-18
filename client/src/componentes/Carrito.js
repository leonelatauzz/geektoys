import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import axios from 'axios'
import { Row, Col, Button } from 'react-bootstrap';
import CardCarrito from './cardCarrito'

export default function Cart() {
  const dbCart = useSelector(state => state.dbCart)
  let suma = 0;
  dbCart.forEach(element => {
    suma = suma + (element.cart.price * element.cart.amount)
  });


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

  return (
    <div>
      <h1 style={{ margin: '20px' }}>Mis productos</h1>
      <Row style={{ margin: '40px 200px 0px 200px', border: "none", boxShadow: "none" }}>
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
      </Row>

      <Row style={{ border: "none", boxShadow: "none" }}>
        <Col sm={6}>
          {/* <div style={{ display: "flex", justifyContent: 'center', marginTop: '10px', marginBottom: '50px', marginTop: '5px' }}>
            <h3>Subtotal: ${suma}</h3>
          </div> */}
        </Col>
        <Col sm={6}>
          <div className='divSubtotal' style={{ display: "flex", justifyContent: 'center', marginTop: '10px', marginBottom: '50px', marginTop: '5px' }}>
            <Button variant="danger">Comprar</Button>{' '}
          </div>
        </Col>
      </Row>
    </div>
  )
}