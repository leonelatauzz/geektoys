import React from 'react'
import {BrowserRouter} from 'react-router-dom'
export default class Search extends React.Component{
    constructor(props){
        super(props)
        this.state = {titulo: ""}
    }
    onSubmit(event){ 
        this.props.productos(this.state.titulo)
        event.preventDefault()
    }
    render(){
    return (
        <form onSubmit = {(e) => this.onSubmit}>
            <input type = "text, number"/>
            <input type = "submit">Buscar</input>
            <BrowserRouter/>
        </form>
        )
    }
}