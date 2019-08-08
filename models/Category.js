var mongoose = require('mongoose');

var Squema = mongoose.Schema;


var CategoryEschema = new Squema({

    Name: { type: String, required: [true, 'El nombre es nesesario'] },
    Description: { type: String }

});

module.exports = mongoose.model('Category', CategoryEschema);