import React from 'react'


export default function Cart() {

  return (

    <div>
      <h1 > Mis productos</h1>
        <div >
          <div style={{ width: "65%", height: "210px", backgroundColor:"#F5F5F5",boxShadow: "10px 10px 5px 0px rgba(0,0,0,0.35)",borderRadius:"12px" }} >
            <div  >
            </div>
            <div style={{ display: "flex", width: "70%",   }}>
              <img style={{ width: "190px", height: "170px", marginLeft: "25px", marginTop: "15px" }} src="" />
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "space-evenly", width: "40%", position: "relative", left: "20px", padding: "10px" }}>
                <div>
                  <p style={{ fontSize: "21px" }}> holaaaaaa </p>
                </div>
                <div >
                  <small style={{ position: "relative", bottom: "20px" }}>Disponible</small>
                </div>
                <p style={{ position: "relative", bottom: "20px" }}>Cantidad a comprar:</p>
                <input type="number" style={{ width: "60px", height: "22px", position: "relative", bottom: "58px", left: "150px" }} />
                <p style={{ position: "relative", bottom: "50px" }}> <a> Eliminar producto del carrito </a></p>
              </div>
              <div style={{ width: "300px" }}>
                <span style={{ fontSize: "20px", position: "relative", left: "280px", top: "14px" }}> Precio del producto: hola </span>
                <label style={{ position: "relative", left: "280.5px", top: "30px", fontSize: "20px" }}> Incluir a la compra: </label>
                <input style={{ position: "relative", top: "31.5px", left: "290px" }} type="checkbox" />
              </div>
            </div>
          </div>
          <div style={{ borderBottom: "black solid 1px", position: "relative", left: "250px", width: "720px" }}></div>
        </div>
      <div>
        <span style={{ position: "relative", left: "730px", fontSize: "30px" }}> Subtotal: hola</span>
      </div>
    </div>
  )
}

