import React, { useEffect, useState } from 'react';
import CartasHome from './cartasdehome';
import Carousel from './Carusel'
import Nat from './navbar'
import Footer from './Footer'



export default function Home () {

    return (
        <div>
            <Nat/>
            <Carousel />
            <CartasHome />
            <Footer/>
        </div>
    )
}