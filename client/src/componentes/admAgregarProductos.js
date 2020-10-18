import React, { useState } from 'react';
import axios from 'axios'
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getProducts, getCategoryProduct } from '../Redux/Actions/actions'
import mImg from './images/marioPic.png';
import Uimg from './images/up.png'

export default function AddProduct() {
    const history = useHistory();
    const dispatch = useDispatch();
    const existingCategories = useSelector(state => state.categories)
    const [data, setData] = useState({
        name: "",
        description: "",
        stock: 0,
        price: 0,
        idProduct: 0,
        idCategory: 0,
        nameCategory: '',
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
        let catData = event.target.value.split('/')
        setData({
            ...data,
            idCategory: parseInt(catData[0]),
            nameCategory: catData[1]

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
        }).then(async(response) => {
                alert('Producto agregado correctamente')
                setData({
                    ...data,
                    idProduct: response.data,
                    send: true
                })
                await axios.get('http://localhost:3001/products/')
                .then(res => {
                    dispatch(getProducts(res.data))
                })
                
            });
    }

    const handleCategory = async (e) => {
        e.preventDefault()
        const res = await axios.post(`http://localhost:3001/products/${data.idProduct}/category/${data.idCategory}`)
        .then(async()=> {
            setData({
                ...data,
                hola: true,
                dispBut: true
            })
            alert('Producto agregado a la categoría correctamente');
        })
        

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
        <div className="imagen_fondo">
        <div className="div_container" >
        <button style={{marginLeft: '950px', marginTop:'20px'}} className="my_butom" onClick={handleB}>Volver al dashboard</button>            
            <div className="juan" style={{height: '650px'}}>            
            {data.send === false ?
                <form className="form" >
                    <h3 className="titulo" >Agregar nuevo producto</h3>
                    <label className="label" >Título:</label>
                    <input  className="inputs"name='name' value={data.name} type='text' placeholder='Título del producto...' onChange={handlerChange}></input>
                    {data.name.length === 0 && <span style={{ color: 'red' }}>Este campo es requerido</span>}
                    <label className="label" >Descripción:</label>
                    <input className="inputs" name='description' value={data.description} type='text' placeholder='Descripción del producto...' onChange={handlerChange}></input>
                    {data.description.length === 0 && <span style={{ color: 'red' }}>Este campo es requerido</span>}
                    <label className="label" >Precio:</label>
                    <input className="inputs" name='price' value={data.price} type='number' placeholder='Precio del producto...' onChange={handlerChange}></input>
                    <label className="label">Stock:</label>
                    <input className="inputs" name='stock' value={data.stock} type='number' placeholder='Stock del producto...' onChange={handlerChange}></input>
                    <img className="image" src={mImg} style={{width:'500px' , height:'auto', marginBottom:'100px'}}/>
                    <div style={{marginTop:'20px'}}>
                        <input className="file" type="file" onChange={handleChange} id="img" name="img" accept="image/*" />
                        {data.check === true ? <img style={{maxHeight: '200px', width:'auto'}} className="imgCarga" src={data.displayFile}  /> : <img className="imgDisp" src={Uimg} />}
                    </div>
                    {data.check === true && data.name.length > 0 && data.description.length > 0  ? <input className="submit" type='submit' value='Agregar producto' onClick={handleForm}></input> : <span className= "text">Se requieren todos los campos</span>}
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
                    <form style={{marginBottom: '300px'}}>
                        <label>Selecciona una Categoria:</label>
                        <select onChange={handleSelectChange}  >
                            <option >Categorias</option>
                            {existingCategories.map((cat) => <option key={cat.id} value={`${cat.id}/${cat.name}`} name={cat.name} > {cat.name} </option>)}
                        </select>
                        <input type='submit' onClick={handleCategory} value="agregar" />
                    </form>
                    

                </div> : <span></span>
            }
            </div>
        </div>
        </div>
    )
}



