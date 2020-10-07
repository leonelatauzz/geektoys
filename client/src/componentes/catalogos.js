import React from 'react';

export default class Categorias extends React.Component{
    constructor(props) {
        super(props);
        this.state= {

        }
    }

    render() {
        return (
            <div>
                <form>
                    <label>Nueva categoría:</label>
                    <input type='text' placeholder='Ingresa tu categoría...'></input>
                    <input type='submit' value='Enviar'></input>
                </form>
            </div>
        )
    }
}

