import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

export default function EditOrDelete(props) {
    let json;
    const history = useHistory();
    const [data, setData] = useState({
        name: props.producto.name,
        description: props.producto.description,
        stock: props.producto.stock,
        price: props.producto.price,
        idProduct: props.producto.id,
        idCategory: null,
        file: props.producto.picture,
        displayFile: null,
        pic: false,
        categories: []
    })

    useEffect(() => {
        async function makeRequests() {

            await axios.get(`http://localhost:3001/products/categoria/prod/${data.idProduct}`)
                .then(res => {
                    setData({
                        ...data,
                        categories: Object.values(res.data)
                    })


                })
        }
        makeRequests();
    }, []);
    const handlerChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }
    const handleChange = (event) => {
        setData({
            ...data,
            displayFile: URL.createObjectURL(event.target.files[0]),
            file: event.target.files[0],
            pic: true
        })
    }
    if (data.pic === false) {
        json = JSON.stringify({
            name: data.name,
            description: data.description,
            price: data.price,
            stock: data.stock,
            picture: data.file
        });
    } else if (data.pic === true) {
        json = JSON.stringify({
            name: data.name,
            description: data.description,
            price: data.price,
            stock: data.stock
        });
    }

    const handleForm = async (e) => {
        e.preventDefault();
        let dataP;
        if (data.pic === false) {
            dataP = new FormData();
            dataP.append('json', json);
        } else if (data.pic === true) {
            dataP = new FormData();
            let images = data.file
            dataP.append('images', images);
            dataP.append('json', json);
        }

        const res = await axios.put(`http://localhost:3001/products/${data.idProduct}`, dataP, {
            headers: {
                'accept': 'application/json',
                'Content-Type': `multipart/form-data;`,
            }
        }).then(async (res) => {
            alert('Producto editado correctamente!');
            history.push('/products')
            await axios.get('http://localhost:3001/products/')
                .then((res) => {
                    return props.callback(res.data);
                })

        })

    }

    const handleDelete = async (e) => {

        e.preventDefault();
        if (window.confirm('Estas a punto de quitar este producto de la categoría! ¿Deseas continuar?')) {
            const res = await axios.delete(`http://localhost:3001/products/${data.idProduct}/category/${e.target.value}`)
                .then(async (res) => {
                    alert('El producto ya no pertenece a la categoría!');
                    await axios.get(`http://localhost:3001/products/categoria/prod/${data.idProduct}`)
                        .then((res) => {
                            setData({
                                ...data,
                                categories: Object.values(res.data)
                            })
                        })

                })
        }
    }
    const handleCat = (e) => {
        setData({
            ...data,
            idCategory: parseInt(e.target.value)

        })
    }
    const handleClick = async (e) => {
        e.preventDefault()
        const res = await axios.post(`http://localhost:3001/products/${data.idProduct}/category/${data.idCategory}`)
            .then(async () => {
                alert('El producto ahora pertenece a la categoría!');
                await axios.get(`http://localhost:3001/products/categoria/prod/${data.idProduct}`)
                    .then(res => {
                        setData({
                            ...data,
                            categories: Object.values(res.data)
                        })


                    })
            })
    }
    const starwars = (e) => {
        e.preventDefault();
        history.push('/products/categoria/la guerra de las galaxias')
    }

    return (
        <div>
            <div >
                <form>
                    <label onClick={starwars}>Título:</label>
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
                    <input type='submit' value='Editar producto' onClick={handleForm}></input>
                </form>
                <div>
                    {data.categories.length === 0 ? <h3>El producto no tiene ninguna categoría asignada</h3> : <h3> Categorias del producto:</h3>}
                    {data.categories.map((e) => <div>
                        <p>
                            {e.name}
                        </p>
                        <button value={e.id} onClick={handleDelete}>Eliminar</button>
                    </div>
                    )
                    }
                </div>
                <div>
                    <form>
                        <label>¿Deseas agregar una categoria al producto?:</label>
                        <select onChange={handleCat}>
                            <option >Categorias</option>
                            {props.categorias.map((cat) => <option key={cat.id} value={cat.id} name={cat.name} > {cat.name} </option>)}
                        </select>
                        <input type='submit' value="agregar" onClick={handleClick} />
                    </form>

                </div>
            </div>



        </div>
    )
}