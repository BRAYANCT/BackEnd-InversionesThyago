const mongoose = require('mongoose');

let esquema = mongoose.Schema;

let CategoriaEsquema = new esquema({
    nombre: { type: String, required: [true, 'El nombre es nesesario'] },
    descripsion: { type: String, required: false },    
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' },    descripcion: { type: String }
},{ Collection: 'categorias' });

module.exports = mongoose.model('Categoria', CategoriaEsquema);