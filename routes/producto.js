var express = require('express');
var mdAutentificacion = require('../middleware/autentuficacion');
var app = express();
var Producto = require('../models/producto');


// ===============================
//  Obtener datos de producto
// ===============================
app.get('/', (req, res, next) => {
    var desde = req.query.desde || 0;
    desde = Number(desde);

    Producto.find({estado: true}, )
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
// ===============================
//  Obtener datos de producto por id
// ===============================
app.get('/buscar/:params', (req, res, next) => {
     
    var desde = req.query.desde || 0;
    var id = req.params.id;
    var letra = req.params.params;
    var regex = new RegExp(letra, 'i');
    var body = req.body;
    desde = Number(desde);

    Producto.findById({ nombre: regex, estado: true })
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
                        total: conteo,
                        Total: productos.length
                    });
                });
            })

});
// ===============================
//  Obtener datos de producto por categoria
// ===============================
app.get('/categoria/:categoria', (req, res, next) => {
     
    var desde = req.query.desde || 0;
    var id = req.params.id;
    var letra = req.params.params;
    var body = req.body;
    desde = Number(desde);

    Producto.findById({ categoria: categoriaElejida, estado: true })
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
                        total: conteo,
                        Total: productos.length
                    });
                });
            })

});
// ===============================
//  Obtener datos de producto por id
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


// ===============================
//  crear nuevo producto
// ===============================
app.post('/', mdAutentificacion.verificaToken, (req, res) => {
    var body = req.body;

    var producto = new Producto({
        nombre: body.nombre,
        descripsion: body.descripsion,
        precioCompra: body.precioCompra,
        precioVenta: body.precioVenta,
        usuario: req.usuario._id,
        categoria:req.categoria._id,
        sede: body.sede
    });
    producto.save((err, productoGuardado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error crear producto',
                errors: err
            });
        }
        res.status(201).json({
            ok: true,
            producto: productoGuardado,

        });
    })


})
// ===============================
//  actualizar  producto
// ===============================
app.put('/:id', mdAutentificacion.verificaToken, (req, res) => {

    var id = req.params.id;
    var body = req.body;

    Producto.findById(id, (err, producto) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar producto',
                errors: err
            });
        }
        if (!producto) {
            return res.status(400).json({
                ok: false,
                mensaje: 'la producto con el id' + id + ' no existe',
                errors: { message: 'no existe un producto con el id' }

            });
        }

        producto.nombre = body.nombre;
        producto.descripsion=body.descripsion;
        producto.precioCompra= body.precioCompra,
        producto.precioVenta= body.precioVenta,
        producto.usuario = req.usuario._id;
        producto.sede = body.sede;

        producto.save((err, productoGuardado) => {

            if (err) {

                return res.status(400).json({
                    ok: false,
                    mensaje: 'Error actualizar producto',
                    errors: err
                });
            }

            res.status(200).json({
                ok: true,
                producto: productoGuardado
            });
        });
    });
})


