import React, { useState } from 'react';
import ProductCard from './productCard.jsx';
import { useDispatch, useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import Nat from './navbar'
import Footer from './Footer'




export default function Catalogo() {

    const catalogo = useSelector(state => state.products)
    const categoria = useSelector(state => state.categories)

    function titleCase(str) {
        var splitStr = str.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        return splitStr.join(' ');
    }


    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const parametro = useParams()
    let name;
    let description;

    categoria.forEach(element => {
        if (element.name === parametro.nombreCat) {
            name = element.name
            description = element.description
        }
        if (parametro.nombreCat === undefined) {
            name= 'Catálogo'
            description = "Todos los productos del universo geek!"
        }
    });

    return (
        <div>
            <Nat />
            <div class='infoCat102'>
            {name && <h1 class='titA102'>{capitalizeFirstLetter(name)}</h1>}
            {description && <h3 class='titC102'>{capitalizeFirstLetter(description)}</h3>}
            </div>
            <div class="tarjeta" >
                {catalogo.map((p) => <ProductCard
                    key={p.id}
                    id={p.id}
                    name={titleCase(p.name)}
                    description={capitalizeFirstLetter(p.description)}
                    picture={p.picture}
                    price={p.price}
                    stock={p.stock}
                />
                )}
            </div>
            <Footer />
        </div>

    )
}