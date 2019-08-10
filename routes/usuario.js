var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var mdAutentificacion = require('../middleware/autentuficacion');

var app = express();
var Usuario = require('../models/usuario');

// ===============================
//  Obtener datos de usuario
// ===============================
app.get('/', (req, res, next) => {

    Usuario.find({}, 'nombre email img rol')
        .exec(

            (err, usuarios) => {

                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando usuarios',
                        errors: err
                    });
                }
                res.status(200).json({
                    ok: true,
                    usuarios: usuarios
                });
            })

});








// ===============================
//  actualizar  usuario
// ===============================
app.put('/:id', mdAutentificacion.verificaToken, (req, res) => {

    var id = req.params.id;
    var body = req.body;

    Usuario.findById(id, (err, usuario) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuario',
                errors: err
            });
        }
        if (!usuario) {
            return res.status(400).json({
                ok: false,
                mensaje: 'El usuario con el id' + id + 'no existe',
                errors: { message: 'no existe un usiari con el id' }

            });
        }
        usuario.nombre = body.nombre;
        usuario.email = body.email;
        usuario.rol = body.rol;

        usuario.save((err, usuarioGuardado) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error actualizar usuarios',
                    errors: err
                });
            }
            usuarioGuardado.password = ':)';
            res.status(200).json({
                ok: true,
                usuario: usuarioGuardado
            });
        });
    });
});
// ===============================
//  crear nuevo usuario
// ===============================
app.post('/', mdAutentificacion.verificaToken, (req, res) => {
        var body = req.body;

        var usuario = new Usuario({
            nombre: body.nombre,
            email: body.email,
            password: bcrypt.hashSync(body.password, 10),
            img: body.img,
            rol: body.rol
        });
        usuario.save((err, usuarioGuardado) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error crear usuarios',
                    errors: err
                });
            }



            res.status(201).json({
                ok: true,
                usuario: usuarioGuardado,
                usuariotoken: req.usuario
            });
        })


    }),

    // ===============================
    //  borrar usuario
    // ===============================
    app.delete('/:id', mdAutentificacion.verificaToken, (req, res) => {

        var id = req.params.id;

        Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error borrar usuarios',
                    errors: err
                });
            }
            if (!usuarioBorrado) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'No esxiste el usuario',

                });
            }
            res.status(200).json({
                ok: true,
                usuario: usuarioBorrado
            });

        })
    });


module.exports = app;