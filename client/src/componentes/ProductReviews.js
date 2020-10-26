import Star from './images/star.png'
import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import StarRating from './rating.js'
import Swal from 'sweetalert2'
import DetalleOrder from './DetalleOrder.jsx'
import { getReviewProducts } from '../Redux/Actions/actions.js';

export default function ProductReviews() {
    const userData = useSelector(state => state.userId);
    const dataProduct = useSelector(state => state.productId)
    const reviewProducts = useSelector(state => state.review)
    const history = useHistory();
    const dispatch = useDispatch();
    const pID = useSelector(state => state.idP)
    const [data, setData] = useState({
        reviews: [],
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

            await axios.get(`http://localhost:3001/review/reviews/${pID}`, {
            }).then(reviu => {
                setData({
                    ...data,
                    reviews: Object.values(reviu.data)
                })
            })
        }
        makeRequests();
    }, []);
    return (

        <div>
            {data.reviews.map(reviu =>
                <div className="ReviewCreado">
                    <h1>Opinion sobre el producto</h1>
                    <h6 style={{marginLeft:"15px"}}>{reviu.updatedAt.split('T')[0]}</h6>
                    <h5>{userData.name} {userData.lastname}</h5>
                    <div className="img">{setPick(reviu).map(star =>
                        <img src={Star} style={{ maxWidth: "25px" }} />
                    )}</div>
                    <p>{reviu.description}</p>
                </div>
            )}


        </div>

    )
}