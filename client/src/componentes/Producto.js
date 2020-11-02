import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import eHeart from './images/emp.png';
import fHeart from './images/cl.png';
import { deliverToCart, getFavorites, getDbCart } from '../Redux/Actions/actions';
import { useHistory } from 'react-router-dom';
import axios from 'axios'
import Swal from 'sweetalert2'
import Nat from './navbar'


export default function Productos() {
  const history = useHistory();
  const producItem = useSelector(state => state.productId);
  const loggedIn = useSelector(state => state.loggedIn);
  const userData = useSelector(state => state.userId);
  const activeOrder = useSelector(state => state.activeOrder);
  const dispatch = useDispatch();
  const [data, setData] = useState({
    fav: false,
    amount: 1
  });
  const [favis, setFavis] = useState([])
  const [favos, setFavos] = useState(false)
  const [faves, setFaves] = useState(false)


  useEffect(() => {
    if (loggedIn === true) {
      async function makeRequests() {

        await axios.get(`http://localhost:3001/products/favorites/${userData.id}`)
          .then(resp => {
            let faves = Object.values(resp.data)
            dispatch(getFavorites(faves))
            setFavis(faves)
          })
      }
      makeRequests();
    }
  }, []);
  let prueba = []
  favis.forEach(it => {
    prueba.push(it.id)
  })

  const handleEH = async (e) => {
    e.preventDefault();
    const res = await axios.post(`http://localhost:3001/products/${producItem.id}/favorites/${userData.id}`)
      .then(async () => {
        const reishh = await axios.get(`http://localhost:3001/products/favorites/${userData.id}`)
          .then(resp => {
            let faves = Object.values(resp.data)
            dispatch(getFavorites(faves));
            setFaves(true);
            setFavos(true);
          })
      })
  }

  const handleFH = async (e) => {
    e.preventDefault();
    const res = await axios.delete(`http://localhost:3001/products/${producItem.id}/favorites/${userData.id}`)
      .then(async () => {
        const reish = await axios.get(`http://localhost:3001/products/favorites/${userData.id}`)
          .then(resp => {
            let faves = Object.values(resp.data)
            dispatch(getFavorites(faves));
            setFaves(true)
            setFavos(false)
          })
      })

  }

  const sendProduct = (e) => {
    e.preventDefault();
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Producto agregado correctamente',
      showConfirmButton: false,
      timer: 1500
    })
    dispatch(deliverToCart(producItem))
  }

  const addRelation = async (e) => {
    e.preventDefault();
    let json = {
      idOrder: activeOrder[0].id,
      idProduct: producItem.id,
      price: producItem.price,
      amount: parseInt(data.amount)
    }
    const res = await axios.post(`http://localhost:3001/user/${userData.id}/cart`, json, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(async (resp) => {
      if (resp.data === 'Exito') {
        const rous = await axios.get(`http://localhost:3001/order/cart/${activeOrder[0].id}`)
          .then(respi => {
            let products = Object.values(respi.data)
            dispatch(getDbCart(products))
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Producto agregado correctamente',
              showConfirmButton: true
            }).then(respou => {
              if (respou.isConfirmed === true) {
                window.location.reload()
              }
            })

          })

      }
    })

  }




  const handleAmount = (e) => {
    setData({
      ...data,
      amount: e.target.value
    })
  }
  function setStock(props) {
    return props.stock == 0 ? 'Producto sin stock'
      : props.stock == 1 ? 'Última unidad disponible'
        : props.stock <= 5 ? 'Últimas ' + props.stock + ' unidades disponibles'
          : props.stock + ' unidades disponibles';
  }


  return (
    <div>
      <Nat />
      <div class="containerProduct">
        <div class="cardProduct" >
          <div class="imagenContainer">
            <img class="imagenP" width="160" height="50" src={`http://localhost:3001/uploads/${producItem.picture}`} />
            <div class="info">
              <h2 class="productName">{producItem.name}</h2>
              <h4 class="productPrice">${producItem.price}</h4>
              <h5 class="productDescription">{producItem.description}</h5>
              <h6 style={{ marginLeft: '70px' }}>{setStock(producItem)}</h6>
              <div class='corazon' style={{ cursor: 'pointer' }}>
                {producItem.stock === 0 ?
                  <div style={{ border: '1px solid black', borderRadius: '5px', margin: "30px 2px 3px 70px" }} ><span style={{ cursor: 'pointer' }} style={{ padding: '5px' }}>Este producto no tiene stock</span></div> : <span></span>

                }
                <div style={{ display: 'flex', height: 'min-content' }}>
                  {loggedIn === false ? <span></span> : <input class='counter' type='number' onChange={handleAmount} value={data.amount}></input>}
                  {loggedIn === true && data.amount == 1 && <span style={{ alignSelf: 'center', marginTop: '30px', marginLeft: '15px' }}>unidad</span>}
                  {loggedIn === true && data.amount > 1 && <span style={{ alignSelf: 'center', marginTop: '30px', marginLeft: '15px' }}>unidades</span>}
                </div>
              </div>
              <div class='contCount'>
                {loggedIn === false ? <button type="button" className="nav-link" style={{ width: '150px', margin: '10px 40px 0px 30px', height: 'min-content' }} onClick={sendProduct}>Agregar al Carrito</button> : <button class='nav-link' style={{ width: '150px', margin: '20px 40px 0px 20px', height: 'min-content' }} type="button" onClick={addRelation}>Agregar al Carrito</button>}
                {loggedIn === true && prueba.includes(producItem.id) && faves === false && <img onClick={handleFH} class='fullFav' src={fHeart} />}
                {loggedIn === true && !(prueba.includes(producItem.id)) && faves === false && <img onClick={handleEH} class='fav' src={eHeart} />}
                {loggedIn === true && faves === true && favos === false && <img onClick={handleEH} class='fav' src={eHeart} />}
                {loggedIn === true && faves === true && favos === true && <img onClick={handleFH} class='fullFav' src={fHeart} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
