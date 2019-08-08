var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ClientSchema = new Schema({

    Address: { type: String, required: [true, 'La direccion  es necesario'] },
    Telephone: { type: String, required: [true, 'El telefono es necesario'] }
});
module.exports = mongoose.model('Client', ClientSchema);