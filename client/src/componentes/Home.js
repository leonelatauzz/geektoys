import React, { useEffect, useState } from 'react';
import CartasHome from './cartasdehome';
import Carousel from './Carusel'

export default function Home () {

    return (
        <div>
            <Carousel />
            <CartasHome />
        </div>
    )
}