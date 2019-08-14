var express = require('express');

var mdAutentificacion = require('../middleware/autentuficacion');

var app = express();

var Empleado = require('../models/empleado');

// ===============================
//  Obtener datos de empleado
// ===============================
app.get('/', (req, res, next) => {
    var desde = req.query.desde || 0;
    desde = Number(desde);

    Empleado.find({}, )
        .skip(desde)
        .limit(5)
        .populate('usuario', 'nombre email')
        .populate('sede')
        .exec(

            (err, empleados) => {

                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando empleado',
                        errors: err
                    });
                }
                Empleado.count({}, (err, conteo) => {
                    res.status(200).json({
                        ok: true,
                        empleados: empleados,
                        total: conteo
                    });
                });
            })

});








// ===============================
//  actualizar  empleado
// ===============================
app.put('/:id', mdAutentificacion.verificaToken, (req, res) => {

    var id = req.params.id;
    var body = req.body;

    Empleado.findById(id, (err, empleado) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar empleado',
                errors: err
            });
        }
        if (!empleado) {
            return res.status(400).json({
                ok: false,
                mensaje: 'la empleado con el id' + id + ' no existe',
                errors: { message: 'no existe un empleado con el id' }

            });
        }

        empleado.nombre = body.nombre;
        empleado.usuario = req.usuario._id;
        empleado.sede = body.sede;

        empleado.save((err, empleadoGuardado) => {

            if (err) {

                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error actualizar empleado',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                empleado: empleadoGuardado
            });
        });
    });
});
// ===============================
//  crear nuevo empleado
// ===============================
app.post('/', mdAutentificacion.verificaToken, (req, res) => {
        var body = req.body;

        var empleado = new Empleado({
            nombre: body.nombre,
            usuario: req.usuario._id,
            sede: body.sede
        });
        empleado.save((err, empleadoGuardado) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error crear empleado',
                    errors: err
                });
            }
            res.status(201).json({
                ok: true,
                empleado: empleadoGuardado,

            });
        })


    }),

    // ===============================
    //  borrar usuario
    // ===============================
    app.delete('/:id', mdAutentificacion.verificaToken, (req, res) => {

        var id = req.params.id;

        Empleado.findByIdAndRemove(id, (err, empleadoBorrado) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error borrar empleado',
                    errors: err
                });
            }
            if (!empleadoBorrado) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'No esxiste el empleado',

                });
            }
            res.status(200).json({
                ok: true,
                empleado: empleadoBorrado
            });

        })
    });


module.exports = app;