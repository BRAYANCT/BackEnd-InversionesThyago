var express = require('express');

var app = express();

//importar las rutas a buscar
var Sede = require('../models/sede');
var Empleado = require('../models/empleado');
var Usuario = require('../models/usuario');

//busqueda poerr collection
app.get('/coleccion/:tabla/:busqueda', (req, res) => {

    var busqueda = req.params.busqueda;
    var tabla = req.params.tabla;
    var regex = new RegExp(busqueda, 'i');

    var promesa;

    switch (tabla) {
        case 'usuarios':
            promesa = buscarUsuarios(busqueda, regex);
            break;
        case 'empleados':
            promesa = buscarEmpleados(busqueda, regex);
            break;
        case 'sedes':
            promesa = buscarSedes(busqueda, regex);
            break;
        default:
            return res.status(400).json({
                ok: true,
                mensaje: 'no se encontro los resulados',
                error: { menssage: 'no valido' }

            });
    }
    promesa.then(data => {
        return res.status(200).json({
            ok: true,
            [tabla]: data

        });
    })
})



//busqueda general 
app.get('/todo/:busqueda', (req, res, next) => {

    var busqueda = req.params.busqueda;
    var regex = new RegExp(busqueda, 'i');

    Promise.all([
        buscarSedes(busqueda, regex),
        buscarEmpleados(busqueda, regex),
        buscarUsuarios(busqueda, regex)
    ])

    .then(respuestas => {

        res.status(200).json({
            ok: true,
            sedes: respuestas[0],
            empleados: respuestas[1],
            usuarios: respuestas[2]
        });
    })




});

function buscarSedes(busqueda, regex) {

    return new Promise((resolve, reject) => {

        Sede.find({ nombre: regex })
            .populate('usuario', 'nombre email')
            .exec(
                (err, sedes) => {

                    if (err) {
                        reject('error al cargar sedes', err);
                    } else {
                        resolve(sedes);
                    }
                });
    });
}

function buscarEmpleados(busqueda, regex) {

    return new Promise((resolve, reject) => {

        Empleado.find({ nombre: regex })
            .populate('usuario', 'nombre email')
            .populate('sede')
            .exec((err, empleados) => {

                if (err) {
                    reject('error al cargar empleados', err);
                } else {
                    resolve(empleados);
                }
            });
    });
}

function buscarUsuarios(busqueda, regex) {

    return new Promise((resolve, reject) => {

        Usuario.find({}, 'nombre email rol')
            .or([{ 'nombre ': regex }, { 'email': regex }])
            .exec((err, usuarios) => {
                if (err) {
                    reject('error al cargar usuarios', err);
                } else {
                    resolve(usuarios);
                }

            });


    });
}


module.exports = app;