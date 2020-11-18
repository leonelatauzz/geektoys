import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { getPurchaseData, getOrderProducts, getA } from '../Redux/Actions/actions'
import SuperSimpleNavbarAd from './SuperSimpleNavbarAdmin'

export default function TablaOrden() {
  const dispatch = useDispatch();
  let history = useHistory();
  const activeOrder = useSelector(state => state.activeOrder)

  const [data, setData] = useState({
    orders: [],
    all: false,
    pagadas: false,
    entregadas: false,
    canceladas: false
  });

  useEffect(() => {
    async function makeRequests() {

      await axios.get(`http://localhost:3001/order`)
        .then(res => {
          setData({
            ...data,
            orders: res.data
          })
        })
    }
    makeRequests();
  }, []);

  const getOrderData = async (e) => {
    e.preventDefault();
    console.log(e.target.value)
    var orderId = e.target.value
    const rous = await axios.get(`http://localhost:3001/order/${orderId}`)
      .then(async (resp) => {
        console.log('2')
        dispatch(getPurchaseData(resp.data));
        const rid = await axios.get(`http://localhost:3001/order/cart/${orderId}`)
          .then(async (repo) => {
            console.log('3')
            let products = Object.values(repo.data)
            dispatch(getOrderProducts(products))
            if (resp.data.deliveryMethod === 'sucursal') {
              history.push(`/admin/selectedOrder/${orderId}`)
            } else if (resp.data.deliveryMethod === 'adress') {
              const reis = await axios.get(`http://localhost:3001/user/adress/edit/${resp.data.adressId}`)
                .then(dat => {
                  console.log('4')
                  dispatch(getA(dat.data));
                  history.push(`/admin/selectedOrder/${orderId}`)
                })
            }
          })
      })
  }

  const handleFF = (e) => {
    e.preventDefault();
    setData({
      ...data,
      all: true,
      pagadas: false,
      entregadas: false,
      canceladas: true
    })
  }
  const handlePP = (e) => {
    e.preventDefault();
    setData({
      ...data,
      all: true,
      pagadas: true,
      entregadas: false,
      canceladas: false
    })
  }
  const handleDD = (e) => {
    e.preventDefault();

    setData({
      ...data,
      all: true,
      pagadas: false,
      entregadas: true,
      canceladas: false
    })
  }
  const handleAA = (e) => {
    e.preventDefault();

    setData({
      ...data,
      all: false,
      pagadas: false,
      entregadas: false,
      canceladas: false
    })
  }


  return (

    <div>
       <SuperSimpleNavbarAd />
      <div class='container100'>
        <div class='le100'>
          <h1 class='h1100'>Tabla De Ordenes</h1>
          <div class='RC1_100'>
            <div onClick={handleAA} class='filter100' >
              <h4 class='pRC100'>Todas</h4>
            </div>
            <div onClick={handlePP} class='filter100' >
              <h4 class='pRC100'>Pagadas</h4>
            </div>
            <div onClick={handleDD} class='filter100' >
              <h4 class='pRC100'>Entregadas</h4>
            </div>
            <div onClick={handleFF} class='filter100' >
              <h4 class='pRC100' >Canceladas</h4>
            </div>
          </div>
        </div>
        <div class='tabla100'>
          <div class='head100'>
            <div class='tit100'><h5># Orden</h5></div>
            <div class='tit100'><h5>Estado</h5></div>
            <div class='tit100'><h5># Usuario</h5></div>
          </div>
          <div class='body100'>
            {data.orders.map(order =>
              <div>
                {data.all === false && order.state !== 'carrito' &&
                  <div class='bd100'>
                    <button value={order.id} onClick={getOrderData} class='tbe100'>{order.id}</button>
                    <div class='te100'><h6>{order.state}</h6></div>
                    <div class='te100'><h6>{order.userId}</h6></div>
                  </div>
                }
                {data.pagadas === true && order.state !== 'carrito' && order.state !== 'entregada' && order.state !== 'cancelada' &&
                  <div class='bd100'>
                    <button value={order.id} onClick={getOrderData} class='tbe100'>{order.id}</button>
                    <div class='te100'><h6>{order.state}</h6></div>
                    <div class='te100'><h6>{order.userId}</h6></div>
                  </div>
                }
                {data.entregadas === true && order.state !== 'carrito' && order.state !== 'pagada' && order.state !== 'cancelada' &&
                  <div class='bd100'>
                    <button value={order.id} onClick={getOrderData} class='tbe100'>{order.id}</button>
                    <div class='te100'><h6>{order.state}</h6></div>
                    <div class='te100'><h6>{order.userId}</h6></div>
                  </div>
                }
                {data.canceladas === true && order.state !== 'carrito' && order.state !== 'entregada' && order.state !== 'pagada' &&
                  <div class='bd100'>
                    <button value={order.id} onClick={getOrderData} class='tbe100'>{order.id}</button>
                    <div class='te100'><h6>{order.state}</h6></div>
                    <div class='te100'><h6>{order.userId}</h6></div>
                  </div>
                }
              </div>
            )}
          </div>
        </div>
      </div>
    </div>

  )

}