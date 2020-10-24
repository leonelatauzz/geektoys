
import React, {useState} from 'react';
import {FaStar} from 'react-icons/fa';
export default function StarRating(){
    const [rating, setRating]=useState(null)
    const [hover, setHover]=useState(null)
    return(
        <div className='puntaje'> 
            {[... Array(5)].map((star, i)=>{
            const ratingValue = i;
            return(
                <label>
                  <input 
                  type='radio' 
                  name='rating' 
                  value={ratingValue} 
                  onClick={()=>setRating(ratingValue+1)}
                  
                  />
                  <FaStar 
                  className='star' 
                  color={ratingValue < (rating || hover) ? "#ffc107" : "#e4e5e9"}
                  size={20} 
                  onMouseEnter={()=> setHover(ratingValue+1)}
                  onMouseLeave={()=> setHover(null)}
                  />
                </label>   
            )  
          })}
          {rating===1?<p>Malo</p>:""}
          {rating===2?<p>Bueno</p>:""}
          {rating===3?<p>Muy Bueno</p>:""}
          {rating===4?<p>Tremendo</p>:""}
          {rating===5?<p>Excelente</p>:""}
          </div>
           
    )
}