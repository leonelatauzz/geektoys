import React from 'react';

export default class EditOElim extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchbar: '',
            name: '',
            description: '',
            price: '',
            stock: '',
            datosCategory: ['pepe', 'lilo', 'lepo'],
            categories: []
        }
        this.handlerChange = this.handlerChange.bind(this)
        this.handlerSelect = this.handlerSelect.bind(this)
    }
    handlerChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handlerSelect(event){
        if(!(this.state.categories.includes(event.target.value))){
            this.setState = ({ categories: this.state.categories.push(event.target.value)})
        }
   }

   componentDidMount(){

    }

    render() {
        return (
            <div>
                <h3>Editar o eliminar producto</h3>
                <form>
                    <label>Buscar producto:</label>
                    <input name= 'searchbar' value={this.state.searchbar} type='text' placeholder='Título del producto...' onChange={this.handlerChange}></input>
                    <span>producto buscado</span>
                    <button>editar</button>
                    <form>
                        <label>Título:</label>
                        <input name= 'name' value={this.state.name} type='text' placeholder='Título del producto...' onChange={this.handlerChange}></input>
                        <label>Descripción:</label>
                        <input name= 'description' value={this.state.description} type='text' placeholder='Descripción del producto...' onChange={this.handlerChange}></input>
                        <label>Precio:</label>
                        <input name= 'price' value={this.state.price} type='text' placeholder='Precio del producto...' onChange={this.handlerChange}></input>
                        <label>Stock:</label>
                        <input name= 'stock' value={this.state.stock} type='text' placeholder='Stock del producto...' onChange={this.handlerChange}></input>
                        <label>Imágen:</label>
                        <form enctype="multipart/form-data" action="uploader.html" method="POST">
                            <input name="uploadedfile" type="file" />
                            <input type="submit" value="Subir archivo" />
                        </form>
                        <form>
                    <label>Selecciona una Categoria:</label>
                    <select onChange = {this.handlerSelect}> {this.state.datosCategory.map((cat) => <option key = {cat} value = {cat}> {cat} </option>)}
                    </select>
                    </form>
                        <input type='submit' placeholder='Editar' value='Enviar'></input>
                    </form>
                    <input type='submit' placeholder='Eliminar producto' value='Eliminar'></input>
                </form>
            </div>
        )
    }
}

