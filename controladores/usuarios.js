const Usuario = require('../modelos/Usuario');
const passportJWt = require('passport-jwt');
const jwt = require('jsonwebtoken');

const ExtractJwt = passportJWt.ExtractJwt;
const jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
jwtOptions.secretOrKey = 'estaeslaclavesecretaporfavornocompartir'

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
      if (error) {
        console.error(error);
        res.status(422).json({
          mensaje: 'Algo salió mal de nuestra parte, por favor intentelo después de unos minutos'
        });
      }
      else
        res.send({ usuario });
    });
  });

  // Inicio de sesión
  app.post('/usuarios/login', (req, res) => {
    if (req.body.email && req.body.contrasenia) {
      const email = req.body.email;
      const contrasenia = req.body.constrasenia;
      Usuario.obtenerUsuarioporEmail(email, (err, usuaruio) => {
        if (!usuario) {
          res.status(404).json({ mensaje: 'El usuario no existe' });
        } else {
          Usuario.compararContrasenia(contrasenia, usuario.contrasenia, (error, coincide) => {
            if (error) throw error;
            else if (coincide) {
              const payload = { id: usuario.id };
              const token = jwt.sign(payload, jwtOptions.secretOrKey);
              res.json({ mensaje: 'ok', token });
            } else {
              res.status(401).json({ mensaje: 'Contraseña incorrecta' });
            }
          });
        }
      });
    }
  });
}