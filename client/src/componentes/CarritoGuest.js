import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import axios from 'axios'
import { Row, Col, Button } from 'react-bootstrap';
import { removeFromCart } from '../Redux/Actions/actions'
import Nat from './navbar'
import Footer from './Footer';
import Swal from 'sweetalert2'



export default function Cart() {
  const loggedIn = useSelector(state => state.loggedIn);
  const cart = useSelector(state => state.cart)
  const userData = useSelector(state => state.userId);
  const activeOrder = useSelector(state => state.activeOrder);
  const dispatch = useDispatch();
  const history = useHistory();
  const [data, setData] = useState({
    products: [],

  });
  useEffect(() => {

    setData({
      ...data,
      products: cart
    })

  }, []);



  const handleRegister = (e) => {
    e.preventDefault();
    history.push('/user/singin')
  }


  const handleLogin = (e) => {
    e.preventDefault();
    history.push('/user/login')
  }

  const handDel = (e) => {
    e.preventDefault();
    dispatch(removeFromCart(e.target.value))
    setData({
      ...data,
      products: data.products.filter(item => item.id != e.target.value)
    })
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Producto eliminado correctamente',
      showConfirmButton: true
  })
  }

  return (
    <div>
      <Nat />
      <div class='infoCat102'>
        {data.products.length === 0 && <h1 class='titA102'>Tu carrito esta vacío!</h1>}
        {data.products.length > 0 && <h1 class='titA102'>Mi carrito</h1>}
      </div>
      <div style={{ display: "flex", width: '90vw', margin: 'auto', marginRight: '8vw' }}>
        <div class='leftD' style={{ marginLeft: '6.5vw' }}>
          {data.products.map(product =>
            <div style={{ border: '0.25px gray solid', boxShadow: '10px 10px 5px 0px rgba(0,0,0,0.35)', borderRadius: '8px', width: '40vw', marginBottom: '5vh', display: "flex", justifyContent: 'space-between', marginLeft: '1vw', marginTop: '1vw' }}>
              <img style={{ width: "190px", height: "250px", margin: '10px' }} src={`http://localhost:3001/uploads/${product.picture}`} />
              <div style={{marginTop: '4vh'}}>
                <h2 style={{ color: '#D90429' }}> {product.name} </h2>
                <p>{product.stock > 0 ? 'Disponible' : 'Producto sin stock'}</p>
                <h5 style={{ marginBottom: '15px' }}> Precio: ${product.price}</h5>
                {/* <div style={{ display: 'flex', justifyContent: 'space-evenly', height: '4vh', width: '12vh' }}>
                        {loggedIn === false ? <p style={{fontSize: '2vh', marginTop: '0.5vh'}} id='comprar'>{data.amount}</p> : <p style={{fontSize: '2vh', marginTop: '0.5vh'}} id='comprar'>{data.amount}</p>}
                        <button class='DO101' style={{ width: '4vh', heigth: '3vh', margin: '0', fontSize: '25px' }} for='comprar' value={props.id + '/' + props.cart.amount} onClick={upAmount}>+</button>
                        <button class='DO101' style={{ width: '4vh', heigth: '3vh', margin: '0', fontSize: '25px' }} for='comprar' value={props.id + '/' + props.cart.amount} onClick={downAmount}>-</button>
                    </div> */}
              </div>
              <div style={{ margin: '8.3vh 1vw 0 0' }}>
                {/* <h5 style={{ marginBottom: '15px' }}> Precio: ${product.price}</h5> */}
                <button value={product.id} onClick={handDel} class="btn btn-outline-danger">Eliminar producto</button>
              </div>
            </div>

          )}

        </div>
        <div class='rigthD'>
          <div style={{ margin: '2vh' }}>
            <h3>Inicia sesión para continuar</h3>
          </div>
          <Col sm={6}>
            <div>
              <div class='adressRC' style={{ marginTop: '5vh', width: '10vh' }} onClick={handleLogin}>
                <p class='pRC'>Ingresar</p>
              </div>
              <div class='adressRC' style={{ marginTop: '5vh', width: '10vh' }} onClick={handleRegister}>
                <p class='pRC'>Registrarse</p>
              </div>
            </div>
          </Col>
        </div>
      </div>
      <Footer />
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
