var express = require('express');

var app = express();

var User = require('../models/User');


app.get('/', (req, res, next) => {

    User.find({}, 'Name Email Img ')
        .exec(
            (err, User) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'Error cargando usuarios',
                        errors: err
                    });
                }
                res.status(200).json({
                    ok: true,
                    User
                });
            });

})
module.exports = app;