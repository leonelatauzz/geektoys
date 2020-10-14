import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import eHeart from './images/emp.png';
import fHeart from './images/cl.png';
import {deliverToCart} from '../Redux/Actions/actions';
import { useHistory } from 'react-router-dom';


export default function Productos() {
const history= useHistory();
const producItem = useSelector(state => state.productId);
const dispatch= useDispatch();
const [data, setData] = useState({
  fav: false
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
  history.push('/carrito/prueba')
  dispatch(deliverToCart(producItem))
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
            
            <div class= 'corazon' >
            {producItem.stock === 0 ? 
            <div style={{border: '1px solid black', borderRadius:'5px', margin:"30px 0px 0px 70px"}}><span style={{padding: '5px'}}>Este producto no tiene stock</span></div> : <button disabled="true" style={{margin:"30px 0px 0px 70px", width: "100px"}} type="button" class="btn btn-primary">Comprar</button> 

            }
            
            {data.fav === false ? <img onClick={handleEH} class='fav' src={eHeart}/> : <img onClick={handleFH} class='fullFav' src={fHeart}/>}
            </div>
            <button style={{width: '150px', margin: '20px 0px 0px 52px'  }} type="button" class="btn btn-success" onClick={sendProduct}>Agregar al Carrito</button>
            </div>
          </div>
        </div>
      </div>
    
  )
}







