import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, useHistory } from 'react-router-dom';



export default function Cart(){
  const productsCart= useSelector(state=> state.cart)
  const [data, setData] = useState({
    
  })
   console.log(productsCart);
  return(

<div>
  {productsCart.map(cart => <h5>{cart.name}</h5>)}
</div>

    )
    
}

