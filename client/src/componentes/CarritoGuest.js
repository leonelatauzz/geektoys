import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import axios from 'axios'
import { Row, Col, Button } from 'react-bootstrap';


export default function Cart() {
  const loggedIn = useSelector(state => state.loggedIn);
  const cart = useSelector(state => state.cart)
  const userData = useSelector(state => state.userId);
  const activeOrder = useSelector(state => state.activeOrder);
  const [data, setData] = useState({
    products: []
  });
  useEffect(() => {

    setData({
      ...data,
      products: cart
    })

  }, []);

  const upAmount = (e) => {

  }

  const downAmount = (e) => {

  }

  return (
    <div>
      <h1 style={{ margin:'20px'}}>Mis productos</h1>
      <Row style={{ margin: '40px 200px 0px 200px', border: "none", boxShadow: "none" }}>
        {data.products.map(product =>
          <div className='contenedor' style={{ display: "flex" }}>
            <Col sm={8}>
              <div style={{ display: "flex" }}>
                <img style={{ width: "190px", height: "250px", margin: '10px' }} src={`http://localhost:3001/uploads/${product.picture}`} />
                <div style={{ display: "flex", flexDirection: "column", margin: '30px' }}>
                  <h3 style={{ marginBottom: '15px' }}> {product.name} </h3>
                  <p>{product.stock > 0 ? 'Disponible' : 'Producto sin stock'}</p>
                  <p>Cantidad a comprar:</p>
                  <div style={{ display: 'flex' }}>
                  {loggedIn === false ? <span></span> : <p>{product.cart.amount}</p>}
                <div>
                  <button onClick={upAmount}>+</button>
                  <button onClick={downAmount}>-</button>
                </div>
                  </div>
                  <p> <a> Eliminar producto del carrito </a></p>
                </div>
              </div>
            </Col>
            <Col sm={4}>
              <div style={{ display: "flex" }}>
                <div style={{ display: "flex", flexDirection: "column", margin: '30px', marginTop: '70px' }}>
                  <h5 style={{ marginBottom: '15px' }}> Precio del producto: #</h5>
                  <div>
                    <input type="checkbox" id='comprar' />
                    <label for='comprar' style={{ marginLeft: '10px' }}> Incluir a la compra</label>
                  </div>
                </div>
              </div>
            </Col>
            <div style={{ borderBottom: "black solid 1px", position: "absolute", left: "250px", width: "900px" }}></div>
          </div>
        )}
      </Row>

      <Row style={{ border: "none", boxShadow: "none" }}>
        <Col sm={6}>
          <div style={{ display: "flex", justifyContent: 'center', marginTop: '10px', marginBottom: '50px', marginTop: '5px' }}>
            <h3>Subtotal: #</h3>
          </div>
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

/* 

              <div style={{ display: 'flex' }}>
                {loggedIn === false ? <span></span> : <p>{product.cart.amount}</p>}
                <div>
                  <button onClick={upAmount}>+</button>
                  <button onClick={downAmount}>-</button>

                </div>
              </div> */
