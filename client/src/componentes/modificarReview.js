import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from "react-redux";
import StarRating from './rating.js'
import Star from './images/star.png'
import Swal from 'sweetalert2'
import { Form, FormGroup, FormControl } from 'react-bootstrap'

export default function PutReview() {
    const userData = useSelector(state => state.userId);
    const history = useHistory();
    const pID = useSelector(state => state.idP)
    const rID = useSelector(state => state.rID)
    var count = 0;
    const [data, setData] = useState({
        rating: "",
        description: "",
    })
    function setPick(props) {
        return props.rating == 0 ? [1]
            : props.rating == 1 ? [1, 2]
                : props.rating == 2 ? [1, 2, 3]
                    : props.rating == 3 ? [1, 2, 3, 4]
                        : [1, 2, 3, 4, 5];
    }
    useEffect(() => {
        async function makeRequests() {
            await axios.get(`http://localhost:3001/products/${pID}/review/${rID}`, {
            }).then(reviu => {
                setData({
                    ...data,
                    description: reviu.data.description,
                    rating: reviu.data.rating

                })
            })
        }
        makeRequests();
    }, []);

    const handlePrueba = (e) => {
        setData({
            ...data,
            rating: e.target.value
        })
        console.log(e.target.value)
    }

    const handleCambio= (e)=>{
        setData({ ...data, 
         description:e.target.value})
        console.log(data.description)
       }
    return (
        <div>
            <div className="ReviewCreado">
                <h1>Opinion sobre el producto</h1>
                <h5>{userData.name} {userData.lastname}</h5>
                <div onClick={handlePrueba}><StarRating /></div>
                {/* <Form.Group>
                <Form.Control value={data.description} onChange={handleCambio} size="lg" type="text" placeholder={data.description} />
            </Form.Group> */}
            <input className="inputNuevo" value={data.description} onChange={handleCambio} type="text"></input>
                </div>
            </div>
           

        
    )
}
