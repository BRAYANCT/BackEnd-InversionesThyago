var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var SedeSchema = new Schema({
    nombre: { type: String, required: [true, 'El nombre es necesario'] },
    img: { type: String, required: false },
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' }
}, { Collection: 'sedes' });


module.exports = mongoose.model('Sede', SedeSchema);