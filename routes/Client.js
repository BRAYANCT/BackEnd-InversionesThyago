var express = require('express');

var app = express();

var Client = require('../models/Client');


app.get('/', (req, res, next) => {

    Client.find({}, 'Name Email Img ')
        .exec(
            (err, Client) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando usuarios',
                        errors: err
                    });
                }
                res.status(200).json({
                    ok: true,
                    Client
                });
            });

})
module.exports = app;