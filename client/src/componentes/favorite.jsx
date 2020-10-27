import React, { useState, useEffect } from 'react';
import ProductCard from './productCard.jsx';
import { useDispatch, useSelector } from "react-redux";
import { getFavorites } from '../Redux/Actions/actions'
import Nat from './navbar'
import Footer from './Footer';
import axios from 'axios'


export default function Favoritos() {
    const [data, setData] = useState([])
    const dispatch = useDispatch()
    const userData = useSelector(state => state.userId)
    useEffect(() => {
        async function makeRequests() {

            await axios.get(`http://localhost:3001/products/favorites/${userData.id}`)
            .then(resp => {
                let faves = Object.values(resp.data)
                dispatch(getFavorites(faves))
                setData(faves)
            })
        }
        makeRequests();
    }, []);

    const reload = () => {
        window.location.reload()

    }

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


    return (
        <div>
            <Nat />
            <div class='infoCat102'>
                <h1 class='titA102'>Favoritos</h1>
                {data.length === 0 && <h3 class='titA102'>No tienes productos favoritos!</h3>}
            </div>
            <div class="tarjeta" >
                {data.map((p) => <ProductCard
                    key={p.id}
                    id={p.id}
                    name={titleCase(p.name)}
                    description={capitalizeFirstLetter(p.description)}
                    picture={p.picture}
                    price={p.price}
                    stock={p.stock}
                    reload = {reload}
                />
                )}
            </div>
            <Footer />
        </div>

    )
}