import React, { useState } from 'react';
import axios from 'axios';

export default function EditOrDelete (props){
    const [data, setData] = useState({
        name: props.producto.name,
        description: props.producto.description,
        stock: props.producto.stock,
        price: props.producto.price,
        idProduct: props.producto.id,
        file: props.producto.picture,
        displayFile: null,
        pic: false,
        check: false
    })
    const handlerChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }
    const handleChange = (event)=> {
        setData({
            ...data,
          displayFile: URL.createObjectURL(event.target.files[0]),
          file: event.target.files[0],
          pic: true
        })
    }
    const json = JSON.stringify({
        name: data.name,
        description: data.description,
        price: data.price,
        stock: data.stock
     });
    const handleForm = async(e) => {
        e.preventDefault()
        let dataP = new FormData();
        let images = data.file
        dataP.append('images', images);
        dataP.append('json', json);
        const res = await axios.put(`http://localhost:3001/products/${data.idProduct}`, dataP, {
            headers: {
                'accept': 'application/json',
                'Content-Type': `multipart/form-data;`,
            }
        }).then(res => {
            setData({
                ...data,
                check: true
            })
        })
            
    }

    return(
        <div>
            {data.check === false ? <form>
                <label>Título:</label>
                <input name='name' value={data.name} type='text' placeholder='Título del producto...' onChange={handlerChange}></input>
                <label>Descripción:</label>
                <input name='description' value={data.description} type='text' placeholder='Descripción del producto...' onChange={handlerChange}></input>
                <label>Precio:</label>
                <input name='price' value={data.price} type='text' placeholder='Precio del producto...' onChange={handlerChange}></input>
                <label>Stock:</label>
                <input name='stock' value={data.stock} type='text' placeholder='Stock del producto...' onChange={handlerChange}></input>
                <div>
                    {data.pic === false ? <img src={`http://localhost:3001/uploads/${data.file}`} style={{ width: "300px" }} /> : <img src={data.displayFile} style={{ width: "300px" }} />}
                    <input type="file" onChange={handleChange} id="img" name="img" accept="image/*" />
                </div>
                {data.pic === true ?<input type='submit' value='Agregar' onClick={handleForm}></input> : <span></span>}
            </form> : <div>
                    <h4>Producto editado correctamente!</h4>
                </div>}
             
        </div>
    )
}