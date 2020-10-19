import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import eHeart from './images/emp.png';
import fHeart from './images/cl.png';
import {deliverToCart} from '../Redux/Actions/actions';
import { useHistory } from 'react-router-dom';
import axios from 'axios'


export default function Productos() {
const history= useHistory();
const producItem = useSelector(state => state.productId);
const loggedIn = useSelector(state => state.loggedIn);
const userData = useSelector(state => state.userId);
const activeOrder = useSelector(state => state.activeOrder);
const dispatch= useDispatch();
const [data, setData] = useState({
  fav: false,
  amount: 1
});

const handleEH = (e) => {
  e.preventDefault();
  setData({
      ...data,
      fav: true
  })
}   

const handleFH = (e) => {
  e.preventDefault();
  setData({
      ...data,
      fav: false
  })
}

const sendProduct= (e) =>{
  e.preventDefault();
  alert('Producto agregado al carrito exitosamente!')
  dispatch(deliverToCart(producItem))
}

const addRelation = async(e) => {
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
  }).then(resp => {
    if(resp.data === 'Exito') {
      alert('Producto agregado al carrito exitosamente!')
    }
  })

}

const handleAmount =(e) => {
  if(e.target.value > producItem.stock) {
    alert(`Este producto solo tiene ${producItem.stock} unidades disponibles`)
  }
  setData({
    ...data,
    amount: e.target.value
  })
}

  return (
    <div class="containerProduct">
      <div class="cardProduct">
        <div class="imagenContainer">
          <img class="imagenP"src={`http://localhost:3001/uploads/${producItem.picture}`} />
          <div class="info">
            <h3 class="productName">{producItem.name}</h3>
            <h4 class="productPrice">${producItem.price}</h4>
            <h5 class="productDescription">{producItem.description}</h5>
            
            <div class= 'corazon'  >
            {producItem.stock === 0 ? 
            <div style={{border: '1px solid black', borderRadius:'5px', margin:"30px 0px 0px 70px"}} role="button" tabindex="0"><span style={{padding: '5px'}}>Este producto no tiene stock</span></div> : <span></span> 

            }
            
            {data.fav === false ? <img onClick={handleEH} class='fav' src={eHeart}/> : <img onClick={handleFH} class='fullFav' src={fHeart}/>}
            </div>
            <div class='contCount'>
            {loggedIn === false ? <button style={{width: '150px', margin: '20px 0px 0px 52px'  }} type="button" class="btn btn-success" onClick={sendProduct}>Agregar al Carrito</button> : <button style={{width: '150px', margin: '20px 0px 0px 52px'  }} type="button" class="btn btn-success" onClick={addRelation}>Agregar al Carrito</button>}
            {loggedIn === false ? <span></span> : <input class='counter' type='number' onChange={handleAmount} value={data.amount}></input>}
            </div>
            </div>
          </div>
        </div>
      </div>
    
  )
}







