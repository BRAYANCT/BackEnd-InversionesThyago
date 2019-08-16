const {Router} = require('express');
var express = require('express');
var mdAutentificacion = require('../middleware/autentuficacion');
var app = express();
const router = Router();const Detalle = require('../models/ventaDetalle');

// ===============================
//  Obtener datos de detalles
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
//  crear nuevo empleado
// ===============================
app.post('/', mdAutentificacion.verificaToken, (req, res) => {
    var body = req.body;

    var detalle = new Detalle({
        venta: body.nombre,
        
         producto:body.producto,
         producto:body.precioVenta,
         cantidad:body.cantidad
   
    });
    detalle.save((err, detalleGuardado) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Error crear detalle',
                errors: err
            });
        }
        res.status(201).json({
            ok: true,
            detalle: detalleGuardado,

        });
    })


})
