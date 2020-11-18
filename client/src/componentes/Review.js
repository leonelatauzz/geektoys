import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {Button } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import StarRating from './rating.js'
import Swal from 'sweetalert2'
import DetalleOrder from './DetalleOrder.jsx'
import SimpleNavbar from './navbar'


export default function Review() {
    const loggedIn= useSelector(state=>state.loggedIn);
    const userData = useSelector(state=>state.userId);
    const dataProduct = useSelector(state=>state.productId)
    const history = useHistory();
    const [data, setData] = useState({
   rating: "",
   description: "",
  })
  
    const handleRegister = (e) =>{
        e.preventDefault();
        history.push('/user/singin')
      }
    
    
      const handleLogin = (e) =>{
        e.preventDefault();
        history.push('/user/login')
      }
      
      const handleCambio= (e)=>{
       setData({ ...data, 
        description:e.target.value})
       
      }
      const handleRating= (e)=>{
        setData({...data,
        rating:e.target.value})
        
      }
      
      const handleChange = async(e)=>{
        e.preventDefault();
        console.log(dataProduct)
        let json = {
           rating:data.rating,
           description:data.description,
           productId:dataProduct,
           userId: userData.id
        }
        const res = await axios.post(`http://localhost:3001/products/${dataProduct}/review`, json, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(reviu=>{
          console.log(reviu)
         if(reviu.data){
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Review agregado correctamente',
            showConfirmButton: false,
            timer: 1500
          })
         }
        })
    }

   
  return (
    <div>

    <SimpleNavbar />
    <div className= "review">
    
    {loggedIn === false ?  <span><label style={{color:"black"}}>Logea para opinar sobre el producto</label><Button onClick={handleRegister} className="Register" style={{marginRight: '10px'}} variant="info">Registrarse</Button>
    <Button onClick={handleLogin} variant="info" className="Register" style={{marginRight: '10px'}}>Ingresar</Button></span> : <div>
        <h1>Opinion sobre el producto</h1>
        <div onClick={handleRating}><StarRating /></div>
      <input style={{width: "300px"}} type="text" value={data.description} onChange={handleCambio}/>
      <button onClick={handleChange} style={{height: "29px" }} type="submit">Enviar</button>
      

    </div>} 
  </div>
  </div>
  );
}