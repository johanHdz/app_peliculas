const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const passportJWT = require('passport-jwt');
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strateggy;
const jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
jwtOptions.secretOrKey = 'apppeliculasfullstack1';

const app = express();
const router = express.Router();
const serveStatic = require('serve-static');
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());
app.use(passport.initialize());

// conectar a MongoDB
mongoose.connect('mongodb://localhost/cinestack', function() {
    console.log("Conexión exitosa");
})
.catch(err => {
    console.error('Error iniciando aplicación', err.stack);
    process.exit(1);
});

// Incluir controladores
fs.readdirSync('controladores').forEach(function (archivo) {
    if(archivo.substr(-3) == '.js') {
        const ruta = require('./controladores/'+archivo);
        ruta.controller(app);
    }
})
app.use(serveStatic(__dirname + '/dist'));

router.get('/', function(req, res) {
    res.json({ mensaje: 'API iniciliazada'});
});

const puerto = process.env.API_PORT || 8081;
app.use('/', router);
app.listen(puerto, function() {
    console.log(`API corriendo en http://locahost:${puerto}`);
});