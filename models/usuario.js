var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

var Schema = mongoose.Schema;
var rolesValidos = {
    values: ['Admin_Rol', 'User_Rol', 'Empleado_Rol'],
    menssage: '{VALUE} no es un rol valido'
};

var usuarioSchema = new Schema({
    nombre: { type: String, required: [true, 'El nombre es necesario'] },
    email: { type: String, unique: true, required: [true, 'El correo es necesario'] },
    password: { type: String, required: [true, 'La contraseña es necesario'] },
    img: { type: String, required: false },
    rol: { type: String, required: true, default: 'Admin_Rol', enum: rolesValidos },
    google: { type: Boolean, default: false },
   // estado: { type: String, default: 'confirmar' }


})
usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser unico' });
module.exports = mongoose.model('Usuario', usuarioSchema);