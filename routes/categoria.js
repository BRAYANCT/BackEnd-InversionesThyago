var express = require('express');

var mdAutentificacion = require('../middleware/autentuficacion');

var app = express();
var Categoria = require('../models/categoria');



// ===============================
//  actualizar  categoria
// ===============================
app.put('/:id', mdAutentificacion.verificaToken, (req, res) => {

    var id = req.params.id;
    var body = req.body;

    Categoria.findById(id, (err, categoria) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar categoria',
                errors: err
            });
        }
        if (!categoria) {
            return res.status(400).json({
                ok: false,
                mensaje: 'la categoria con el id' + id + ' no existe',
                errors: { message: 'no existe un categoria con el id' }

            });
        }

        categoria.nombre = body.nombre;
        categoria.descripsion=body.descripsion;
        categoria.usuario = req.usuario._id;

        categoria.save((err, categoriaGuardado) => {

            if (err) {

                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error actualizar categoria',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                categoria: categoriaGuardado
            });
        });
    });
});

// ===============================
//  Obtener datos de categoria
// ===============================

app.get('/', (req, res, next) => {

    var desde = req.query.desde || 0;
    desde = Number(desde);

    Categoria.find({}, )
        .skip(desde)
        .limit(5)
        .populate('usuario', 'nombre email')
        .populate('categoria')
        .exec(

            (err, categorias) => {

                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando categoria',
                        errors: err
                    });
                }
                Empleado.count({}, (err, conteo) => {
                    res.status(200).json({
                        ok: true,
                        categorias: categorias,
                        total: conteo
                    });
                });
            })

});
// ===============================
//   buscar  categoria nombre
// ===============================
app.get('/:producto', (req, res, next) => {
     
    var desde = req.query.desde || 0;
    var id = req.params.id;
    var body = req.body;
    desde = Number(desde);

    Producto.findById({_id: id})
        .skip(desde)
        .limit(5)
        .populate('usuario', 'nombre ')
        .populate('categoria','nombre ')
        .populate('sede','nombre ')
        .exec(

            (err, producto) => {

                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando productos',
                        errors: err
                    });
                }
                producto.count({}, (err, conteo) => {
                    res.status(200).json({
                        ok: true,
                        producto: producto,
                        total: conteo
                    });
                });
            })

});
// router.get('/:id', (req, res) => {

//     var desde = req.query.desde || 0;
//     desde = Number(desde);
//     let id = req.params.id;

//     Categoria.findOne({ _id: id })
//         .skip(desde)
//         .limit(5)
//         .exec(
//         (err, usuario) => {
//         if (err) {
//             res.json(err)
//         } else {
//             res.json(usuario)
//         }
//     });
// });
// ===============================
//  crear nueva categoria
// ===============================

app.post('/', mdAutentificacion.verificaToken, (req, res) => {
    var body = req.body;

    var categoria = new Categoria({
        nombre: body.nombre,
        descripsion: body.descripsion,
        usuario: req.usuario._id        
    });
    categoria.save((err, categoriaGuardado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error crear categoria',
                errors: err
            });
        }
        res.status(201).json({
            ok: true,
            categoria: categoriaGuardado,

        });
    })


})


