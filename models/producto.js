var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var productoSchema = new Schema({
    nombre: { type: String, required: [true, 'El nombre es necesario'] },
    descripsion: { type: String, required: false },
    img: { type: String, required: false },
    precioCompra: {type: String, required: [true, 'El nombre es necesario']  },
    precioVenta: { type: String, required: [true, 'El nombre es necesario']  },
    categoria: { type: Schema.Types.ObjectId, ref: 'Categoria', required:[true,'El codigo de categoria es necesaria'] },
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario' },
    estado: { type: Boolean, default: true }

},{ Collection: 'productos' });


module.exports = mongoose.model('Producto', productoSchema);