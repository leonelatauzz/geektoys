import React from 'react';
import imagen from './imagen/yoda.jpeg'



  
export default function Productos(props){ 
  return(
      <div class="container">
          <div class="row">
              <div class="col-sm">
                  <div class="card" >
                      <div>
                          <div class="card mb-3" >
                              <div class="row no-gutters">
                                  <div class="col-md-4">
                                      <img src="..." class="card-img" alt="..." />
                                  </div>
                                  <div class="col-md-8">
                                      <div class="card-body">
                                          <h5 class="card-title">{props.titulo}</h5>
                                          <p class="card-text">{props.descripcion}</p>
                                          <p class="card-text"><small class="text-muted">precio: 6000</small></p>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  )
}
    {/* <div class="card" >
    <img src='image' class="card-img-top" alt="..."/>
    <div class="card-body">
      <h5 class="card-title">lavadora</h5>
      <p class="card-text">lavadora que lava</p>
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">dreams</li>
      <li class="list-group-item">800.99</li>
      <li class="list-group-item">90%</li>
    </ul>
    <div class="card-body">
      <a href="#" class="card-link">Card link</a>
      <a href="#" class="card-link">Another link</a>
    </div>
  </div>
      
       <div class="card mb-3" style="max-width: 540px;">
       <div class="row no-gutters">
         <div class="col-md-4">
           <img src="..." class="card-img" alt="...">
         </div>
         <div class="col-md-8">
           <div class="card-body">
             <h5 class="card-title">Card title</h5>
             <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
             <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
           </div>
         </div>
       </div>
     </div>





//     <div class="container">
//     <div class="row">
//         <div class="col-sm">
//             <div class="card" >
//                 <img src="" class="card-img-top" />
//                 <div class="card-body">
//                     <h5 class="card-title">{props.nombre}</h5>
//                     <p class="card-text">{props.descripcion}</p>
//                     <a href="#" class="btn btn-primary">ver productoo</a>
//                 </div>
//             </div>
//         </div>
//     </div>
// </div>
    // <div>
    //   <h2>{props.titulo}</h2>
    //   <img>{props.imagen}</img>
    //   <h3>{props.precio}</h3>
    //   <div>{props.descripcion}</div>
    // </div>
   )
} */}
