import React, { useEffect, useState } from 'react';
import {useParams, useHistory} from 'react-router-dom';
import axios from 'axios';

// import ProductCard from './productCard.jsx';

// componente presentacional de producto
export default function Categoria(props){
    let param = useParams()
    const history = useHistory();
    const[data, setData] = useState({
        name: '',
        description: '',
        id: param.id
    })

    
    
    useEffect(() => {
        async function makeRequests() {
          
            await axios.get(`http://localhost:3001/products/category/cat/${data.id}`)
            .then(res => {
                setData({
                    ...data,
                    name: res.data.name,
                    description: res.data.description
                })
            })
        }
         makeRequests();
        
      }, []);
      console.log(data.name)
      const json = JSON.stringify({
        name: data.name,
        description: data.description
     });
    
     const handleForm = async(e) => {
        e.preventDefault()
        const res = await axios.put(`http://localhost:3001/products/category/${data.id}`, json, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            alert('Categoria editada correctamente');
            window.location.replace(`http://localhost:3000/admin/addcategory`);
        })
            
    }
    const handleChange = (e) => {
        e.preventDefault();
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }
  return(
    <div>
     <form>
         <label>Nombre:</label>
         <input name='name' value={data.name} onChange={handleChange} type='text'></input>
         <label>Descripción:</label>
         <input name='description' value={data.description} onChange={handleChange} type='text'></input>
         <button onClick={handleForm}>Editar</button>
     </form>
    </div>
       
  )
}