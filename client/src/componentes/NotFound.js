import React from 'react';
import Nat from './navbar'

export default function NotFound () {

    return (
        <div>
            <Nat/>
            <div class='nfContainer' style={{borderRadius:"25px", width: '40vw', border: '0.5px solid black', boxShadow: '10px 10px 5px 0px rgba(0,0,0,0.35)', margin: 'auto', marginTop: '80px', borderRadius: '5px', backgroundColor:"#EDF2F4"}}>
                <h4 style={{border:"white solid 1px",textAlign: 'center', fontFamily:'Malgun Gothic',backgroundColor:"#EDF2F4"}}>El producto buscado no existe, intenta con otra busqueda!</h4>

            </div>
        </div>
    )
}