import React, { useState } from 'react';
import axios from 'axios'
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getProducts, getCategoryProduct } from '../Redux/Actions/actions'
import mImg from './images/marioPic.png';
import Uimg from './images/up.png'
import Swal from 'sweetalert2'
import SuperSimpleNavbarAdmin from './SuperSimpleNavbarAdmin'


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
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Producto agregado correctamente',
                showConfirmButton: false,
                timer: 1500
              })                            
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
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Categoria agregada correctamente',
                showConfirmButton: false,
                timer: 1500
              })                            
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

   

    return (
        <div>
            <SuperSimpleNavbarAdmin />
       
        <div className="imagen_fondo">
        <div className="div_container" >
            <div className="juan" style={{height: '650px', backgroundColor: 'white', height: '65vh', marginTop: '5vw'}}>            
            {data.send === false ?
                <form className="form" >
                    <h3 className="titulo" >Agregar nuevo producto</h3>
                    <label className="label" >Título:</label>
                    <input  className="inputs" name='name' value={data.name} type='text' placeholder='Título del producto...' onChange={handlerChange}></input>
                    {data.name.length === 0 && <span style={{ color: 'red' }}>Este campo es requerido</span>}
                    <label className="label" >Descripción:</label>
                    <input className="inputs" name='description' value={data.description} type='text' placeholder='Descripción del producto...' onChange={handlerChange}></input>
                    {data.description.length === 0 && <span style={{ color: 'red' }}>Este campo es requerido</span>}
                    <label className="label" >Precio:</label>
                    <input className="inputs" name='price' value={data.price} type='number' placeholder='Precio del producto...' onChange={handlerChange}></input>
                    <label className="label">Stock:</label>
                    <input className="inputs" name='stock' value={data.stock} type='number' placeholder='Stock del producto...' onChange={handlerChange}></input>
                    <img className="image" src={mImg} style={{width:'500px' , height:'auto', marginBottom:'100px'}}/>
                    <div>
                        <input className="file" type="file" onChange={handleChange} id="img" name="img" accept="image/*" style={{display:'flex', flexDirection:''}}/>
                        {data.check === true ? <img  className="imgCarga" src={data.displayFile}  /> : <img className="imgDisp" src={Uimg} />}
                    </div>
                    {data.check === true && data.name.length > 0 && data.description.length > 0  ? <input className="submit" type='submit' value='Agregar producto' onClick={handleForm}></input> : <span className= "text">Se requieren todos los campos</span>}
                </form> : data.hola === false ? <div>
                    <div className= "labelin" style={{marginTop: '1vw'}}>
                        ¿Deseas agregar una categoria al producto?
                        </div>
                </div  > : <div>
                        <div className= "labelin">
                            ¿Deseas agregar otra categoria al producto?
                        </div>
                    </div>}

            { data.send === true ?
                <div>
                    <form className='Form_cat_admin'>
                        <label className= "textin">Selecciona una Categoria:</label>
                        <select onChange={handleSelectChange}  >
                            <option style={{borderRadius:'15px', border:'black 1px'}}>Categorias</option>
                            {existingCategories.map((cat) => <option key={cat.id} value={`${cat.id}/${cat.name}`} name={cat.name} > {cat.name} </option>)}
                        </select>
                        <input type='submit' onClick={handleCategory} value="Agregar" />
                    </form>
                    

                </div> : <span></span>
            }
            </div>
        </div>
        </div>
        </div>
    )
}

