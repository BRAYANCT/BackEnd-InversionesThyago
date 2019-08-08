var express = require('express');

var app = express();

var Category = require('../models/Category');
// ===============================
// listado de usuarios
// ===============================

app.get('/', (req, res, next) => {

    Category.find({}, 'Name Description')
        .exec(

            (err, Category) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        mensaje: 'error en cargando categoria',
                        errors: err

                    });
                }
                res.status(200).json({
                    ok: true,
                    Category: Category
                });
            });
});

// ===============================
// listado de usuarios
// ===============================
app.post('/', (req, res) => {
    var body = req.body;
    var Category = new Category({
        Name: body.Name,
        Description: body.Description
    });
    Category.save((err, CategoryGuardado) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'error en crear categoria',
                errors: err

            });
        }
        res.status(201).json({
            ok: true,
            Category: CategoryGuardado
        });
    });


});

module.exports = app;