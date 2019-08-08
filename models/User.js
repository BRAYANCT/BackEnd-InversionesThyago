var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: { type: String, required: [true, 'El nombre  es necesario'] },
    email: { type: String, unique: true, required: [true, 'El telefono es necesario'] },
    password: { type: String, required: [true, 'La contraseña no puede quedar vacia'] },
    Img: { type: String, required: [true, 'El telefono es necesario'] },
    estado: { type: Boolean, default: true }

});
module.exports = mongoose.model('User', UserSchema);