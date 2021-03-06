// Requires
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
// iniciar variable
var app = express();

//bodyparser

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//importar rutas

var appRoutes = require('./routes/app');
var usuarioRoutes = require('./routes/usuario');
var imagenespRoutes = require('./routes/imagenes');
var loginRoutes = require('./routes/login');
var sedeRoutes = require('./routes/sede');
var empleadoRoutes = require('./routes/empleado');
var busquedaRoutes = require('./routes/busqueda');
var uploadRoutes = require('./routes/upload');
var categoriaRoutes = require('./routes/categoria');

//coneccion a abse de datos
mongoose.connection.openUri('mongodb://localhost:27017/InversionesThyago', (err, res) => {
    if (err) throw err;
    console.log('Base de datos:\x1b[32m%s\x1b[0m', 'online');
});

//server  indez config
// var serveIndex = require('serve-index');
// app.use(express.static(__dirname + '/'))
// app.use('/uploads', serveIndex(__dirname + '/uploads'));

// rutas
app.use('/usuario', usuarioRoutes);
app.use('/login', loginRoutes);
app.use('/empleado', empleadoRoutes);
app.use('/sede', sedeRoutes);
app.use('/busqueda', busquedaRoutes);
app.use('/upload', uploadRoutes);
app.use('/imagenes', imagenespRoutes);
app.use('/categoria', categoriaRoutes);
app.use('/', appRoutes);


//puerto a redireccionar
app.listen(3000, () => {
    console.log('el puerto se escucha:\x1b[32m%s\x1b[0m', 'online');
});