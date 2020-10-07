import React from 'react';

export default function AgregarP() {
    return (
        <div>
            <h3>Agregar nuevo producto</h3>
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
                <input type='submit' value='Agregar'></input>
            </form>
        </div>
    )
}
