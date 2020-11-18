import React from 'react'


export default function ProductosCarrito(props) {
    return (
        <div >
            <div  style={{width: "90%", height:"230px" }} >
                <div  >
                </div>
                <div style={{ display: "flex", width: "90%", }}>
                    <img style={{width: "220px", height:"200px", marginLeft:"25px",marginTop:"15px" }} src={`http://localhost:3001/uploads/${props.picture}`}/>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "space-evenly", width: "40%", position: "relative", left: "10px", padding: "10px" }}>
                        <div>
                            <p style={{ fontSize: "22px" }}> {props.titulo} </p>
                        </div>
                        <div >
                            <small style={{ position: "relative", bottom: "20px" }}>Disponible</small>
                        </div>
                        <p style={{ position: "relative", bottom: "20px" }}>Cantidad a comprar:</p>
                        <input type="number" style={{ width: "60px", height: "22px", position: "relative", bottom: "58px", left: "150px" }} />
                        <p style={{ position: "relative", bottom: "50px" }}> <a> Eliminar producto del carrito </a></p>
                    </div>
                    <div style={{ width: "300px" }}>
                        <span style={{ fontSize: "20px", position: "relative", left: "130px",top:"14px" }}> Precio del producto: {props.price} </span>
                        <label style={{position:"relative", left:"130.5px", top:"30px",fontSize:"20px"}}> Incluir a la compra: </label>
                        <input style={{position:"relative",top:"31.5px", left:"140px"}} type="checkbox"/>
                    </div>
                </div>
            </div>
            <div style={{borderBottom:"black solid 1px", position:"relative",left:"260px" , width:"855px" }}></div>
        </div>
    )
}