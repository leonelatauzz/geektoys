import React from 'react';

export default class AgregarCategorias extends React.Component{
    constructor(props) {
        super(props);
        this.state= {
            name: ''
        }
        this.handlerChange = this.handlerChange.bind(this)
    }

    handlerChange(event) {
        this.setState({
            name: event.target.value
        })
    }
    render() {
        return (
            <div>
                <form>
                    <label>Nueva categoría:</label>
                    <input type='text' placeholder='Ingresa tu categoría...' onChange={e => this.handlerChange(e)}></input>
                    <input type='submit' value='Enviar'></input>
                </form>
            </div>
        )
    }
}

