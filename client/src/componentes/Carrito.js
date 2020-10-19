import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import axios from 'axios'
import { Row, Col, Button } from 'react-bootstrap';
import CardCarrito from './cardCarrito'
import Nat from './navbar'
import Footer from './Footer'

export default function Cart() {
  const dbCart = useSelector(state => state.dbCart)
  let suma = 0;
  dbCart.forEach(element => {
    suma = suma + (element.cart.price * element.cart.amount)
  });

  const [subtotal,setSubtotal] = useState({
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

  return (
    <div>
      <Nat/>
      <h1 className= 'Letrita'style={{ margin: '20px' }}>Mis productos</h1>
      <Row style={{ margin: '40px 200px 0px 200px', border: "none", boxShadow: "none" }}>
        {dbCart.length === 0 ? <div class='nfContainer' style={{ width: '40vw', border: '0.5px solid black', boxShadow: '10px 10px 5px 0px rgba(0,0,0,0.35)', margin: 'auto', marginTop: '80px', borderRadius: '5px' }}>
         <div >
          <h4 style={{display: "flex", justifyContent: 'center', alignItems: 'center', position: 'relative'}}>Tu carrito esta vacío!</h4>
          </div>
        </div> : dbCart.map(p => <CardCarrito
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

      <Row style={{ border: "none", boxShadow: "none", background: '#2B2D42'}}>
        <Col sm={6}>
          <div style={{ display: "flex", justifyContent: 'center', marginTop: '10px', marginBottom: '50px', marginTop: '5px' }}>
            <h3 className= 'Letrita'>Subtotal: ${suma}</h3>
          </div>
        </Col>
        <Col sm={6}>
        {dbCart.length === 0 ? <div></div> : <h4 style={{position:"relative",top:"50px",right:"557px"}}></h4>}
          {dbCart.length === 0 ? <span></span> : <div className='divSubtotal' style={{ display: "flex", justifyContent: 'center', marginTop: '10px', marginBottom: '50px', marginTop: '5px' }}>
            <Button className='Register'>Comprar</Button>{' '}
          </div> }
        </Col>
      </Row>
      <Footer/>
    </div>
  )
}