import React, { useEffect, useState } from 'react';
import CartasHome from './cartasdehome';
import Carousel from './Carusel'
import Nat from './navbar'
import Footer from './Footer'

export default function Home () {

    const {user, setUser} = useState({})
    useEffect(async()=>{
        const traer = await JSON.parse(localStorage.getItem('datos'))
        setUser(traer);
    },{})
    return (
        <div>
            {console.log(user)}
            <Nat/>
            <Carousel />
            <CartasHome />
            <Footer/>
        </div>
    )
}