import React from 'react';

export default class EditOElim extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <div>
    <h3>Editar o eliminar producto</h3>
    <form>
        <label>Buscar producto:</label>
        <input type='text' placeholder='Título del producto...'></input>
        <span>producto buscado</span>
        <button>editar</button>
        <form>
            <label>Título:</label>
            <input type='text' placeholder='Título del producto...'></input>
            <label>Descripción:</label>
            <input type='text' placeholder='Descripción del producto...'></input>
            <label>Precio:</label>
            <input type='text' placeholder='Precio del producto...'></input>
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

