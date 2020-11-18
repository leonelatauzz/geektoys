const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes/index.js');
const path = require('path');
const cors = require('cors')
const passport = require('passport')

const jwt = require('jsonwebtoken')




require('./db.js');

const server = express();

server.name = 'API';
server.set('', )
server.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
server.use(bodyParser.json({ limit: '50mb' }));
server.use(cookieParser());
server.use(morgan('dev'));


server.use(`/uploads`, express.static(path.join(__dirname, '/routes/uploads')));


server.use(require('express-session')({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));


// Inicializa Passport y recupera el estado de autenticación de la sesión.
server.use(passport.initialize());
server.use(passport.session());

// Middleware para mostrar la sesión actual en cada request
server.use((req, res, next) => {
  //  console.log(req.session);
  //  console.log(req.user);
  next();
});

server.use(`/uploads`, express.static(path.join(__dirname, '/routes/uploads')));


passport.serializeUser(function(user, done) {
  done(null, user.id);
});


passport.deserializeUser(function(id, done) {
  User.findByPk(id)
    .then((user) => {
      done(null, user);
      console.log(user)
    })
    .catch(err => {
      return done(err);
    })
});


passport.serializeUser(function (user, done){
  done(null, user.id);
});

passport.deserializeUser(function(id, done){
    User.findByPk(id).then((user) =>{
      done(null, user);
    })
    .catch(err =>{
      return done (err);
    })
});

server.use(passport.initialize());
server.use(passport.session());

server.use((req, res, next) =>{
  next();
});


server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

server.use('/', routes);


// Error catching endware.
server.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});

module.exports = server;
