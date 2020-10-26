
import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {Button } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import StarRating from './rating.js'
import Swal from 'sweetalert2'
import DetalleOrder from './DetalleOrder.jsx'
import { getReviewProducts } from '../Redux/Actions/actions.js';
export default function ProductReviews(){
    const userData = useSelector(state=>state.userId);
    const dataProduct = useSelector(state=>state.productId)
    const reviewProducts= useSelector(state=>state.review)
    const history = useHistory();
    const dispatch = useDispatch();
  const handleGet = async(e)=>{
      console.log(reviewProducts)
    e.preventDefault();
    const res = await axios.get(`http://localhost:3001/product/review`, {
    }).then(reviu=>{
      console.log(reviu.data)
     dispatch(getReviewProducts(reviu.data))
    })
}
    return(
        
   <div>
        {<button onClick={handleGet}>Reviews</button>?<div>
            <h5>{userData.name} {userData.lastname}</h5>
            <button onClick={handleGet}>Enviar</button>
            <h6>{reviewProducts[0].description}</h6>
        </div>:<h1></h1>}
      

    </div> 
 
    )
}