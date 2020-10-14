import React from 'react';
import { useDispatch, useSelector } from "react-redux";

export default function Productos() {
const producItem = useSelector(state => state.productId);


  return (
    <div class="containerProduct">
      <div class="cardProduct">
        <div class="imagenContainer">
          <div class="imagenProduct">
            <img class="imagenP"src={`http://localhost:3001/uploads/${producItem.picture}`} />
          </div>
          <div class="info">
            <h3 class="productName">{producItem.name}</h3>
            <h4 class="productPrice">${producItem.price}</h4>
            <h5 class="productDescription">{producItem.description}</h5>
            <button style={{margin:"30px 0px 0px 70px", width: "100px"}} type="button" class="btn btn-primary">Comprar</button>
            <div id='heart' class='button'>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}







