const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require(morgan);
const fs = require('fs');

const app = express();
const router = express.Router();
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors);

// conectar a MongoDB
mongoose.connect('mongodb://localhost/cinestack', function() {
    console.log("Conexión exitosa");
})
.catch(err => {
    console.error('Error iniciando aplicación', err.stac);
    process.exit(1);
});

router.get('/', function(req, res) {
    res.json({ mensaje: 'API iniciliazaad'});
});

const puerto = process.env.API_PORT || 8081;
app.use('/', router);
app.listen(puerto, function() {
    console.log('API corriendo en http://locahost:${puerto}');
});