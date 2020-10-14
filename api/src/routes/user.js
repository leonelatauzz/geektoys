const server = require('express').Router();
const bodyParser = require('body-parser');
// const app = express();
const { Users } = require('../db.js');

// app.use(bodyParser.urlencoded({extended: false}));
// app.use(bodyParser.json());
// let usuario={
//     nombre: '',
//     apellido: '',
// };
// let respuesta ={
//     error: false,
//     codigo: 200,
//     mensaje:''
// };

// server.get('/', (req,res)=>{
//     respuesta = {
//         error: true,
//         codigo: 200,
//         mensaje: 'Punto de inicio'
//     };
//     res.send(respuesta);
// });
// server.get('/usuario', (req,res)=>{
//     respuesta = {
//         error: false,
//         codigo: 200,
//         mensaje:''
//     };
//     if(usuario.nombre === '' || usuario.apellido === ''){
//         respuesta = {
//             error: true,
//             codigo: 501,
//             mensaje: 'El usuario no ha sido creado'
//         };
//     }
//     else{
//         respuesta = {
//             error: false,
//             codigo: 200,
//             mensaje: 'respuesta del usuario',
//             respuesta: usuario
//         };
//     }
//     res.send(respuesta)
// })

/*CREACION DE USUARIO*/
// server.post('/usuario', (req, res)=>{
//     if(!req.body.nombre || !req.body.apellido){
//         respuesta = {
//             error: true,
//             codigo: 502,
//             mensaje: 'El campo nombre y apellido son requeridos'
//         };
//     }else {
//         if(usuario.nombre !== '' || usuario.apellido !== ''){
//             respuesta ={
//                 error: true,
//                 codigo: 503,
//                 mensaje: 'El usuario fue creado previamente'
//             };
//         } else{
//             usuario = {
//                 nombre: req.body.nombre,
//                 apellido: req.body.apellido
//             };
//             respuesta = {
//                 error: false,
//                 codigo: 200,
//                 mensaje: 'Usuario creado',
//                 respuesta: usuario
//             };
//         }
//     }
//     res.send(respuesta);
// });

/*FLASHADA MIA */
server.post('/', (req, res)=>{
    Users.create({
    name: req.body.name,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password
    }).then(function(){
        res.status(201).send("Usuario creado correctamente")
    })
})