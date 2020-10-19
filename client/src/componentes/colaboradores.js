import React from 'react'
import './colaboradores.css'
import { useHistory } from 'react-router-dom'

export default function Colaboradores(){

    let history = useHistory();

    const handleHome = (e) => {
        e.preventDefault();
        history.push('/')
    }
    return(
        <div className = "JC">
            <img src="https://i.imgur.com/QUOAdAS.png" width="300" height="100" alt=""  style={{cursor: 'pointer'}} onClick={handleHome}></img>
            <h1>Desarrolladores del G9</h1>
            
            {/*SEPARADOR DE INTEGRANTES*/}
            <div className = "Ima">
            <img src= "https://i.imgur.com/RlEnYrF.jpg" alt="Lisette :)"/>
            <div className = "Diseño">
            <label>Nombre Y Apellido: Lisette Alonso</label>
            <label>Edad: 26</label>
            <label>Hobbies: Codear y cantar</label>
            <label>Linkedin: <a href="https://www.linkedin.com/in/lisette-alonso-2b72a8175">Lisette Alonso</a></label>
            <label> Descripcion: Parece que nunca tuvo un mal dia, siempre ayuda en Front y Back</label>
            </div>
            </div>
             {/*SEPARADOR DE INTEGRANTES*/}
             <div className = "Ima">
            <img src= "https://i.imgur.com/5fOgGYm.jpg" alt="Dedos Magicos"/>
            <div className = "Diseño">
            <label>Nombre Y Apellido: Julianno Luigi Pattituci</label>
            <label>Edad: 26</label>
            <label>Hobbies: Jugar a LOL</label>
            <label>Linkedin: <a href="https://www.linkedin.com/in/julianno-patitucci-434b82180">Julianno Luigi Patitucci</a></label>
            <label> Descripcion: Es muy piola, a veces se descuida que tiene el meet prendido y se pone a cantar</label>
            </div>
            </div>
             {/*SEPARADOR DE INTEGRANTES*/}
            <div className = "Ima">
            <img src= "https://i.imgur.com/B9sDwQ3.png" alt="Juani"/>
            <div className = "Diseño">
            <label>Nombre Y Apellido: Juan Cruz Roldan Abiakel</label>
            <label>Edad: 21</label>
            <label>Hobbies: Ver ofertas de trabajo de programadores</label>
            <label>Linkedin: <a href="https://www.linkedin.com/in/juan-cruz-roldan-abiakel-1006b5197">Juan Cruz Roldan Abiakel</a></label>
            <label> Descripcion: Siempre dice algo que te hace reir, es muy buen compañero y ayuda a los demas</label>
            </div>
            </div>
               {/*SEPARADOR DE INTEGRANTES*/}
            <div className = "Ima">
            <img src= "https://i.imgur.com/rCRKAl2.png" alt="Lu"/>
            <div className = "Diseño">
            <label>Nombre Y Apellido: Leonela Von Tauzz</label>
            <label>Edad: 29</label>
            <label>Hobbies: Poledance</label>
            <label>Linkedin: <a href="https://www.linkedin.com/in/leonela-tauzz-004b70178">Leonela Von Tauzz</a></label>
            <label> Descripcion: Una mujer todo terreno, se adapta a todo y siempre apoya a quien sea</label>
            </div>
            </div>
             {/*SEPARADOR DE INTEGRANTES*/}
             <div className = "Ima">
            <img src= "https://i.imgur.com/VlzYtUR.jpg" alt="Leo"/>
            <div className = "Diseño">
            <label>Nombre Y Apellido: Leonardo Kuinoso Cifuentes</label>
            <label>Edad: 22</label>
            <label>Hobbies: Hacer cine y Hellboys</label>
            <label>Linkedin: <a href="https://www.linkedin.com/in/leonardo-kuinoso-cifuentes-orjuela-916634161">Leonardo Cifuentes</a></label>
            <label> Descripcion: El Dios de backend, y buscador profesional de GIFs en whatsapp</label>
            </div>
            </div>
               {/*SEPARADOR DE INTEGRANTES*/}
               <div className = "Ima">
            <img src= "https://i.imgur.com/Yjh1NwE.jpg" alt="El crack ;)"/>
            <div className = "Diseño">
            <label>Nombre Y Apellido: David Agustin Hemmings</label>
            <label>Edad: 18</label>
            <label>Hobbies: Jugar a la pelota y la programacion</label>
            <label>Linkedin: Undefined</label>
            <label> Descripcion: Se autoputea demasiado, tiene alta paciencia para enseñar y explicar</label>
            </div>
            </div>
            {/*SEPARADOR DE INTEGRANTES*/}
            <div className = "Ima">
            <img src= "https://i.imgur.com/0jd9OCi.jpg" alt="Castro"/>
            <div className = "Diseño">
            <label>Nombre Y Apellido: Fidel Villegas</label>
            <label>Edad: 27</label>
            <label>Hobbies: Ver pasion de gavilanes</label>
            <label>Linkedin: <a href="https://www.linkedin.com/in/fidel-villegas-arias">Fidel Villegas</a></label>
            <label> Descripcion: Generalmente esta callado pero cuando hay problemas siempre tira la justa, y le pelea mucho a David</label>
            </div>
            </div>
        </div>
    )
}