import Star from './images/star.png'
import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2'
import {useSelector, useDispatch} from 'react-redux'
import {getReviewId } from '../Redux/Actions/actions'
export default function ProductReviews() {
    const userData = useSelector(state => state.userId);
    const loggedIn = useSelector(state => state.loggedIn);
    const history = useHistory();
    const dispatch= useDispatch();
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
            await axios.get(`http://localhost:3001/products/reviews/${pID}`, {
            }).then(reviu => {
                console.log(reviu)
                setData({
                    ...data,
                    reviews: Object.values(reviu.data),
                    
                })
            })
        }
        makeRequests();
    }, []);
    const handleDelete = async(e)=>{
        e.preventDefault();
       const idReview = e.target.value;
       
        Swal.fire({
            title: 'Estas seguro',
            text: "No hay vuelta atras!!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Eliminar'
          }).then( async(result) => {
            if (result.isConfirmed) {
                const res = await axios.delete(`http://localhost:3001/products/${pID}/review/${idReview}`)
                    .then(async (res) => {
                        await axios.get(`http://localhost:3001/products/reviews/${pID}`, {
                        }).then(reviu => {
                            setData({
                                ...data,
                                reviews: Object.values(reviu.data)
                            })
                        })
    
                    })
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Review eliminada del producto',
                        showConfirmButton: false,
                        timer: 1500
                      })
            }
          })
    }
    const handlePut = (e)=>{
        e.preventDefault();
        var reviuId = e.target.value;
        dispatch(getReviewId(reviuId))
        history.push(`${pID}/review/${reviuId}`)
        
    }
    return (

        <div>
            {console.log(data.reviews)}
            {data.reviews.map(reviu =>
                <div className="ReviewCreado">
                    {loggedIn === true && userData.id==reviu.userId? <span><h1>Opinion sobre el producto</h1>
                    <h6 style={{marginLeft:"15px"}}>{reviu.updatedAt.split('T')[0]}</h6>
                    <h5>{reviu.name}</h5>
                    <div className="img">{setPick(reviu).map(star =>
                        <img src={Star} style={{ maxWidth: "25px" }} />
                    )}</div>
                    <p>{reviu.description}</p>
                    <button className="BtnDelete" value={reviu.id} onClick={handleDelete}>Eliminar</button>
                    <button value={reviu.id} className="BtnEdit" onClick={handlePut}>Editar</button></span>:<span><h1>Opinion sobre el producto</h1>
                    <h6 style={{marginLeft:"15px"}}>{reviu.updatedAt.split('T')[0]}</h6>
                    <h5>{reviu.name}</h5>
                    <div className="img">{setPick(reviu).map(star =>
                        <img src={Star} style={{ maxWidth: "25px" }} />
                    )}</div>
                    <p>{reviu.description}</p></span>}
                   
                </div>
            )}


        </div>

    )
}