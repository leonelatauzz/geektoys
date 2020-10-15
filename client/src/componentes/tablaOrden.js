import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";

export default function TablaOrden(){
let ordenes= [{id:5, state:'completado', userId:2}, {id:4, state:'completado', userId:3}, {id:3, state:'completado', userId:4}];
return(

  <div class= 'containerTabla' >
       <div class = 'tablaO' >
           <div class = 'headerTabla'>

             <div class = 'headerI'>  <h6 class= 'headerT'> Número de Orden </h6> </div>
             <div class = 'headerII'>  <h6 class= 'headerT'> Estado de Orden </h6> </div>
             <div class = 'headerIII'>  <h6 class= 'headerT'> Id de Usuario </h6> </div>
            
           </div>

           <div class = 'bodyTabla'>
              { ordenes.map(ord => <div class= 'lineaI' > 

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