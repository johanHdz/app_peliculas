const EsquemaPelicula = require('../modelos/Pelicula.js');

module.exports.controller = (app) => {
    //Obtener todas las peliculas
    app.get('/peliculas', (req, res) => {
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
}