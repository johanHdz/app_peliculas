const EsquemaPelicula = require('../modelos/Pelicula');
const Calificacion = require('../modelos/Calificacion');
const passport = require('passport');

module.exports.controller = (app) => {
    //Obtener todas las peliculas
    app.get('/peliculas', function(req, res) {
        EsquemaPelicula.find({}, 'nombre descripcion anio_pub genero',
        (error, peliculas) => {
            if (error) { console.log(error); }
            else {
                res.send({
                    peliculas,
                });
            }
        });
    });

    // Obtener una sola pelicula
    app.get('/peliculas/:id', (req, res) => {
        EsquemaPelicula.findById(req.params.id, 'nombre descripcion anio_pub genero', 
        (error, pelicula) => {
            if(error) { console.error(error); }
            else {
                res.send(pelicula);
            }
        })
    });

    // Agregar una nueva pelicula
    app.post('/peliculas', (req, res) => {
        const nuevaPelicula = new EsquemaPelicula({
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            anio_pub: req.body.anio_pub,
            genero: req.body.genero,
        });

         nuevaPelicula.save((error, pelicula) => {
            if(error) {
                console.error(error);
                res.send(error);
            }
            else res.send(pelicula);
         });
    });

    // Calificar una pelicula
    app.post('/peliculas/calificar/:id', (req, res) => {
        const calif = new Calificacion({
            pelicula_id: req.params.id,
            usuario_id: req.body.usuario_id,
            calificacion: req.body.calificacion,
        });

        calif.save(function (error, calificacion) {
            if(error) { console.log(error); }
            else {
                res.send({
                    pelicula_id: calif.pelicula_id,
                    usuario_id: calif.usuario_id,
                    calificacion: calif.calificacion,
                    // calificacion,
                });
            }
        });
    });
}