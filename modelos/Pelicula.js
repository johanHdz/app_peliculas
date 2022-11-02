const mongoose = require('mongoose');

const Esquema = mongoose.Schema;
const EsquemaPelicula = new Esquema({
    nombre: String,
    descripcion: String,
    anio_pub: Number,
    genero: String
});

const Pelicula = mongoose.model('Pelicula', EsquemaPelicula);
module.exports = Pelicula;