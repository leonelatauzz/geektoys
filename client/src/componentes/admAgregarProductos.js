import React, { useState } from 'react';
import axios from 'axios'
import { useHistory } from 'react-router-dom';

export default function AddProduct(props) {
    const history = useHistory();
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
        dispBut: false,
        check: false
    })

    const handlerChange = (event) => {
        setData({
            ...data,
            [event.target.name]: event.target.value
        })
    }

    const handleSelectChange = (event) => {
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

    const handleForm = async (e) => {
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
        }).then((response) => {
                setData({
                    ...data,
                    idProduct: response.data,
                    send: true
                })
                alert('Producto agregado correctamente')
            });
    }

    const handleCategory = async (e) => {
        e.preventDefault()
        const res = await axios.post(`http://localhost:3001/products/${data.idProduct}/category/${data.idCategory}`)
        setData({
            ...data,
            hola: true,
            dispBut: true
        })
        alert('Producto agregado a la categoría correctamente')
        history.push('/admin/addproduct')
    }

    const handleChange = (event) => {
        setData({
            ...data,
            displayFile: URL.createObjectURL(event.target.files[0]),
            file: event.target.files[0],
            check: true
        })
    }

    const handleB = (e) => {
        e.preventDefault();
        history.push('/admin')
    }

    return (
        <div>
            <button onClick={handleB}>Volver al dashboard</button>
            {data.send === false ?
                <form  >
                    <h3>Agregar nuevo producto</h3>
                    <label>Título:</label>
                    <input name='name' value={data.name} type='text' placeholder='Título del producto...' onChange={handlerChange}></input>
                    {data.name.length === 0 && <span style={{ color: 'red' }}>Este campo es requerido</span>}
                    <label>Descripción:</label>
                    <input name='description' value={data.description} type='text' placeholder='Descripción del producto...' onChange={handlerChange}></input>
                    {data.description.length === 0 && <span style={{ color: 'red' }}>Este campo es requerido</span>}
                    <label>Precio:</label>
                    <input name='price' value={data.price} type='number' placeholder='Precio del producto...' onChange={handlerChange}></input>
                    <label>Stock:</label>
                    <input name='stock' value={data.stock} type='number' placeholder='Stock del producto...' onChange={handlerChange}></input>
                    <div>
                        <input type="file" onChange={handleChange} id="img" name="img" accept="image/*" />
                        <img src={data.displayFile} style={{ width: "300px" }} />
                    </div>
                    {data.check === true ? <input type='submit' value='Agregar' onClick={handleForm}></input> : <span></span>}
                </form> : data.hola === false ? <div>
                    <h5>
                        ¿Deseas agregar una categoria al producto?
                        </h5>
                </div  > : <div>
                        <h5>
                            ¿Deseas agregar otra categoria al producto?
                        </h5>
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
                    {data.dispBut === true ? <form action="http://localhost:3000/admin/addproduct">
                        <button type="submit">finalizar</button>
                    </form> : <span></span>}

                </div> : <span></span>
            }
        </div>
    )
}



