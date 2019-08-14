var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var empleadoSchema = new Schema({
    nombre: { type: String, required: [true, 'El nombre es necesario'] },
    img: { type: String, required: false },
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
    sede: { type: Schema.Types.ObjectId, ref: 'Sede', required: [true, 'el id hospital es un campo obligatorio'] }
});


module.exports = mongoose.model('Empleado', empleadoSchema);