var express = require('express');

var fileUpload = require('express-fileupload');
var fs = require('fs');

var app = express();

var Usuario = require('../models/usuario');
var Empleado = require('../models/empleado');
var Sede = require('../models/sede');

//opsiones
app.use(fileUpload());


app.put('/:tipo/:id', (req, res, next) => {

    var tipo = req.params.tipo;
    var id = req.params.id;


    //tipos validos
    var tiposValidos = ['sedes', 'usuarios', 'empleados', 'productos'];

    if (tiposValidos.indexOf(tipo) < 0) {
        return res.status(400).json({
            ok: false,
            mensaje: 'Tipo de colección no es válida',
            errors: { mensage: 'Tipo de colección no es válida' }
        });
    }

    if (!req.files) {
        return res.status(400).json({
            ok: false,
            mensaje: 'No selecciono nada',
            errors: { mensage: 'Debe de seleccionar una imagen' }
        });
    }
    // Obtener nombre del archivo
    var archivo = req.files.imagen;
    var nombreCortado = archivo.name.split('.');
    var extensionArchivo = nombreCortado[nombreCortado.length - 1];

    // Sólo estas extensiones aceptamos
    var extensionesValidas = ['png', 'jpg', 'gif', 'jpeg'];

    if (extensionesValidas.indexOf(extensionArchivo) < 0) {
        return res.status(400).json({
            ok: false,
            mensaje: 'Extension no válida',
            errors: { message: 'Las extensiones válidas son ' + extensionesValidas.join(', ') }
        });
    }
    //nombre de archivos 
    //el id con la fecha y la extencion del archivo
    var nombreArchivo = `${ id }-${ new Date().getMilliseconds() }.${ extensionArchivo }`;

    //mover la imagen 
    var path = `./uploads/${ tipo }/${ nombreArchivo }`;

    archivo.mv(path, err => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'no se pudo mover  el archivo',
                errors: err
            });

        }
        subirPorTipo(tipo, id, nombreArchivo, res);


    })
});

function subirPorTipo(tipo, id, nombreArchivo, res) {

    if (tipo === 'usuarios') {

        Usuario.findById(id, (err, usuario) => {

            if (!usuario) {
                return res.status(400).json({
                    ok: true,
                    mensaje: 'Usuario no existe',
                    errors: { message: 'Usuario no existe' }
                });
            }


            var pathViejo = './uploads/usuarios/' + usuario.img;

            // Si existe, elimina la imagen anterior
            // if (fs.existsSync(pathViejo)) {
            //     fs.unlink(pathViejo);
            // }

            usuario.img = nombreArchivo;

            usuario.save((err, usuarioActualizado) => {

                usuarioActualizado.password = ':)';

                return res.status(200).json({
                    ok: true,
                    mensaje: 'Imagen de usuario actualizada',
                    usuario: usuarioActualizado
                });

            })


        });

    }
    if (tipo === 'empleados') {

        Empleado.findById(id, (err, empleado) => {

            if (!empleado) {
                return res.status(400).json({
                    ok: true,
                    mensaje: 'empleado no existe',
                    errors: { message: 'empleado no existe' }
                });
            }

            var pathViejo = './uploads/empleados/' + empleado.img;

            // Si existe, elimina la imagen anterior
            // if (fs.existsSync(pathViejo)) {
            //     fs.unlink(pathViejo);
            // }

            empleado.img = nombreArchivo;

            empleado.save((err, empleadoActualizado) => {

                return res.status(200).json({
                    ok: true,
                    mensaje: 'Imagen de médico actualizada',
                    usuario: empleadoActualizado
                });

            })

        });
    }
    if (tipo === 'sedes') {

        Sede.findById(id, (err, sede) => {

            if (!sede) {
                return res.status(400).json({
                    ok: true,
                    mensaje: 'Sede no existe',
                    errors: { message: 'Sede no existe' }
                });
            }

            var pathViejo = './uploads/sedes/' + sede.img;

            // Si existe, elimina la imagen anterior
            // if (fs.existsSync(pathViejo)) {
            //     fs.unlink(pathViejo);
            // }

            sede.img = nombreArchivo;

            sede.save((err, sedeActualizado) => {

                return res.status(200).json({
                    ok: true,
                    mensaje: 'Imagen de sede actualizada',
                    usuario: sedeActualizado
                });

            })

        });
    }


}
module.exports = app;