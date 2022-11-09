const Usuario = require('../modelos/Usuario');

module.exports.controller = (app) => {
    // Registrar un usuario
    app.post('/usuarios/registro', (req, res) => {
        const nombre = req.body.nombre;
        const email = req.body.email;
        const contrasenia = req.body.contrasenia;
        const nuevoUsuario = new Usuario({
            nombre,
            email,
            contrasenia,
        });

        Usuario.crearUsuario(nuevoUsuario, (error, usuario) => {
            if(error) { console.error(error); }
            else
                res.send({ usuario });
        });
    });
}