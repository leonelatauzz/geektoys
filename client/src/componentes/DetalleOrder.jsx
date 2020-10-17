import React from 'react'
import { Accordion, Card, Button, Row, Col, Nav, Table } from 'react-bootstrap'


export default function DetalleOrder() {

    return (
        <div>
            <h1 style={{marginTop:"50px"}}> Orden</h1>
            <div style={{margin:"0px 40px 0px 40px"}}>
                <Row>
                    <Col>
                        <div  >
                            <div style={{display:"flex"}} >
                                <img style={{ width: "190px", height: "170px", margin:"20px" }} src="" />
                                <div style={{display:"flex",flexDirection:"column",margin:"20px",marginTop:"30px"}} >
                                    <div style={{paddingBottom:"20px"}}>
                                        <h3 > Pikachu </h3>
                                    </div>
                                    <div >
                                        <h6 >Altura 19cm ancho 20cm</h6>
                                    </div>
                                    <h5 >Cantidad comprada: 3</h5>
                                    <h5 > <a> Precio por unidad: $3000 </a></h5>
                                </div>
                                <div >
                                    <p></p>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col xs={4}>
                        <div style={{display:"flex",flexDirection:"column",marginTop:"25px"}}>

                        <h4> Precio total de la compra: $3000 </h4>
                        <h4>Fecha de compra: 16/10/2010</h4>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    )
}


{/* <div>
<h1>Orden</h1>
<div >
    <div style={{ width: "65%", height: "210px", backgroundColor: "#F5F5F5", boxShadow: "10px 10px 5px 0px rgba(0,0,0,0.35)", borderRadius: "12px" }} >
        <div  >
        </div>
        <div style={{ display: "flex", width: "70%", }}>
            <img style={{ width: "190px", height: "170px", marginLeft: "25px", marginTop: "15px" }} src="" />
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", justifyContent: "space-evenly", width: "40%", position: "relative", left: "20px", padding: "10px" }}>
                <div>
                    <h3 style={{ fontSize: "21px" }}> pikachu </h3>
                </div>
                <div >
                    <small style={{ position: "relative", bottom: "20px" }}>altura 19cm ancho 20cm</small>
                </div>
                <p style={{ position: "relative", bottom: "20px" }}>Cantidad comprada: 3</p>
                <p style={{ position: "relative", bottom: "50px" }}> <a> Precio por unidad: $3000 </a></p>
            </div>
            <div style={{ width: "300px" }}>
                <p></p>
            </div>
        </div>
    </div>
    <div style={{ borderBottom: "black solid 1px", position: "relative", left: "250px", width: "720px" }}></div>
</div>
<span> Precio total de a compra: $3000 </span>
<span>Fecha de compra: 16/10/2010</span>
</div> */}