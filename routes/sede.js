var express = require('express');

var mdAutentificacion = require('../middleware/autentuficacion');

var app = express();

var Sede = require('../models/sede');

// ===============================
//  Obtener datos de las sede
// ===============================
app.get('/', (req, res, next) => {
    var desde = req.query.desde || 0;
    desde = Number(desde);

    Sede.find({})
        .skip(desde)
        .limit(5)
        .populate('usuario', 'nombre email')
        .exec(

            (err, sedes) => {

                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando sede',
                        errors: err
                    });
                }

                Sede.count({}, (err, conteo) => {
                    res.status(200).json({
                        ok: true,
                        sedes: sedes,
                        total: conteo
                    });
                })
            })

});








// ===============================
//  actualizar  sede
// ===============================
app.put('/:id', mdAutentificacion.verificaToken, (req, res) => {

    var id = req.params.id;
    var body = req.body;

    Sede.findById(id, (err, sede) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar sede',
                errors: err
            });
        }
        if (!sede) {
            return res.status(400).json({
                ok: false,
                mensaje: 'la sede con el id' + id + ' no existe',
                errors: { message: 'no existe un sede con el id' }

            });
        }

        sede.nombre = body.nombre;
        sede.usuario = req.usuario._id;

        sede.save((err, sedeGuardado) => {

            if (err) {

                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error actualizar sede',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                sede: sedeGuardado
            });
        });
    });
});
// ===============================
//  crear nuevo sede
// ===============================
app.post('/', mdAutentificacion.verificaToken, (req, res) => {
        var body = req.body;

        var sede = new Sede({
            nombre: body.nombre,
            usuario: req.usuario._id
        });
        sede.save((err, sedeGuardado) => {

            if (err) {
                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error crear sede',
                    errors: err
                });
            }
            res.status(201).json({
                ok: true,
                sede: sedeGuardado,

            });
        })


    }),

    // ===============================
    //  borrar sede
    // ===============================
    app.delete('/:id', mdAutentificacion.verificaToken, (req, res) => {

        var id = req.params.id;

        Sede.findByIdAndRemove(id, (err, sedeBorrado) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Error borrar sede',
                    errors: err
                });
            }
            if (!sedeBorrado) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'No esxiste el sede',

                });
            }
            res.status(200).json({
                ok: true,
                sede: sedeBorrado
            });

        })
    });


module.exports = app;