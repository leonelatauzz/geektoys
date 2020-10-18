import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import axios from 'axios'
import { Row, Col, Button } from 'react-bootstrap';
import {removeFromCart} from '../Redux/Actions/actions'


export default function Cart() {
  const loggedIn = useSelector(state => state.loggedIn);
  const cart = useSelector(state => state.cart)
  const userData = useSelector(state => state.userId);
  const activeOrder = useSelector(state => state.activeOrder);
  const dispatch = useDispatch();
  const history = useHistory();
  const [data, setData] = useState({
    products: []
  });
  useEffect(() => {

    setData({
      ...data,
      products: cart
    })

  }, []);


  const handleRegister = (e) =>{
    e.preventDefault();
    history.push('/user/singin')
  }


  const handleLogin = (e) =>{
    e.preventDefault();
    history.push('/user/login')
  }

  return (
    <div>
      <h1 style={{ margin: '20px' }}>Mis productos</h1>
      <Row style={{ margin: '40px 200px 0px 200px', border: "none", boxShadow: "none" }}>
        {data.products.length === 0 ? <div class='nfContainer' style={{ width: '40vw', border: '0.5px solid black', boxShadow: '10px 10px 5px 0px rgba(0,0,0,0.35)', margin: 'auto', marginTop: '80px', borderRadius: '5px' }}>
          <h4 style={{ textAlign: 'center' }}>Tu carrito esta vacío!</h4>
        </div> : data.products.map(product =>
          <div className='contenedor' style={{ display: "flex" }}>
            <Col sm={8}>
              <div style={{ display: "flex" }}>
                <img style={{ width: "190px", height: "250px", margin: '10px' }} src={`http://localhost:3001/uploads/${product.picture}`} />
                <div style={{ display: "flex", flexDirection: "column", margin: '30px' }}>
                  <h3 style={{ marginBottom: '15px' }}> {product.name} </h3>
                  <p>{product.stock > 0 ? 'Disponible' : 'Producto sin stock'}</p>
                  <h5 style={{ marginBottom: '15px' }}> Precio del producto: ${product.price}</h5>
                  <div style={{ display: 'flex' }}>
                    {loggedIn === false ? <span></span> : <p>{product.cart.amount}</p>}
                  </div>
                </div>
              </div>
            </Col>
            <Col sm={4}>
              <div style={{ display: "flex" }}>               
                {/* <button style={{width: '100px', height:'40px', margin:'100px 0px 0px 210px'}} value={product.id} onClick={handDel} class="btn btn-outline-danger">Eliminar</button> */}
              </div>
            </Col>
            <div style={{ borderBottom: "black solid 1px", position: "absolute", left: "250px", width: "900px" }}></div>
          </div>
        )}
      </Row>

      <Row style={{ border: "none", boxShadow: "none", marginTop: '40px' }}>
        <Col sm={6}>
{/*           <div style={{ display: "flex", justifyContent: 'center', marginTop: '10px', marginBottom: '50px', marginTop: '5px' }}>
            <h3>Subtotal: #</h3>
          </div> */}
        </Col>
        <Col sm={6}>
          <div className='divSubtotal' style={{ display: "flex", justifyContent: 'center', marginTop: '10px', marginBottom: '50px', marginTop: '5px' }}>
            <Button onClick={handleRegister} style={{marginRight: '10px'}} variant="info">Registrarse</Button>
            <Button onClick={handleLogin} variant="info">Ingresar</Button>
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
