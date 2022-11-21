const Usuario = require('../modelos/Usuario');

const passport = require('passport');
const EstrategiaLocal = require('passport-local').Strategy;
// const passportJWt = require('passport-jwt');
// const jwt = require('jsonwebtoken');

// const ExtractJwt = passportJWt.ExtractJwt;
// const jwtOptions = {};
// jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
// jwtOptions.secretOrKey = 'estaeslaclavesecretaporfavornocompartir'

module.exports.controller = (app) => {
  // Estrategia local
  passport.use(new EstrategiaLocal({
    campoNombreUsuario: 'email',
    campoContrasenia: 'contrasenia',
  }, (email, contrasenia, hecho) => {
    Usuario.obtenerUsuarioporEmail(email, (err, usuario) => {
      if (err) { return hecho(err); }
      else if (!usuario) { return hecho(null, false); }
      else {
        Usuario.compararContrasenia(contrasenia, usuario.contrasenia, (error, coincide) => {
          if (coincide) {
            return hecho(null, usuario);
          } else {
            return hecho(null, false);
          }
        });
        return true;
      }
    });
  }));
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
  app.post('/usuarios/login', passport.authenticate('local', {failureRedirect: '/usuarios/login'}), (req, res) => {
   res.redirect('/'); 
    // if (req.body.email && req.body.contrasenia) {
    //   const email = req.body.email;
    //   const contrasenia = req.body.constrasenia;
    //   Usuario.obtenerUsuarioporEmail(email, (err, usuaruio) => {
    //     if (!usuario) {
    //       res.status(404).json({ mensaje: 'El usuario no existe' });
    //     } else {
    //       Usuario.compararContrasenia(contrasenia, usuario.contrasenia, (error, coincide) => {
    //         if (error) throw error;
    //         else if (coincide) {
    //           const payload = { id: usuario.id };
    //           const token = jwt.sign(payload, jwtOptions.secretOrKey);
    //           res.json({ mensaje: 'ok', token });
    //         } else {
    //           res.status(401).json({ mensaje: 'Contraseña incorrecta' });
    //         }
    //       });
    //     }
    //   });
    // }
  });

  passport.serializeUser((usuario, hecho) => {
    hecho(null, usuario.id);
  });

  passport.deserializeUser((id, hecho) => {
    Usuario.findById(id, (err, usuario) => {
      hecho(err, usuario);
    });
  });
}