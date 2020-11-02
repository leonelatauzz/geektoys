import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getProductCategory, getProducts } from '../Redux/Actions/actions'
import Swal from 'sweetalert2'
import '../componentes/css/AdminEdit-elimin-prod.css'
import SuperSimpleNavbarAdmin from './SuperSimpleNavbarAdminProd'


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
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Producto editado correctamente',
                showConfirmButton: false,
                timer: 1500
            })
            history.push('/admin/products')
            await axios.get('http://localhost:3001/products/')
                .then((res) => {
                    dispatch(getProducts(res.data))
                })

        })

    }

    const handleDelete = async (e) => {
        const valor = e.target.value
        e.preventDefault();
        Swal.fire({
            title: 'Estas seguro',
            text: "No hay vuelta atras!!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Eliminar'
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axios.delete(`http://localhost:3001/products/${data.idProduct}/category/${valor}`)
                    .then(async (res) => {
                        await axios.get(`http://localhost:3001/products/categoria/prod/${data.idProduct}`)
                            .then((res) => {
                                let pCategories = Object.values(res.data)
                                dispatch(getProductCategory(pCategories))
                            })

                    })
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Categoria eliminada del producto',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
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
                await axios.get(`http://localhost:3001/products/categoria/prod/${data.idProduct}`)
                    .then(res => {
                        let pCategories = Object.values(res.data)
                        dispatch(getProductCategory(pCategories))
                        Swal.fire({
                            position: 'center',
                            icon: 'success',
                            title: 'categoria agregada correctamente',
                            showConfirmButton: false,
                            timer: 1500
                        }).then(()=> {
                            window.location.reload()

                        })


                    })
            })
    }



    return (
        <div>
            <SuperSimpleNavbarAdmin />
            <div className="">
                <form className="formulin" style={{ backgroundColor: 'white', padding: '1vw', height: 'min-content' }}>
                    <h3 className="titulo" style={{ color: 'black' }}>Editar producto</h3>
                    <label className="label" style={{ color: "black" }}>Título:</label>
                    <input name='name' className="h6" value={data.name} type='text' placeholder='Título del producto...' onChange={handlerChange}></input>
                    <label className="label" style={{ color: "black" }}>Descripción:</label>
                    <input name='description' className="h6" value={data.description} type='text' placeholder='Descripción del producto...' onChange={handlerChange}></input>
                    <label className="label" style={{ color: "black" }}>Precio:</label>
                    <input name='price' className="h6" value={data.price} type='text' placeholder='Precio del producto...' onChange={handlerChange}></input>
                    <label className="label" style={{ color: "black" }}>Stock:</label>
                    <input name='stock' className="h6" value={data.stock} type='text' placeholder='Stock del producto...' onChange={handlerChange}></input>
                    <div style={{ display: 'flex', marginLeft: '20px' }}>
                        <div >
                            <input className="img_file" style={{ maxWidth: '150px', maxHeight: '150px' }} type="file" onChange={handleChange} id="img" name="img" accept="image/*" />
                            {data.pic === false ? <img src={`http://localhost:3001/uploads/${data.file}`} style={{ maxHeight: '150px', maxWidth: "150px", marginTop: '0px' }} /> : <img src={data.displayFile} style={{ maxHeight: '150px', maxWidth: '150px' }} />}
                        </div>
                        <input className="btn_guard_cambios" type='submit' value='Guardar Cambios' onClick={handleForm}></input>
                    </div>

                </form>
            </div>
            <div className="catesEdit">
                <form className="formulin_cat" style={{ backgroundColor: 'white', padding: '1vw' }}>
                    <div>
                        {prCategories.length === 0 ? <h3 className="titulo" style={{ color: 'black' }}>El producto no tiene ninguna categoría asignada</h3> : <h3 className="titulo" style={{ color: 'black' }}> Categorias del producto:</h3>}
                        {prCategories.map((e) => <div style={{ display: 'flex', justifyContent: 'space-between', width: '15vw', margin: 'auto'  }}>
                            <label style={{ color: 'black', textTransform: 'capitalize', marginTop: '5px' }}>
                                {e.name}
                            </label>

                            <button style={{backgroundColor: '#D90429', color: 'white', borderRadius: '5px'}} value={e.id} onClick={handleDelete}>X</button>
                        </div>
                        )
                        }
                    </div>
                    <label className="label" style={{margin: 'auto', marginTop: '2vw', marginBottom: '0'}}>¿Deseas agregar una categoria al producto?:</label>
                    <select onChange={handleCat}>
                        <option className='Edit-Cat-Adm' >Categorias</option>
                        {existingCategories.map((cat) => <option key={cat.id} value={cat.id} name={cat.name} > {cat.name} </option>)}
                    </select>
                    <div style={{marginTop: '50px'}}>
                        <input className="submit" style={{marginLeft: '140px'}} type='submit' value="Agregar" onClick={handleClick} />
                    </div>
                </form>

            </div>
        </div>

    )
}