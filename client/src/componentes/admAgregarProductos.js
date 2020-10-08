import React from 'react';

export default class AgregarP extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            description: '',
            price: '',
            stock: '',
            datosCategory: [],
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
                <h3>Agregar nuevo producto</h3>
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
                        
                    <input type='submit' value='Agregar'></input>
                </form>
            </div>
        )
    }
}
    
