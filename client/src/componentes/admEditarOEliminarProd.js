import React from 'react';

export default class EditOElim extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            buscador: '',
            titulo: '',
            descripcion: '',
            precio: ''
        }
        this.handlerChange = this.handlerChange.bind(this)
    }
    handlerChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    render() {
        return (
            <div>
                <h3>Editar o eliminar producto</h3>
                <form>
                    <label>Buscar producto:</label>
                    <input name= 'buscador' value={this.state.buscador} type='text' placeholder='Título del producto...' onChange={this.handlerChange}></input>
                    <span>producto buscado</span>
                    <button>editar</button>
                    <form>
                        <label>Título:</label>
                        <input name= 'titulo' value={this.state.titulo} type='text' placeholder='Título del producto...' onChange={this.handlerChange}></input>
                        <label>Descripción:</label>
                        <input name= 'descripcion' value={this.state.descripcion} type='text' placeholder='Descripción del producto...' onChange={this.handlerChange}></input>
                        <label>Precio:</label>
                        <input name= 'precio' value={this.state.precio} type='text' placeholder='Precio del producto...' onChange={this.handlerChange}></input>
                        <label>Imágen:</label>
                        <form enctype="multipart/form-data" action="uploader.html" method="POST">
                            <input name="uploadedfile" type="file" />
                            <input type="submit" value="Subir archivo" />
                        </form>
                        <input type='submit' placeholder='Editar' value='Enviar'></input>
                    </form>
                    <input type='submit' placeholder='Eliminar producto' value='Eliminar'></input>
                </form>
            </div>
        )
    }
}

