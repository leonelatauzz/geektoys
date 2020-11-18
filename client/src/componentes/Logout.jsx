import React from 'react';
import Swal from 'sweetalert2'
import axios from 'axios';


export default function logout(){

  return(
Swal.fire({
    title: 'Usuario Deslogueado, ¡Nos vemos pronto!',
    width: 600,
    padding: '3em',
    background: 'url("https://i.imgur.com/4rsKgF2.jpg")',
    backdrop: `
      rgba(0,0,123,0.4)
      url("https://sweetalert2.github.io/images/nyan-cat.gif")
      left top
      no-repeat
    `

    
  })
  )
}

