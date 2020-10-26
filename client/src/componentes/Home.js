import React, { useEffect, useState } from 'react';
import CartasHome from './cartasdehome';
import Carousel from './Carusel'
import Nat from './navbar'
import Footer from './Footer'



export default function Home () {

    //ACCESS_TOKEN_SECRET=a710c876c472022480496ea111b46b1d0a13f5296d702bcdf7abeada57af281224d6cd0b059254b35f11245b104ca9a8e8c95130a9943845d0ed96c2602a54a6

    return (
        <div>
            <Nat/>
            <Carousel />
            <CartasHome />
            <Footer/>
        </div>
    )
}