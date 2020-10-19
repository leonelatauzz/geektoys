import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios';
import { useHistory } from 'react-router-dom';

export default function TablaOrden(){
  const history = useHistory();
  
  const [data, setData] = useState({
    orders: []
  });

  useEffect(() => {
    async function makeRequests() {

        await axios.get(`http://localhost:3001/order`)
            .then(res => {              
              setData({
                ...data,
                orders: res.data
              })
            })
    }
    makeRequests();
}, []);

const handleB = (e) => {
  e.preventDefault();
  history.push('/admin')
}

return(

  <div class= 'containerTabla' >
            <button style={{marginLeft: '950px', marginTop:'20px'}} className="my_butom" onClick={handleB}>Volver al dashboard</button>   
       <div class = 'tablaO' >
           <div class = 'headerTabla'>

             <div class = 'headerI'>  <h6 class= 'headerT'> Número de Orden </h6> </div>
             <div class = 'headerII'>  <h6 class= 'headerT'> Estado de Orden </h6> </div>
             <div class = 'headerIII'>  <h6 class= 'headerT'> Id de Usuario </h6> </div>
            
           </div>

           <div class = 'bodyTabla'>
              { data.orders.map(ord => <div class= 'lineaI' > 

                  <div class = 'bodyI' > <p class = 'pI' >{ord.id}</p> </div> 
                  <div class = 'bodyII' > <p class = 'pI' >{ord.state}</p> </div>
                  <div class = 'bodyIII' > <p class = 'pI' >{ord.userId}</p> </div>
                  </div>
                  )}
           </div>

       </div>

  </div>

)

}