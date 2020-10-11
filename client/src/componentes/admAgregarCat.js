import Axios from 'axios';
import React, { useState } from 'react';

export default function AddCategory (props){
const [data, setData] = useState({
    name: "",
    description: ""

})

    const handlerChange = (event) =>{
     setData({
         ...data,
         [event.target.name]: event.target.value
     })
    }

    const handleSubmit = async (e)=>{
        const json = {
            name: data.name,
            description: data.description
        }

        const res = await Axios.post('http://localhost:3001/products/category',json, {
            headers: {
                'Content-Type': 'application/json'
            }

        })
    }
    
        return (
            <div>
                <div>
                    <h3> Categorias existentes</h3>
                    {props.categories.map((e)=> <p>
                        <a href={`http://localhost:3000/products/categoria/${e.name}`}>
                            {e.name}
                        </a> 
                    </p>
                    )
                    }
                </div>
                
                <form>
                    <label>Nueva categoría:</label>
                    <input type='text' placeholder='nombre de categoria...' name='name' onChange={handlerChange}></input>
                    <input type='text' placeholder='descripcion...'name='description' onChange={handlerChange} ></input>
                    <input type='submit' value='Agregar' onClick={handleSubmit}></input>
                </form>
            </div>
        )
    
}

