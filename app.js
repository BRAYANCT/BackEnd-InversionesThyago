// Requires
var express = require('express');
var mongoose = require('mongoose')
    // iniciar variable
var app = express();

//coneccion a abse de datos
mongoose.connection.openUri('mongodb://localhost:27017/InversionesThyago', (err, res) => {
    if (err) throw err;
    console.log('Base de datos:\x1b[32m%s\x1b[0m', 'online');


});

//ritas
app.get('/', (req, res, next) => {
    res.status(404).send({
        ok: true,
        mensaje: 'peticion realizada correctamente'
    });
});

//puerto a redireccionar
app.listen(3000, () => {
    console.log('el puerto se escucha:\x1b[32m%s\x1b[0m', 'online');
});