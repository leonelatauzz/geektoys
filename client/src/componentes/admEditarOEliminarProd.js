import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getProductCategory, getProducts } from '../Redux/Actions/actions'

export default function EditOrDelete() {
    let json;
    const history = useHistory();
    const dispatch = useDispatch();
    const spProduct = useSelector(state => state.productId);
    const prCategories = useSelector(state => state.productCategories)
    const existingCategories = useSelector(state => state.categories)
    const [data, setData] = useState({
        name: spProduct.name,
        description: spProduct.description,
        stock: spProduct.stock,
        price: spProduct.price,
        idProduct: spProduct.id,
        idCategory: null,
        file: spProduct.picture,
        displayFile: null,
        pic: false,
    })

    useEffect(() => {
        async function makeRequests() {

            await axios.get(`http://localhost:3001/products/categoria/prod/${data.idProduct}`)
                .then(res => {
                    let pCategories = Object.values(res.data)
                    dispatch(getProductCategory(pCategories))

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
                    dispatch(getProducts(res.data))
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
                            let pCategories = Object.values(res.data)
                            dispatch(getProductCategory(pCategories))
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
                        let pCategories = Object.values(res.data)
                        dispatch(getProductCategory(pCategories))


                    })
            })
    }

    const products = (e) => {
        e.preventDefault()
        history.push('/admin/products')
    }

    return (
        <div style={{ backgroundColor: "gray", display: 'flex' }}>
            <div className="juan" style={{ padding: '20px', height: '630px', marginLeft: '550px', marginTop: '30px', backgroundColor: 'white' }}>
                <form className="form">
                    <h3 className="titulo" style={{ color: 'black' }}>Editar producto</h3>
                    <label className="label" style={{ color: "black" }}>Título:</label>
                    <input name='name' className="inputs" value={data.name} type='text' placeholder='Título del producto...' onChange={handlerChange}></input>
                    <label className="label" style={{ color: "black" }}>Descripción:</label>
                    <input name='description' className="inputs" value={data.description} type='text' placeholder='Descripción del producto...' onChange={handlerChange}></input>
                    <label className="label" style={{ color: "black" }}>Precio:</label>
                    <input name='price' className="inputs" value={data.price} type='text' placeholder='Precio del producto...' onChange={handlerChange}></input>
                    <label className="label" style={{ color: "black" }}>Stock:</label>
                    <input name='stock' className="inputs" value={data.stock} type='text' placeholder='Stock del producto...' onChange={handlerChange}></input>
                    <div style={{ display: 'flex' }}>
                        <div style={{ width: '200px' }}>
                            <input style={{ color: 'black' }} className="file" type="file" onChange={handleChange} id="img" name="img" accept="image/*" />
                            {data.pic === false ? <img src={`http://localhost:3001/uploads/${data.file}`} style={{ maxHeight: '200px', width: 'auto', marginTop: '30px', border: 'solid 1px black' }} /> : <img src={data.displayFile} style={{ maxHeight: '200px', width: 'auto', marginTop: '30px' }} />}
                        </div>
                        <input className="submit" type='submit' value='Guardar Cambios' style={{ width: '150px', height: '50px', marginTop: '140px', marginLeft: '2px', marginRight: '150px' }} onClick={handleForm}></input>
                    </div>

                </form>
            </div>
            <div className="juan" style={{ padding: '20px', height: '630px', marginLeft: '100px', marginTop: '30px', backgroundColor: 'white' }}>
                <form className="form">
                    <div>
                        {prCategories.length === 0 ? <h3 className="titulo" style={{ color: 'black' }}>El producto no tiene ninguna categoría asignada</h3> : <h3 className="titulo" style={{ color: 'black' }}> Categorias del producto:</h3>}
                        {prCategories.map((e) => <div>
                            <label className="label" style={{ color: 'black', textTransform: 'capitalize' }}>
                                {e.name}
                            </label>

                            <button className="submit" value={e.id} style={{ width: '40px', height: '25px', fontSize: '15px', marginLeft: '100px' }} onClick={handleDelete}>X</button>
                        </div>
                        )
                        }
                    </div>
                    <label className="label" style={{ color: "black" }}>¿Deseas agregar una categoria al producto?:</label>
                    <select style={{ marginTop: '250px', width: '300px', marginLeft: '30px' }} onChange={handleCat}>
                        <option >Categorias</option>
                        {existingCategories.map((cat) => <option key={cat.id} value={cat.id} name={cat.name} > {cat.name} </option>)}
                    </select>
                    <input className="submit" type='submit' value="Agregar" onClick={handleClick} style={{ marginRight: '220px', width: '150px', height: '50px', marginTop: '60px' }} />
                </form>


      
                       


                    </form>
                </div>
                <div className="juan" style={{ padding: '20px', height: '630px', marginLeft: '100px', marginTop: '30px', backgroundColor: 'white' }}>
                    <form className="form">
                        <div>
                            {data.categories.length === 0 ? <h3 className="titulo" style={{ color: 'black' }}>El producto no tiene ninguna categoría asignada</h3> : <h3 className="titulo" style={{ color: 'black' }}> Categorias del producto:</h3>}
                            {data.categories.map((e) => <div>
                                <label className="label" style={{ color: 'black', textTransform: 'capitalize' }}>
                                    {e.name}
                                </label>

                                <button className="submit" value={e.id} style={{ width: '40px', height: '25px', fontSize: '15px', marginLeft: '100px' }} onClick={handleDelete}>X</button>
                            </div>
                            )
                            }
                        </div>
                        <label className="label" style={{ color: "black" }}>¿Deseas agregar una categoria al producto?:</label>
                        <select style={{ marginTop: '250px', width: '300px', marginLeft: '30px' }} onChange={handleCat}>
                            <option >Categorias</option>
                            {props.categorias.map((cat) => <option key={cat.id} value={cat.id} name={cat.name} > {cat.name} </option>)}
                        </select>
                        <input className="submit" type='submit' value="Agregar" onClick={handleClick} style={{ marginRight: '220px', width: '150px', height: '50px', marginTop: '60px' }} />
                    </form>
                </div>
            </div>
        </div>
    )
}