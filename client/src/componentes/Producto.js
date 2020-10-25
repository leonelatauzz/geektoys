import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import eHeart from './images/emp.png';
import fHeart from './images/cl.png';
import {deliverToCart} from '../Redux/Actions/actions';
import { useHistory } from 'react-router-dom';
import axios from 'axios'
import Swal from 'sweetalert2'


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
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Producto agregado correctamente',
    showConfirmButton: false,
    timer: 1500
  })
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
      Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Producto agregado correctamente',
        showConfirmButton: false,
        timer: 1500
      })
    }
  })

}

  


const handleAmount =(e) => {
  setData({
    ...data,
    amount: e.target.value
  })
}

const handleHome = (e) => {
  e.preventDefault();
  history.push('/products')
}
  return (
    <div class="containerProduct"  style={{backgroundColor:"#2B2D42"}}>
      <div class="cardProduct" style={{backgroundColor:"#2B2D42"}}>
        <div class="imagenContainer">
          <img class="imagenP" width="160" height="50" src={`http://localhost:3001/uploads/${producItem.picture}`}  />
          <div class="info">
            <h3 class="productName">{producItem.name}</h3>
            <h4 class="productPrice">${producItem.price}</h4>
            <h5 class="productDescription">{producItem.description}</h5>
            
            <div class= 'corazon' style={{cursor: 'pointer'}}>
            {producItem.stock === 0 ? 
            <div style={{border: '1px solid black', borderRadius:'5px', margin:"30px 2px 3px 70px"}} ><span style={{cursor: 'pointer'}} style={{padding: '5px'}}>Este producto no tiene stock</span></div> : <span></span> 

            }
            
            {data.fav === false ? <img onClick={handleEH} class='fav' src={eHeart}/> : <img onClick={handleFH} class='fullFav' src={fHeart}/>}
            </div>
            <div class='contCount' className= "union">
            {loggedIn === false ? <span></span>  : <input className='Contadorsin' class='counter' type='number' onChange={handleAmount} value={data.amount}></input>}
            {loggedIn === false ? <button type="button" className="btn4" style={{width: '150px', margin: '20px 0px 0px 20px' }} onClick={sendProduct}>Agregar al Carrito</button> : <button style={{width: '150px', margin: '20px 0px 0px 20px' }} type="button" className="btn4" onClick={addRelation}>Agregar al Carrito</button>}
            <button className="my_butom" onClick={handleHome}>Volver a productos</button>
            </div>
            </div>
          </div>
        </div>
      </div>
    
  )
}







