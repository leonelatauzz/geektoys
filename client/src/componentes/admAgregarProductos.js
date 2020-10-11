import React, { useState } from 'react';
import axios from 'axios'
import ImageUploader from 'react-images-upload';
import $ from 'jquery';

export default function AddProduct (props) {
const [data, setData] = useState({
    name: "",
    description: "",
    stock: 0,
    price: 0,
    idProduct: 0,
    idCategory: 0,
    send: false,
    hola: false,
    pictures: [],
    file: [],
    displayFile: null,
})

const onDrop =(picture) =>{
    setData({
        ...data,
        pictures: data.pictures.concat(picture)
    })
}

const handlerChange = (event)=>{
    setData({
        ...data,
        [event.target.name]: event.target.value
    })
}

const handleSelectChange = (event)=> {

    setData({
        ...data,
        idCategory: parseInt(event.target.value)
        
    })
    
}

 const json = JSON.stringify({
     name: data.name,
     description: data.description,
     price: data.price,
     stock: data.stock
  });

const handleForm = async(e)=> {
    e.preventDefault()
    let dataP = new FormData();
    let images = data.file
    dataP.append('images', images);
    dataP.append('json', json);
    const res = await axios.post('http://localhost:3001/products', dataP, {
        headers: {
            'accept': 'application/json',
            'Content-Type': `multipart/form-data;`,
        }
    })
        .then((response) => {
            setData({
                ...data,
                idProduct: response.data,
                send: true
            })
        }).catch((error) => {
        });
;}

const handleCategory = async (e)=> {
    e.preventDefault()
    const res = await axios.post(`http://localhost:3001/products/${data.idProduct}/category/${data.idCategory}`)
        setData({
            ...data,
            hola: true 
        }) 
}

    const handleChange =(event) =>{
        setData({
            ...data,
          displayFile: URL.createObjectURL(event.target.files[0]),
          file: event.target.files[0]
        })
      }

        return (
            <div>
                <h3>Agregar nuevo producto</h3>
                {data.send === false ?
                    <form method="post" action="http://localhost:3001/products" >
                        <label>Título:</label>
                        <input name='name' value={data.name} type='text' placeholder='Título del producto...' onChange={handlerChange}></input>
                        <label>Descripción:</label>
                        <input name='description' value={data.description} type='text' placeholder='Descripción del producto...' onChange={handlerChange}></input>
                        <label>Precio:</label>
                        <input name='price' value={data.price} type='text' placeholder='Precio del producto...' onChange={handlerChange}></input>
                        <label>Stock:</label>
                        <input name='stock' value={data.stock} type='text' placeholder='Stock del producto...' onChange={handlerChange}></input>
                        <div>
                            <input type="file" onChange={handleChange} id="img" name="img" accept="image/*" />
                            <img src={data.displayFile} style={{ width: "300px" }} />
                        </div>
                        <input type='submit' value='Agregar' onClick={handleForm}></input>
                    </form> : data.hola === false ? <div>
                        <p>
                            Producto agregado correctamente
                        </p>
                        <p>
                            ¿Deseas agregar una categoria?
                        </p>
                    </div  > : <div>
                            <p>
                                Categoria agregada correctamente
                        </p>
                            <p>
                                ¿Deseas agregar otra categoria?
                        </p>
                        </div>}

                { data.send === true ?
                    <div>
                        <form>
                            <label>Selecciona una Categoria:</label>
                            <select onChange={handleSelectChange}  >
                                <option >Categorias</option>
                                {props.categories.map((cat) => <option key={cat.id} value={cat.id} name={cat.name} > {cat.name} </option>)}
                            </select>
                            <input type='submit' onClick={handleCategory} value="agregar" />
                        </form>
                        <form action="http://localhost:3000/admin/addproduct">
                            <button type="submit">finalizar</button>
                        </form>
                    </div> : <span></span>
                }
            </div>
        )
}


    
