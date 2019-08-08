// Requires
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
// iniciar variable
var app = express();

//bodyparser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//importsar rutas
var appRoutes = require('./routes/app');
var UserRoutes = require('./routes/User');
var ClientRoutes = require('./routes/Client');
var CategoryRoutes = require('./routes/Category');

//coneccion a abse de datos
mongoose.connection.openUri('mongodb://localhost:27017/InversionesThyago', (err, res) => {
    if (err) throw err;
    console.log('Base de datos:\x1b[32m%s\x1b[0m', 'online');
});

// rutas
app.use('/Client', ClientRoutes);
app.use('/User', UserRoutes);
app.use('/Category', CategoryRoutes);
app.use('/', appRoutes);

//puerto a redireccionar
app.listen(3000, () => {
    console.log('el puerto se escucha:\x1b[32m%s\x1b[0m', 'online');
});