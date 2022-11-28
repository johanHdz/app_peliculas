const Usuario = require('../modelos/Usuario');
const passport = require('passport');
const config = require('./../config/Config');
const Estrategia = require('passport-google-oauth20').Strategy;

module.exports.controller = (app) => {
    // Estrategia de google
    passport.use(new Estrategia({
        clientID: config.GOOGLE_APP_ID,
        clientSecret: config.GOOGLE_APP_SECRET,
        callbackURL: '/login/google/return',
    }, (tokenAcceso, refreshToken, perfil, cb) => {
        // Manejar login con google
        const email = perfil.email[0].value;
        Usuario.obtenerUsuarioporEmail(email, (err, usuario) => {
            if (!usuario) {
                const nuevoUsuario = new Usuario({
                    nombre: perfil.displayName,
                    email: email,
                    idExterno: perfil.id,
                });
                Usuario.crearUsuario(nuevoUsuario, (error) => {
                    if(error) {
                        // Mensaje error
                    } else {
                        return cb(null, usuario);
                    }
                });
            } else {
                return cb(null, usuario);
            }
            return true;
        });
    }));

    app.get('/login/google', passport.authenticate('google', { scope: ['email'] }));
    
    app.get('/login/google/return', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
        res.redirect('/');
    });
}