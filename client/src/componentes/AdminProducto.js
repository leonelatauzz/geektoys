import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';

export default function Productos() {
  const history = useHistory();
  const producItem = useSelector(state => state.productId);

const handleB = (e) => {
  e.preventDefault();
  history.push('/admin')
}

  return (
    <div>
        
    <div class="containerProduct">
    <button style={{marginLeft: '950px', marginTop:'20px'}} className="my_butom" onClick={handleB}>Volver al dashboard</button>
      <div class="cardProduct">
        <div class="imagenContainer">
          <div class="imagenProduct">
            <img class="imagenP"src={`http://localhost:3001/uploads/${producItem.picture}`} />
          </div>
          <div class="info">
            <h3 class="productName">{producItem.name}</h3>
            <h4 class="productPrice">${producItem.price}</h4>
            <h5 class="productDescription">{producItem.description}</h5>

            
            
            <div id='heart' class='button' role="button" tabindex="0" >
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}







