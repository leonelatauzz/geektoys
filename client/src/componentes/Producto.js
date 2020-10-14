import React from 'react';
import { useDispatch, useSelector } from "react-redux";

export default function Productos() {
const producItem = useSelector(state => state.productId);


  return (
    <div class="containerProduct">
      <div class="cardProduct">
        <div class="imagenContainer">
          <img class="imagenP"src={`http://localhost:3001/uploads/${producItem.picture}`} />
          <div class="info">
            <h3 class="productName">{producItem.name}</h3>
            <h4 class="productPrice">${producItem.price}</h4>
            <h5 class="productDescription">{producItem.description}</h5>

            {producItem.stock === 0 ? 
            <div style={{border: '1px solid black', borderRadius:'5px', margin:"30px 0px 0px 70px"}}><span style={{padding: '5px'}}>Este producto no tiene stock</span></div> : <button disabled="true" style={{margin:"30px 0px 0px 70px", width: "100px"}} type="button" class="btn btn-primary">Comprar</button> 

            }
            
            <div id='heart' class='button'>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}







