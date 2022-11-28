const Usuario = require('../modelos/Usuario');
const passport = require('passport');
const config = require('./../config/Config');
const Estrategia = require('passport-linkedin-oauth2').Strategy;

module.exports.controller = (app) => {
  // Estrategia LinkedIn
  passport.use(new Estrategia({
    consumerKey: config.LINKEDIN_APP_ID,
    consumerSecret: config.LINKEDIN_APP_SECRET,
    callbackURL: '/login/linkedin/return',
    profileFields: ['id', 'first-name', 'last-name',
      'email-address'],
  }, (tokenAcceso, refreshToken, perfil, cb) => {
    // Manejar login con LinkedIn
    const email = perfil.email.value;
    Usuario.obtenerUsuarioporEmail(email, (err, usuario) => {
      if(!usuario) {
        const nuevoUsuario = new Usuario({
          nombre: perfil.displayName,
          email: email,
          idExterno: perfil.id,
        });
        Usuario.crearUsuario(nuevoUsuario, (error) => {
          if(error) {
            // Manejar el error
          } else {
            return cb(null, usuario);
          }
        });
      } else {
        return cb(null, usuario);
      }
      return true;
    })
  }));

  app.get('login/linkedin', passport.authenticate('linkedin'));

  app.get('/login/linkedin/return', passport.authenticate('linkedin', { failureRedirect: '/login' }), (req, res) => {
    res.redirect('/');
  });
};